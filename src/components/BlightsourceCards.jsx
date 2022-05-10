import React from 'react';
import info from '../resources/blightsources.json';
import { getBlightsources } from '../utils/blightsources';

// TODO: PUT A DICTIONARY OF CATEGORY ICONS

const Blightsource = ({
  category,
  subcategory,
  categorySetter,
  subcategorySetter,
  blightsourceSetter,
}) => {
  return (
    <>
      <div className='blightsource-nav-container'>
        <h2 className='inline-block text-white text-2xl font-bold mb-9'>
          {subcategory}
        </h2>
        <button
          type='button'
          className='px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-32 text-center ml-3'
          onClick={() => subcategorySetter('')}
        >
          Back
        </button>
        <button
          type='button'
          className='px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-32 text-center ml-3'
          onClick={() => {
            categorySetter('');
            subcategorySetter('');
          }}
        >
          Categories
        </button>
      </div>
      <ul className='space-y-3'>
        {getBlightsources(
          category.toLowerCase(),
          subcategory.toLowerCase()
        ).map((b, i) => (
          <li
            key={i}
            className='sm:flex text-gray-300 hover:text-white'
            onClick={() => blightsourceSetter(b.name)}
          >
            <div className='mb-4 flex-shrink-0 sm:mb-0 sm:mr-4'>
              <svg
                className='h-64 w-64 border border-gray-300 bg-white'
                preserveAspectRatio='none'
                stroke='currentColor'
                fill='none'
                viewBox='0 0 200 200'
                aria-hidden='true'
              >
                <path
                  vectorEffect='non-scaling-stroke'
                  strokeWidth={1}
                  d='M0 0l200 200M0 200L200 0'
                />
              </svg>
            </div>
            <div className=''>
              <h4 className='text-lg font-bold'>{b.name}</h4>
              {b.description.map((s, j) => (
                <p className='mt-1' key={`paragraph-${j}`}>
                  {s}
                </p>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Blightsource;
