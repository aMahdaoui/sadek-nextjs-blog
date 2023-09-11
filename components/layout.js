import Link from 'next/link';

import HeadMetaData from './headMetaData';

import { META_DATA } from '../config/global';

import StickyHeader from './stickyHeader';
import Footer from './footer';

export default function Layout({ children, home }) {
  return (
    <div>
      <HeadMetaData metaData={META_DATA} />
      <StickyHeader home={home} />
      <main className="max-w-5xl px-5 mt-12 mb-0 mx-auto">
        {children}
        {!home && (
          <div className="mt-12">
            <Link href="/">← Back to home</Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
