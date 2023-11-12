import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsLinkedin } from 'react-icons/bs';
import { HiArrowDown, HiDownload } from 'react-icons/hi';
import { AiOutlineMedium } from 'react-icons/ai';
import { FaGithubSquare } from 'react-icons/fa';

import { PROFILE_DATA } from '../config/global';
import { useSectionInView } from '../hooks/useSectionInView';

export default function Profile() {
  const { ref } = useSectionInView('Home', 0.5);

  return (
    <section
      ref={ref}
      id="home"
      className="flex flex-col justify-evenly b-28scroll-mt-[100rem] text-center md:h-[100vh]  md:mt-0 mt-40 sm:mb-0  h-[calc(100vh-10rem)]"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'tween',
              duration: 0.2,
            }}
          >
            <Image
              src="/images/headshot.png"
              alt="Ricardo portrait"
              width="192"
              height="192"
              quality="95"
              priority={true}
              className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
            />
          </motion.div>
          <motion.span
            className="absolute bottom-0 right-0 text-4xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 125,
              delay: 0.1,
              duration: 0.7,
            }}
          >
            👋
          </motion.span>
        </div>

        <motion.div
          className="flex flex-col gap-3 md:mt-2 mb-10  "
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className=" text-2xl font-medium !leading-[1.5] sm:text-4xl">
            {` ${PROFILE_DATA.welcome}`}
          </h2>
          <span className="font-semibold text-teal-600 md:text-xl block">
            {PROFILE_DATA.job}
          </span>
          <span className="text-lg md:text-xl pt-4 px-12">
            {PROFILE_DATA.shortDescription}
          </span>
        </motion.div>
      </div>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <ProfileLinks />
      </motion.div>
      <BouncedRow />
    </section>
  );
}

const BouncedRow = () => (
  <div className=" justify-center  hidden md:flex">
    <Link href="#about" scroll={false}>
      <HiArrowDown size={35} className="animate-bounce md:mx-0" />
    </Link>
  </div>
);

const ProfileLinks = () => (
  <>
    <a
      className="group bg-white text-[#0f1729] py-1 px-5 mr-1 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack"
      href="/CV.pdf"
      download
    >
      Download CV{' '}
      <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
    </a>
    <a
      href={PROFILE_DATA.medium}
      rel="noreferrer"
      target="_blank"
      className="bg-white p-2 text-[#0f1729] flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack"
    >
      <AiOutlineMedium />
    </a>
    <a
      className="bg-white  p-2 text-[#0f1729] hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack"
      href={PROFILE_DATA.linkedIn}
      target="_blank"
      rel="noreferrer"
    >
      <BsLinkedin />
    </a>

    <a
      className="bg-white p-2 text-[#0f1729] flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack"
      href={PROFILE_DATA.github}
      target="_blank"
      rel="noreferrer"
    >
      <FaGithubSquare />
    </a>
  </>
);
