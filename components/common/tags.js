import React from 'react';
import { nanoid } from 'nanoid';

const Tag = ({ tagName }) => (
  <span className="border border-sky-500  rounded-lg  m-0.5 px-2 pb-0.25">
    {tagName}
  </span>
);

export default function Tags({ tags }) {
  if (!tags) return <></>;
  else {
    const tagsArray = tags.split(',').filter((n) => n);
    const tagsList = tagsArray.map((tag, index) => {
      return <Tag key={nanoid()} tagName={tag}></Tag>;
    });
    return <div className="flex flex-wrap">{tagsList}</div>;
  }
}
