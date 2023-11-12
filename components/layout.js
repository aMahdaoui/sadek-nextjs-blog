import Link from 'next/link';

import HeadMetaData from './headMetaData';

import { META_DATA } from '../config/global';

import StickyHeader from './stickyHeader';
import Footer from './footer';

export default function Layout({ children, home }) {
  return (
    <div>
      <HeadMetaData metaData={META_DATA} />
      <div className="dark:hidden bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[100vh] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
      <div className="dark:hidden bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[100vh] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>

      <StickyHeader home={home} />
      <main className="max-w-4xl px-5 mt-12 mb-0 mx-auto">
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
