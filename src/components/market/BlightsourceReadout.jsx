import React, { useState, useEffect } from 'react';
import { toTitleCase } from '../../utils';
import { getBlightsourceByName } from '../../utils/blightsources';
import { getRecentPrices } from '../../utils/prices';
import PriceGraph from './PriceGraph';
import Icon from '../Icon';
import { useNavigate, useParams } from 'react-router-dom';
import { usePrice } from '../../hooks/prices';

const BlightsourceReadout = () => {
  let { category, subcategory, blightsourceName } = useParams();
  const [blightsource, setBlightsource] = useState({});
  const navigate = useNavigate();
  const { data: price, isLoading } = usePrice(blightsourceName);
  const [blightsourcePrice, setBlightsourcePrice] = useState('');
  const [blightsourcePerformance, setBlightsourcePerformance] = useState(''); // Average Percentage Increase Or Decrease
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  useEffect(() => {
    if (!isLoading) {
      setBlightsource(getBlightsourceByName(blightsourceName));
      const recentPrices = getRecentPrices(price);
      const difference = price.priceHistory[price.priceHistory.length - 1] - recentPrices[0];
      const percentage = (difference / recentPrices[0]) * 100;
      setBlightsourcePrice(price.priceHistory[price.priceHistory.length - 1]);
      setBlightsourcePerformance(
        Math.round((percentage + Number.EPSILON) * 100) / 100
      );
    }
  }, [price, isLoading]);

  const getPriceString = (n) => `${n} coins`;

  const getPercentageString = (n) => (n > 0 ? `+${n}%` : `${n}%`);

  // ADD CATEGORY AND SUBCATEGORY HEADERS

  return (
    <div className='text-center my-3'>
      <div className='bg-indigo-900 bg-opacity-50 shadow overflow-hidden sm:rounded-lg'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-2xl leading-6 font-bold text-white pb-3'>
            {toTitleCase(blightsource?.name)}
          </h3>
          <div className='flex justify-center font-bold'>
            <h2 className='inline-block text-center mt-1 mb-2 max-w-2xl text-sm text-gray-200 text-xl'>{`Category: ${toTitleCase(
              blightsource?.category
            )}`}</h2>
            <h2 className='inline-block text-center mt-1 mb-2 ml-12 max-w-2xl text-sm text-gray-200 text-xl'>{`Subcategory: ${toTitleCase(
              blightsource?.subcategory
            )}`}</h2>
          </div>
          <p className='mt-1 max-w-2xl text-sm text-gray-400'>
            General market information.
          </p>
        </div>
        <div className='border-t border-gray-200 px-4 py-5 sm:px-6'>
          <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-white'>Current Price</dt>
              <dd className='mt-1 text-sm text-gray-400'>{`${getPriceString(
                blightsourcePrice
              )}`}</dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-white'>
                Current Performance
              </dt>
              <dd className='mt-1 text-sm text-gray-400'>{`${getPercentageString(
                blightsourcePerformance
              )}`}</dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-white'>X</dt>
              <dd className='mt-1 text-sm text-gray-400'>
                {blightsourcePerformance}
              </dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-white'>Y</dt>
              <dd className='mt-1 text-sm text-gray-400'>
                {blightsourcePerformance}
              </dd>
            </div>
            <div className='sm:col-span-2'>
              <dt className='text-sm font-medium text-white'>Z</dt>
              <dd className='mt-1 text-sm text-gray-400'>
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu.
              </dd>
            </div>
            <div className='sm:col-span-2'>
              <dt className='text-sm font-medium text-white'>Market Trend</dt>
              <dd className='mt-1 text-sm text-gray-900'>
                <div className='w-1/3 inline'>
                  <PriceGraph
                    blightsourceName={blightsourceName}
                    height={150}
                    width={250}
                  />
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* <button
        type='button'
        className='px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-32 text-center'
        onClick={() => navigate(`/market/${category}`)}
      >
        Back
      </button>
      <div className=''>
        <span className='text-white text-2xl font-bold my-3 inline-block'>
          {toTitleCase(subcategory)}
        </span>
      </div>
*/}
    </div>
  );
};

export default BlightsourceReadout;
