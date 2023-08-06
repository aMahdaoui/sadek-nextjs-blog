'use client'; // this is a client component
import React from 'react';
import Image from 'next/image';
import { Link } from 'react-scroll/modules';
import { HiArrowDown } from 'react-icons/hi';
import { PROFILE_DATA } from '../config/global';

const Profile = () => {
  return (
    <section
      className="flex flex-col justify-evenly mt-20 items-center h-[calc(100vh-88px)]"
      id="home"
    >
      <div className="flex gap-6 flex-col text-center items-center justify-center animate-fadeIn animation-delay-2 my-10 p-t-16 sm:p-t-32  md:flex-row-reverse md:space-x-4 md:text-left">
        <div className="w-44 md:mt-2 md:w-1/2">
          <Image
            src="/images/headshot.png"
            alt=""
            width={325}
            height={325}
            className="rounded-full shadow-2xl mx-auto mt"
          />
        </div>
        <div className="flex flex-col gap-3 md:mt-2 md:w-3/5">
          <h1 className="text-4xl font-bold md:mt-0 md:text-7xl">
            {` ${PROFILE_DATA.welcome}`}
          </h1>
          <span className="font-semibold text-teal-600 md:text-xl">
            {PROFILE_DATA.job}
          </span>
          <p className="text-lg md:text-xl">{PROFILE_DATA.shortDescription}</p>
          <Link
            to="projects"
            className="text-neutral-100 font-semibold mx-auto mt-4 md:mx-0 max-w-fit px-6 py-3 bg-teal-600 rounded shadow hover:bg-teal-700"
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            Projects
          </Link>
        </div>
      </div>
      <div className="flex flex-row items-center text-center justify-center hidden md:block">
        <Link
          to="about"
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          <HiArrowDown size={35} className="animate-bounce md:mx-0" />
        </Link>
      </div>
    </section>
  );
};

export default Profile;
