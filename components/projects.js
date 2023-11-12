import Image from 'next/image';
import Link from 'next/link';

import { ImNpm, ImGithub, ImArrowUpRight2 } from 'react-icons/im';

import SlideUp from './common/SlideUp';
import { useSectionInView } from '../hooks/useSectionInView';
import SectionHeading from './common/sectionHeading';

const Projects = ({ projectsData }) => {
  const { ref } = useSectionInView('Projects');

  return (
    <section id="projects" ref={ref} className="scroll-mt-[6rem]">
      <SectionHeading heading="Projects" />
      <div className="my-12">
        <div className="flex flex-col space-y-28">
          {projectsData.map((project, idx) => {
            return (
              <div key={idx}>
                <SlideUp offset="-300px 0px -300px 0px">
                  <div className="flex flex-col  animate-slideUpCubiBezier animation-delay-2 md:flex-row md:space-x-12 p-6 bg-gray-100 dark:bg-gray-400 border border-black/5 rounded-lg">
                    <div className=" md:w-1/2">
                      {/* <Link href={project.links.demo || project.links.github}> */}
                      <Image
                        src={project.image}
                        alt=""
                        width={1000}
                        height={1000}
                        className="rounded-xl shadow-xl hover:opacity-70"
                      />
                      {/* </Link> */}
                    </div>
                    <div className="md:w-1/2">
                      <h3 className="text-4xl mb-2">{project.title}</h3>
                      <p className="text-xl leading-7 mb-4 text-teal-900 dark:text-teal-200">
                        {project.description}
                      </p>
                      <div className="flex space-x-4">
                        {project.links.npm && (
                          <Link href={project.links.npm || '#'} target="_blank">
                            <ImNpm
                              size={30}
                              className="hover:-translate-y-1 transition-transform cursor-pointer"
                            />
                          </Link>
                        )}
                        {project.links.github && (
                          <Link
                            href={project.links.github || '#'}
                            target="_blank"
                          >
                            <ImGithub
                              size={30}
                              className="hover:-translate-y-1 transition-transform cursor-pointer"
                            />
                          </Link>
                        )}
                        {project.links.demo && (
                          <Link href={project.links.demo} target="_blank">
                            <ImArrowUpRight2
                              size={30}
                              className="hover:-translate-y-1 transition-transform cursor-pointer"
                            />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </SlideUp>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
