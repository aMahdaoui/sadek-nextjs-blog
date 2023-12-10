import React from 'react';
import { AiOutlineMedium } from 'react-icons/ai';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithubSquare } from 'react-icons/fa';
import { PROFILE_DATA } from '../../config/global';

function SocialMediaLinks({ classes }) {
  return (
    <div className={classes}>
      <a
        href={PROFILE_DATA.medium}
        rel="noreferrer"
        target="_blank"
        className="bg-white p-2 text-[#0f1729] flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack"
        aria-label="Mahdaoui abdessadeq medium account"
      >
        <AiOutlineMedium />
      </a>
      <a
        className="bg-white  p-2 text-[#0f1729] hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack"
        href={PROFILE_DATA.linkedIn}
        target="_blank"
        rel="noreferrer"
        aria-label="Mahdaoui abdessadeq linkedin profile"
      >
        <BsLinkedin />
      </a>
      <a
        className="bg-white p-2 text-[#0f1729] flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack"
        href={PROFILE_DATA.github}
        target="_blank"
        rel="noreferrer"
        aria-label="Mahdaoui abdessadeq github profile"
      >
        <FaGithubSquare />
      </a>
    </div>
  );
}

export default SocialMediaLinks;
