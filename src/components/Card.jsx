import React from 'react';

const Card = ({ children, id }) => {
  return (
    <li
      key={id}
      className='bg-white shadow overflow-hidden rounded-md px-6 py-4'
    >
      {children}
    </li>
  );
};

export default Card;
