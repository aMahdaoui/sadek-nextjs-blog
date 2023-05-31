import Link from 'next/link';

import Profile from './profile';
import HeadMetaData from './headMetaData';

import { META_DATA } from '../config/global';

import styles from './layout.module.css';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <HeadMetaData metaData={META_DATA} />
      <Profile home={home} />
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
