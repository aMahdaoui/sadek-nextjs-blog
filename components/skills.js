import React from 'react';
import { PROFILE_SKILLS } from '../config/global';
import SectionHeading from './common/sectionHeading';
import { motion } from 'framer-motion';
import { useSectionInView } from '../hooks/useSectionInView';

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

function Skills() {
  const { ref } = useSectionInView('Skills');

  return (
    <section id="skills" ref={ref} className="scroll-mt-[6rem]">
      <SectionHeading heading="My skills" />
      <div className="my-12 pb-12 px-12">
        <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
          {PROFILE_SKILLS.map((item, index) => {
            return (
              <motion.li
                key={index}
                className="bg-white border border-blue-200 rounded-xl px-3 pb-1 dark:bg-white/10 dark:text-white/80"
                variants={fadeInAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{
                  once: true,
                }}
                custom={index}
              >
                {item.skill}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Skills;
