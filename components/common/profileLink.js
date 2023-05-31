import Link from 'next/link';

import styles from '../layout.module.css';

export default function ProfileLink({ children, href }) {
  return (
    <Link
      className={styles.profileIcon}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
}
