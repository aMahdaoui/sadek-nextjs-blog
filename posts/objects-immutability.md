---
# title: 'Objects and immutability, some Javascript methods which you may not aware of!'
title: 'Objects and immutability, some useful Javascript methods'
date: '2023-05-30'
field: 'web developement'
tags: 'javascript, immutability, tips'
---

Javascript developers use lodash very often to deal with Objects (objects & arrays). The **\_.cloneDeep()** method, for example, can be used to create a deep copy of an object (i.e. it recursively clones the value). therefore the newly created object does not share the same reference as the cloned one. which is useful and time-saving.

but, What if i tell you that there is a built-in javascript method that can achieve the same without using or importing any 3rd party library like lodash in your code. 😀

Yes, this article will take you through some useful built-in javascript methods, supported by the majority of browsers.

Before going into the details, let's start with a quick review of the immutability concept in javascript. Since it is tightly related to these methods

## Immutability

Basically, immutability means "you cannot change something". a **const** variable cannot be reassigned because it is immutable. In other words, immutability refers to the fact that the data structure cannot be changed.

However, mutating (changing) array and object's data structure in javascript is possible 🙃 :

```js[class='line-numbers']
const users = ['John', 'Mickel', 'Kareem'];
users[1] = 'Sadek';
console.log('users :', users);
```

Output 🤔 :

```markup[class='output-result']
users : ['John', 'Sadek', 'Kareem'];
```

Now, let’s try to create a _newUsers_ array from the _users_ and assign back **Mickel** to the second position:

```js[class='line-numbers']
const newUsers = users;
newUsers[1] = 'Mickel';
console.log('users    :', users);
console.log('newUsers :', newUsers);
```

So, what would be the value of the arrays !, let's see:

Output :

```markup[class='output-result']
users    : ['John', 'Mickel', 'Kareem']
newUsers : ['John', 'Mickel', 'Kareem']
```

As you might know, the value has been changed in both of the arrays. This is because when an existing array is assigned to a new variable, it does not create a new array with the same properties. Instead, it creates a reference to the original. Therefore they share the same value.

This is not the expected behavior. You can see how this sort of reassignment could cause unintended results. hence this is why developers use the famous **\_.cloneDeep()** method to fix that, and change only the current Object they use without affecting the original one.

However, **\_.cloneDeep()** is used for some complicated cases where the object is nested or deeply nested. So, [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) or [Spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) is the best option to clone our array and fix that behavior :

```js[class='line-numbers']
const users = ['John', 'Sadek', 'Kareem'];
const newUsers = [...users];
newUsers[1] = 'Mickel';
console.log('users    :', users);
console.log('newUsers :', newUsers);
```

Output :

```markup[class='output-result']
users    : ['John', 'Sadek', 'Kareem']
newUsers : ['John', 'Mickel', 'Kareem']
```

Here, _newUsers_ array does not share the same reference with the original array _users_, then changing one of them does not affect the other one.

but wait, is there any other way to do so, that combines these two steps?

The first method in the following section is what you are looking for!

## 1. with method

Recently added to javascript Array global object. **with** method can be used to copy an array and change the value of a given index in one shot.  
It returns a new array with the element at the given index replaced with the given value.

syntax :

```
array.with(index, value)
```

Trying that with the above example :

```js[class='line-numbers']
const users = ['John', 'Sadek', 'Kareem'];
const newUsers = users.with(1, Mickel);
console.log('users    :', users);
console.log('newUsers :', newUsers);
```

Output :

```markup[class='output-result']
users    : ['John', 'Sadek', 'Kareem']
newUsers : ['John', 'Mickel', 'Kareem']
```

## 2. toSorted method

Effortlessly, **sort** method can be used to sort an array. However, if it is created from another array, the original and the new array will be sorted (immutability story), let's check:

```js[class='line-numbers']
const users = ['John', 'Sadek', 'Kareem'];
const newUsers = users;
newUsers.sort(); // sort newUsers alphabetically
console.log("users           :", users);
console.log("sorted newUsers :', newUsers);
```

Output

```markup[class='output-result']
users           : ['John', 'Kareem', 'Sadek']
sorted newUsers : ['John', 'Kareem', 'Sadek']
```

In order to fix that unintended behavior, **toSorted** method had been introduced :

```js[class='line-numbers']
const users = ['John', 'Sadek', 'Kareem'];
const newUsers = users.toSorted(); // sort ONLY newUsers alphabetically
console.log("users :", users);
console.log("sorted newUsers :', newUsers);
```

Output

```markup[class='output-result']
users           : ['John', 'Sadek', 'Kareem']
sorted newUsers : ['John', 'Kareem', 'Sadek']
```

Only newUsers has been sorted

## 3. toReversed method

The **toReversed** method was introduced to reverse the elements in an array without mutating the original array.

```js[class='line-numbers']
const users = ['John', 'Sadek', 'Kareem'];
const newUsers = users.toReversed(); // reverse array elements
console.log("users :", users);
console.log("sorted newUsers :', newUsers);
```

Output

```markup[class='output-result']
users : ['John', 'Sadek', 'Kareem']
sorted newUsers : ['Kareem','Sadek','John']
```

Only newUsers has been reversed

## 4. toSpliced method

The **toSpliced** method can be used to change the content of an array, by adding, removing, or replacing existing elements. without mutating the original array.

```js[class='line-numbers']
const users = ['John', 'Sadek', 'Kareem'];

// Inserting an element at index 1
const newUsers1 = users.toSpliced(1, 0, 'Adam');

// Deleting two elements starting from index 0
const newUsers2 = users.toSpliced(0, 2);

// Replacing one element at index 2 with two new elements
const newUsers3 = users.toSpliced(2, 1, "Amine", "Salah");

console.log('users     :', users);
console.log('newUsers1 :', newUsers1);
console.log('newUsers2 :', newUsers2);
console.log('newUsers3 :', newUsers3);
```

Output

```markup[class='output-result']
users     : ['John', 'Sadek', 'Kareem']
newUsers1 : ['John', 'Adam', 'Sadek', 'Kareem']
newUsers2 : ['Kareem']
newUsers3 : ['John','Sadek', 'Amine','Salah']
```

The original array _users_ was not modified.

## 5. structuredClone

Back to lodash **\_.cloneDeep()** method, commonly used to create a new object from another deeply nested object. **structuredClone** exactly aims to achieve the same result. Therefore no need to use lodash anymore for such cases.

### How to use it

Say we have a user object like this:

```js[class='line-numbers']
const user = {
  name: "Sadek",
  job: {
    title: "web developer",
    experience: "4 years",
  }
```

#### Use spread operator to copy objects

As indicated above, spread operator can be used to create a new object.

By using the spread operator, we can create a new object from _user_ named 'Kareem' with the job title 'react developer' :

```js[class='line-numbers']
const newUser = { ...user };
newUser.name = 'Kareem';
newUser.job.title = 'react developer';
console.log('user    :', user);
console.log('newUser :', newUser);
```

Output :

```markup[class='output-result']
user :
{ name: 'Sadek',
  job: {
    title: 'react developer',
    experience: '4 years'
  }
}

newUser:
{ name: 'Kareem',
  job: {
    title: 'react developer',
    experience: '4 years'
  }
}
```

Hmm. Only the name has been changed correctly, job title changed in both **user** and **newUser**.

Even though the spread operator can be used to deal with nested objects as well, it is quite tedious and verbose.

```js[class='line-numbers']
const newUser = {.
  ..user,
  name: 'Kareem'
  job : {.
    ..user.job,
    title: 'react developer'
  }
}
```

You can imagine if the job object contains another object called 'company', and the company has another object inside it 'address', and so on ...

```js[class='line-numbers']
const user = {
  name: "Sadek",
  job: {
    title: "web developer",
    experience: "4 years",
    company: {
      name: 'altitude',
      address : {
        street: 'street-name',
        city: 'city-name'
      }
    }
  }
}
```

It is obvious that going through all nested levels to generate a new object does not make any sense.

### Using structuredClone

```js[class='line-numbers']
const newUser = structuredClone(user);
newUser.name = 'Kareem';
newUser.job.title = 'react developer';
newUser.job.company.name = 'all soft';
console.log('user    :', user);
console.log('newUser :', newUser);
```

Output :

```markup[class='output-result']
user :
{ name: 'Sadek',
  job: {
    title: 'web developer',
    experience: '4 years'
    company: {
      name: 'altitude',
      address : {
        street: 'street-name',
        city: 'city-name'
      }
    }
  }
}

newUser:
{ name: 'Kareem',
  job: {
    title: 'react developer',
    experience: '4 years',
    company: {
      name: 'all soft',
      address : {
        street: 'street-name',
        city: 'city-name'
      }
    }
  }
}
```

Right now, both the name, the job title, and the company name have been modified correctly and easily.
<br />

## Resources

To go more in-depth into immutability, refer to immutablejs and immer library which are widely used to handle huge objects data structures.

- [https://immerjs.github.io/immer/](https://immerjs.github.io/immer/)
- [https://immutable-js.com/](https://immutable-js.com/)

For more information about these methods and many other built-in methods, see :

- [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/)

<br />
<br />
Thank you for reading! 🙂
