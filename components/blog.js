import Link from 'next/link';
import Date from './common/date';
import SlideUp from './common/SlideUp';

import { useSectionInView } from '../hooks/useSectionInView';
import SectionHeading from './common/sectionHeading';

export default function Blog({ postsData }) {
  const { ref } = useSectionInView('Posts');

  return (
    <section id="blog" ref={ref} className="scroll-mt-[6rem]">
      <SectionHeading heading="Blog" />
      <div className="my-12 pb-12 px-12">
        <div>
          {postsData.map(({ id, date, title, field }) => (
            <div className="" key={id}>
              <SlideUp offset="-300px 0px -300px 0px">
                <div className=" animate-slideUpCubiBezier animation-delay-2">
                  <Link
                    className="cursor-pointer text-2xl font-semibold mt-6 md:my-0 md:text-3xl"
                    href={`/posts/${id}`}
                  >
                    <h2 className="dark:text-teal-200 text-2xl font-semibold mt-6 md:my-0 md:text-3xl">
                      {title}
                    </h2>
                  </Link>
                  <small className="dark:text-teal-600 mb-2.5 block">
                    <Date dateString={date} />
                  </small>
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
