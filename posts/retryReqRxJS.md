---
title: 'How to periodically send requests using RxJs'
date: '2023-06-19'
field: 'web developement'
tags: 'typescript, javascript, rxjs, tips, reactive programming'
---

<!-- # Scheduled retry request using rxJS
Rxjs is used to ...

RxJS is a reactive programming library for JavaScript. It's used to handle asynchronous and event-based programs, allowing developers to write complex and concurrent programs more easily and with fewer bugs.
 -->

RxJS is a JavaScript library for reactive programming. It is used to handle asynchronous and event-based data flows using functional programming and observables. With RxJS, complex and concurrent programs can be easily created, transformed, and also respond to changes in real-time.

An Observable is a stream of events that can be subscribed to by an observer. Observables can emit multiple events over time and can be created from a variety of sources including asynchronous operations, events, and arrays.

Examples speak much better! Let's take an observable stream from the 'click' event on a button, and repeat it 3 times:
![RxJs-repeat](/images/rxJs-repeat.png)_repeat events using RxJs 'repeat' function_

```js[class='line-numbers']
import { fromEvent } from 'rxjs';
import { repeat } from 'rxjs/operators';

const button = document.querySelector('button');
const click$ = fromEvent(button, 'click');

click$.pipe(repeat(3)).subscribe(() => {
  console.log('Button Clicked!');
});
```

To sum up, here are some benefits of using RxJS:

1. Manage complex event streams, like user interactions (clicks, scroll, ...), animations, network requests
2. Handling asynchronous data and events. Rather than using callbacks or promise chains, RxJS provides a more concise and expressive syntax for handling asynchronous streams of data.
3. It allows developers to write code that describes what should happen, rather than how it should happen. Which leads to more readable and maintainable code.

For more information about RxJs please check the official documentation page: RxJs overview

Back to our question, assuming that your application manages some critical data sent by the users who may use it in different areas, where the internet connexion is not good enough or interrupted from time to time (network error). You may think then to keep sending the requests many times, with a specific delayed interval, hoping the internet connexion will be re-established again. until reaching max attempts or iterations.

So how we can do that using RxJs? first of all, let's clarify the requirements:

### Requirements

- Re-send the request if it is failed due to Network error until the request succeeded or the number of request sent reach 10 attempts. The first 3 attempts should be delayed by 1 second, whereas the rest (7 attempts) should be delayed by 1.5 seconds.
- Display an error message if the 10th attempt is reached and the network is still down.

### Retry Policy config

Before jumping into the implementation. it would be good to define how and when the request should be re-sent. Based on the requirements above. In case the Network is down, the request should be re-sent 10 times. The first 3 attempts should be delayed by 1 second, and the 7 remaining attempts by 1.5 seconds. So we can define that as :

```js[class='line-numbers']
RETRY_POLICY = {
    PULL_INTERVAL_INIT: 1000, // 1 second
    PULL_INTERVAL_REST: 1500, //1.5 second
    INIT_ITERATIONS: 3,
    MAX_ITERATIONS: 10,
};
```

### Implementation usign RxJs

No need to use any js helpers, promises, or bench of callbacks, RxJs can handle that easily and smoothly. After installing RxJs dependencies we can import **merge**, **timer**, **interval**, and **take** to send delayed requests based on the Policy defined above:

```ts
// variables
const INIT_ATTEMPTS = RETRY_POLICY.INITIAL_ITERATIONS;
const REST_ATTEMPTS = RETRY_POLICY.MAX_ITERATIONS - INIT_ATTEMPTS;
const INIT_PULL_INTERVAL = RETRY_POLICY.PULL_INTERVAL_FIRST;
const REST_PULL_INTERVAL = RETRY_POLICY.PULL_INTERVAL_REST;

// define the initial delayed intervals stream
const delayedInitAttempts = timer(0, INIT_PULL_INTERVAL).pipe(
  take(INIT_ATTEMPTS)
);

// the rest intervals stream
const delayedRestAttempts = interval(REST_PULL_INTERVAL).pipe(
  take(REST_ATTEMPTS + 1)
);

// This will be used to Stop spreading requests
const attemptsDone$ = new Subject<boolean>();

// merge Initial and the Rest delayed intervals stream into one stream
const delayedAttempts = merge(delayedInitAttempts, delayedRestAttempts, 1).pipe(
  takeUntil(attemptsDone$)
);
```

- merge: is used to combine the initial pull interval (PULL_INTERVAL_INIT) with the second pull interval (PULL_INTERVAL_REST) in one interval streams
- timer & interval: used to launch the requests periodically
- take and takeUntil: to limit the number of attempts that should be triggered.
- Subject: used to unsubscribe from delayedAttemps, hence stop sending requests, if an error is thrown (other than Network error) or once the request is executed successfully

The following function, **requestWithRetryPolicy** uses all of them to send the requests stream. it takes as parameters :

1. request: the request to be sent
2. retryOptions: object contain callbacks, invoked based on the response :
   - onSuccess: called once the request is executed successfully
   - onFailure: called if all attempts are consumed, which means the network is always down (offline)
   - onCatch: called if an error has been thrown

```ts[class='line-numbers']
const requestWithRetryPolicy =
  (request: Request, retryOptions: RetryOptions) =>
  (...args: ReqArgs) => {
    delayedAttempts.subscribe(async (attempt) => {
      console.log('Attempt n°', attempt);
      try {
        // if all attempts are consumed, the network is always down,
        // onFailure should be triggered then
        if (attempt + INIT_ATTEMPTS === RETRY_POLICY.MAX_ITERATIONS) {
          await retryOptions.onFailure();
        } else {
          // we still have some attemps, so send request
          const res = await request(...args);

          // response OK, invoke onSuccess and stop sending requests
          if (res.status === 200) {
            attemptsDone$.next(true); //=> dont send the request again
            await retryOptions.onSuccess(res);
          }
        }
      } catch (err) {
        // check if network is offline
        const isConnDown = checkNetworkStatus(String(err));

        // in case network is not down (online), an error occured somewhere
        if (!isConnDown) {
          attemptsDone$.next(true); //=> dont send the request again
          console.error('sending request error', err);
          retryOptions.onCatch(err);
        }
      }
    });
  };
```

**requestWithRetryPolicy** keeps sending the request until one of the following conditions is fulfilled :

1. the network connexion is re-established
2. the max number of attempts is reached: RERETRY_POLICY.MAX_ITERATIONS = 10
3. an error is thrown, and the request is rejected

checkNetworkStatus is used by requestWithRetryPolicy to check whether the network is offline or not

```ts[class='line-numbers']
const checkNetworkStatus = (reqError: string) => {
    if (reqError.includes('Network Error')) return true; // network is offline
    return false;
};

```

### Results & demo

The Example above was implemented using React, Typescript, and axios. The code source can be found in this Stackblitz project: [https://stackblitz.com/edit/react-ts-m3nlwj?file=utils%2FretryRequest.ts](https://stackblitz.com/edit/react-ts-m3nlwj?file=utils%2FretryRequest.ts)

<iframe src='https://stackblitz.com/edit/react-ts-m3nlwj?ctl=1&embed=1&file=App.tsx&hideNavigation=1'></iframe>

##### network offline

All attempts are consumed _onFailure_ is called  
![RxJs request failed](/images/RxJs-resend-request-failed.png)_onFailure called, the network is offline during all attempts_

##### Network re-established after some attempts are consumed

![RxJs request pass](/images/rxjs-success.gif))_onSucces called, the network connection has been changed from offline to online during the send process_

<br />
<br />
Thank you for reading! 🙂
