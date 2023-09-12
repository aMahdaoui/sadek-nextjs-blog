import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/common/date';
import Tags from '../../components/common/tags';

import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className="mx-auto my-24 max-w-3xl">
        <div className="border-b-2 pb-2">
          <h1 className="text-4xl my-4 font-bold">{postData.title}</h1>
          <div className="font-light">
            <Date dateString={postData.date} />
            <Tags tags={postData.tags} />
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
