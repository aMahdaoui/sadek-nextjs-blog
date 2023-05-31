import Head from 'next/head';
import React from 'react';

export default function HeadMetaData({ metaData }) {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content={metaData.description} />
      <meta
        property="og:image"
        content={`https://og-image.vercel.app/${encodeURI(
          metaData.title
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta name="og:title" content={metaData.title} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
    // <div>HeadMetaData</div>
  );
}
