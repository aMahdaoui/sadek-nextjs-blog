import React from 'react';
import Image from 'next/image';
import {
  AiOutlineGithub,
  AiOutlineMedium,
  AiOutlineLinkedin,
} from 'react-icons/ai';
import { PROFILE_DATA } from '../config/global';

PROFILE_DATA;
const Footer = () => {
  return (
    <footer className="mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl ">
      <hr className="w-full h-0.5 mx-auto mt-8 bg-neutral-200 border-0"></hr>
      <div className="mx-auto  p-4 flex flex-col text-center text-neutral-900 md:flex-row md:justify-between">
        <div className="flex flex-row items-center justify-center space-x-1 text-neutral-500 dark:text-neutral-100">
          <Image
            priority
            src="/logo1.png"
            width={90}
            height={60}
            alt=""
            className="rounded-sm mr-1"
          />
          {`© ${new Date().getFullYear()} ${PROFILE_DATA.name}`}
          <a href="/" className="hover:underline"></a>
        </div>
        <div className="flex flex-row items-center justify-center space-x-2 mb-1">
          <a href={PROFILE_DATA.github} rel="noreferrer" target="_blank">
            <AiOutlineGithub
              className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-100"
              size={30}
            />
          </a>
          <a href={PROFILE_DATA.linkedIn} rel="noreferrer" target="_blank">
            <AiOutlineLinkedin
              className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-100"
              size={30}
            />
          </a>
          <a href={PROFILE_DATA.medium} rel="noreferrer" target="_blank">
            <AiOutlineMedium
              className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-100"
              size={30}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
