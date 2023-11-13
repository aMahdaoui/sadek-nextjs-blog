import React from 'react';

export default function SectionHeading({ heading }) {
  return (
    <h1 className="text-center font-bold text-4xl">
      {heading}
      <hr className="w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded"></hr>
    </h1>
  );
}
