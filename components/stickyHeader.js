import React from 'react';
import { m } from 'framer-motion';
import { useTheme } from 'next-themes';
import Link from 'next/link';

import { RiMoonFill, RiSunLine } from 'react-icons/ri';
import { clsx } from 'clsx';

import { useActiveSectionContext } from '../context/activeSectionContext';

const NAV_ITEMS = [
  {
    label: 'Home',
    page: 'home',
  },
  {
    label: 'About',
    page: 'about',
  },
  {
    label: 'Skills',
    page: 'skills',
  },
  {
    label: 'Posts',
    page: 'blog',
  },
  {
    label: 'Projects',
    page: 'projects',
  },
  // {
  //   label: 'Contact',
  //   page: 'contact',
  // },
];
export default function StickyHeader({ home }) {
  const { systemTheme, theme, setTheme } = useTheme();
  const { activeSection: selectedItem, setActiveSection: setSelectedItem } =
    useActiveSectionContext();
  return (
    <header className="flex justify-center ">
      <m.div // sm:w-[36rem] !w-fit
        className="flex z-50 px-7 justify-between items-center fixed top-0  h-[5.5rem]  rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem]  sm:rounded-full dark:bg-[#293554] dark:border-black/40 dark:bg-opacity-75"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className={`flex-1 justify-self-center pb-0 mt-0 block }`}>
          <ul className="flex items-center justify-center space-x-6 sm:flex-nowrap flex-wrap">
            {NAV_ITEMS.map((item, idx) => {
              return (
                <NavBarLink
                  home={home}
                  key={idx}
                  path={item.page}
                  className={clsx(
                    'cursor-pointer block lg:inline-block rounded-full px-2 bg-blue-200 dark:bg-slate-100 ',
                    {
                      'bg-transparent dark:bg-transparent  hover:text-[#9bade1]':
                        selectedItem !== item.label,
                      'text-[#0f1729]': selectedItem === item.label,
                    }
                  )}
                  activeClass="active"
                  onClick={() => {
                    setSelectedItem(item.label);
                  }}
                >
                  {item.label}
                </NavBarLink>
              );
            })}
            <ChangeThemeButton theme={theme} setTheme={setTheme} />
          </ul>
        </div>
      </m.div>
    </header>
  );
}

function NavBarLink({ children, home, path, ...rest }) {
  // if (home) {
  //   return (
  //     <Link href={`/#${path}`} {...rest} scroll={false}>
  //       {children}
  //     </Link>
  //   );
  // }
  return (
    <m.li
      className=" list-none"
      // key={item.page}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <Link href={`/#${path}`} {...rest} scroll={!home}>
        {children}
      </Link>
    </m.li>
  );
}

function ChangeThemeButton({ theme, setTheme }) {
  return (
    <>
      {theme === 'dark' ? (
        <button
          title="set light theme"
          onClick={() => setTheme('light')}
          className="bg-slate-100 p-2 rounded-xl"
        >
          <RiSunLine size={20} color="black" />
        </button>
      ) : (
        <button
          title="set dark theme"
          onClick={() => setTheme('dark')}
          className="bg-[#0f1729] text-slate-100 p-2 rounded-xl"
        >
          <RiMoonFill size={20} />
        </button>
      )}
    </>
  );
}
