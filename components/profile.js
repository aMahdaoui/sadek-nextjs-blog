import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa';

import { PROFILE_DATA } from '../config/global';

import utilStyles from '../styles/utils.module.css';
import styles from './layout.module.css';
import ProfileLink from './common/profileLink';

export default function Profile({ home }) {
  if (home)
    return (
      <header className={styles.header}>
        <ProfileImage height={144} width={144} />
        <h1 className={styles.profileName}>{PROFILE_DATA.name}</h1>
        <p className={styles.jobTitle}>{PROFILE_DATA.job}</p>
        <ProfileLinks />
      </header>
    );
  return (
    <header className={styles.header}>
      <Link href="/">
        <ProfileImage height={108} width={108} />
      </Link>
      <h2 className={utilStyles.headingLg}>
        <Link href="/" className={utilStyles.colorInherit}>
          {PROFILE_DATA.name}
        </Link>
      </h2>
    </header>
  );
}

function ProfileLinks() {
  return (
    <div className={styles.profileIconWrapper}>
      <ProfileLink href={PROFILE_DATA.linkedIn}>
        <FaLinkedin size="24" />
      </ProfileLink>
      <ProfileLink href={PROFILE_DATA.github}>
        <FaGithub size="26" />
      </ProfileLink>
      <ProfileLink href={PROFILE_DATA.medium}>
        <FaMedium size="26" />
      </ProfileLink>
    </div>
  );
}

function ProfileImage({ width, height }) {
  return (
    <Image
      priority
      src="/images/sadek.jpg"
      className={utilStyles.borderCircle}
      width={width}
      height={height}
      alt=""
    />
  );
}
