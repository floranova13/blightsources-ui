import React, { useState, useEffect } from 'react';
import info from '../resources/blightsources.json';
import { getBlightsourceByName } from '../utils/blightsources';

// TODO: PUT A DICTIONARY OF CATEGORY ICONS

const Blightsource = ({
  category,
  subcategory,
  categorySetter,
  subcategorySetter,
  blightsourceSetter,
  blightsourceName,
}) => {
  const blightsource = getBlightsourceByName(blightsourceName);

  return (
    <>
      <div className='blightsource-nav-container'>
        <h2 className='inline-block text-white text-2xl font-bold mb-9'>
          {subcategory}
        </h2>
        <button
          type='button'
          className='px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-32 text-center ml-3'
          onClick={() => blightsourceSetter('')}
        >
          Back
        </button>
        <button
          type='button'
          className='px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-32 text-center ml-3'
          onClick={() => {
            categorySetter('');
            subcategorySetter('');
            blightsourceSetter('');
          }}
        >
          Categories
        </button>
      </div>

      <div className='bg-black shadow overflow-hidden sm:rounded-lg'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-lg leading-6 font-medium text-white'>
            {blightsource.name}
          </h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>
            Blightsource information.
          </p>
        </div>
        <div className='border-t border-gray-900 px-4 py-5 sm:px-6'>
          <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-white'>Category</dt>
              <dd className='mt-1 text-sm text-gray-300'>
                {blightsource.category}
              </dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-white'>Subcategory</dt>
              <dd className='mt-1 text-sm text-gray-300'>
                {blightsource.subcategory}
              </dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-white'>X</dt>
              <dd className='mt-1 text-sm text-gray-300'>X</dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-white'>Y</dt>
              <dd className='mt-1 text-sm text-gray-300'>Y</dd>
            </div>
            <div className='sm:col-span-2'>
              <dt className='text-sm font-medium text-gray-500'>Description</dt>
              <dd className='mt-1 text-sm text-gray-300'>
                {blightsource.description}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default Blightsource;
