import React from 'react';
import info from '../resources/blightsources.json';
import Icon from './Icon';

// TODO: PUT A DICTIONARY OF CATEGORY ICONS

const BlightsourceSubcategoryCards = ({
  category,
  categorySetter,
  subcategorySetter,
}) => {
  return (
    <>
      <div className='blightsource-nav-container'>
        <h2 className='inline-block text-white text-2xl font-bold mb-9'>
          {category}
        </h2>
        <button
          type='button'
          className='px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-32 text-center ml-3'
          onClick={() => categorySetter('')}
        >
          Back
        </button>
      </div>

      <ul className='space-y-3'>
        {info.information
          .find((el) => el.category === category)
          .subcategories.map((subcategory, i) => (
            <li
              key={i}
              className='sm:flex text-gray-300 hover:text-white'
              onClick={() => subcategorySetter(subcategory.subcategory)}
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
                <h4 className='text-lg font-bold'>{subcategory.subcategory}</h4>
                {subcategory.description.map((s, j) => (
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

export default BlightsourceSubcategoryCards;
