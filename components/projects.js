import Image from 'next/image';
import Link from 'next/link';

// import { , BsArrowUpRightSquare } from "react-icons/bs"
import { ImNpm, ImGithub, ImArrowUpRight2 } from 'react-icons/im';
import SlideUp from './common/SlideUp';

const Projects = ({ projectsData }) => {
  return (
    <section id="projects">
      <div className="my-12">
        <h1 className="my-10 text-center font-bold text-4xl">
          Projects
          <hr className="w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded"></hr>
        </h1>

        <div className="flex flex-col space-y-28">
          {projectsData.map((project, idx) => {
            return (
              <div key={idx}>
                <SlideUp offset="-300px 0px -300px 0px">
                  <div className="flex flex-col  animate-slideUpCubiBezier animation-delay-2 md:flex-row md:space-x-12">
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
                    <div className="mt-8 md:w-1/2">
                      <h1 className="text-4xl font-bold mb-6">
                        {project.name}
                      </h1>
                      <p className="text-xl leading-7 mb-4 text-neutral-600 dark:text-neutral-400">
                        {project.description}
                      </p>
                      <div className="flex flex-row align-bottom space-x-4">
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
