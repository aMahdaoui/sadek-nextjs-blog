import React from 'react';
import { nanoid } from 'nanoid';
import styles from './styles/common.module.css';

const Tag = ({ tagName }) => <span className={styles.tag}>{tagName}</span>;

export default function Tags({ tags }) {
  const tagsArray = tags.split(',').filter((n) => n);
  const tagsList = tagsArray.map((tag, index) => {
    return <Tag key={nanoid()} tagName={tag}></Tag>;
  });
  return <div>{tagsList}</div>;
}
