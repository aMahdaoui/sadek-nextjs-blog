import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';
import Date from './common/date';

export default function Blog({ postsData }) {
  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
        {postsData.map(({ id, date, title, field }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
            <p className={utilStyles.fieldTag}>{field}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
