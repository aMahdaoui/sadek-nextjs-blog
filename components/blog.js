import Link from 'next/link';
import Date from './common/date';
import SlideUp from './common/SlideUp';

export default function Blog({ postsData }) {
  return (
    <section id="blog">
      <div className="my-12 pb-12">
        <h1 className="my-10 text-center font-bold text-4xl">
          Blog
          <hr className="w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded"></hr>
        </h1>
        <div>
          {postsData.map(({ id, date, title, field }) => (
            <div className="" key={id}>
              <SlideUp offset="-300px 0px -300px 0px">
                <div className=" animate-slideUpCubiBezier animation-delay-2">
                  <Link
                    className="cursor-pointer text-2xl font-semibold mt-6 md:my-0 md:text-3xl"
                    href={`/posts/${id}`}
                  >
                    <h2 className="dark:text-green-900 text-2xl font-semibold mt-6 md:my-0 md:text-3xl">
                      {title}
                    </h2>
                  </Link>
                  <small className="dark:text-green mb-2.5 block">
                    <Date dateString={date} />
                  </small>
                  {/* <p className="max-h-12">short resume (max 240 char )...</p> */}
                  <div>
                    <span className="bg-teal-200 text-teal-950 rounded-2xl py-0.5 px-4 mt-3 w-fit">
                      {field}
                    </span>
                    <span> - 5 min read</span>
                  </div>
                  <hr className="w-full h-px mx-auto my-8 bg-neutral-200 border-0"></hr>
                </div>
              </SlideUp>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
