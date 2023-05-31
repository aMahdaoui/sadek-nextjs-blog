// import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';

export default function Projects({ projectsData }) {
  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>Projects</h2>
      <ul className={utilStyles.list}>
        {projectsData.map(({ title, link, description, id }) => (
          <li className={utilStyles.listItem} key={id}>
            <a href={`${link}`} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
            <br />
            <small className={utilStyles.lightText}>{description}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
