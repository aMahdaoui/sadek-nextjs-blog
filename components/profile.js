import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { HiArrowDown, HiDownload } from 'react-icons/hi';

import SocialMediaLinks from './common/socialMediaLinks';

import { PROFILE_DATA } from '../config/global';
import { useSectionInView } from '../hooks/useSectionInView';

export default function Profile() {
  const { ref } = useSectionInView('Home', 0.5);

  return (
    <section
      ref={ref}
      id="home"
      className="flex flex-col justify-around  scroll-mt-[100rem] min-h-[calc(100vh-3rem)] text-center  pt-16 "
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
              alt="Sadek portrait"
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
  <div className="flex flex-wrap justify-center gap-2">
    <a
      className="group bg-white text-[#0f1729] py-1 px-5 mr-1 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack"
      href="/CV.pdf"
      download
    >
      Download CV{' '}
      <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
    </a>
    <SocialMediaLinks classes="flex gap-1" />
  </div>
);
