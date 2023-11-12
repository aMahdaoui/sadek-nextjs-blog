import Head from 'next/head';

import Layout from '../components/layout';
import About from '../components/about';
import Skills from '../components/skills';
import Profile from '../components/profile';
import Projects from '../components/projects';
import Blog from '../components/blog';

import { getSortedPostsData } from '../lib/posts';
import { getAllProjects } from '../lib/projects';
import { PROFILE_DATA } from '../config/global';

export default function Home({ postsData, projectsData }) {
  return (
    <Layout home>
      <Head>
        <title>{PROFILE_DATA.title}</title>
      </Head>
      <Profile />
      <About />
      <Skills />
      <Blog postsData={postsData} />
      <Projects projectsData={projectsData} />
    </Layout>
  );
}

export async function getStaticProps() {
  const postsData = getSortedPostsData();
  const projectsData = getAllProjects();
  return {
    props: {
      postsData,
      projectsData,
    },
  };
}
