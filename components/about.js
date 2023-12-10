import { PROFILE_DATA } from '../config/global';
import { useSectionInView } from '../hooks/useSectionInView';
import SectionHeading from './common/sectionHeading';

const About = () => {
  const { ref } = useSectionInView('About');

  return (
    <section id="about" ref={ref} className="scroll-mt-[6rem] mt-12">
      <SectionHeading heading="About Me" />
      <div className="my-12 px-12 pb-12 text-center">
        <p>
          Hi, my name is {PROFILE_DATA.name}. I am a{' '}
          <span className="font-bold">{'highly ambitious'}</span>,
          <span className="font-bold">{' self-motivated'}</span>, and
          <span className="font-bold">{' driven'}</span> software engineer.
        </p>
        <p>
          I graduated from the high school of technologies and systems analysis
          of Rabat, capital of Morocco, in 2016. With a master's degree in
          computer engineering, and I have been working in the field since 2018.
        </p>
        <br />
        <p>
          I have a wide range of hobbies and passions that keep me busy. From
          reading, playing sports, traveling, to write about web development. I
          am always seeking new experiences and love to keep myself engaged and
          learning new things.
        </p>
        <br />
        <p>
          I believe that you should{' '}
          <span className="font-bold text-teal-700">never stop growing</span>,
          and that's what I strive to do, I have a passion for technology and a
          desire to always push the limits of what is possible. I am excited to
          see where my career takes me and am always open to new opportunities.
          🙂
        </p>
      </div>
    </section>
  );
};

export default About;
