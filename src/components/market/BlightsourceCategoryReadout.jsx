import React, { useState, useEffect } from 'react';
import { toTitleCase } from '../../utils';
import { getBlightsourceNamesByCategory } from '../../utils/blightsources';
import { getCombinedCategoryStats } from '../../utils/prices';
import PriceGraph from './PriceGraph';
import Icon from '../Icon';
import { useNavigate, useParams } from 'react-router-dom';
import { usePrices } from '../../hooks/prices';

const BlightsourceCategoryReadout = () => {
  // TODO: Eventually, seperate the data into categories by rarity
  let { category } = useParams();
  const navigate = useNavigate();
  const blightsources = getBlightsourceNamesByCategory(category);
  const { data: prices, isLoading } = usePrices();
  const [averagePrice, setAveragePrice] = useState('');
  const [averagePerformance, setAveragePerformance] = useState(''); // Average Percentage Increase Or Decrease
  const [x, setX] = useState('');
  const [overallPerformance, setOverallPerformance] = useState('');

  useEffect(() => {
    if (!isLoading) {
      const stats = getCombinedCategoryStats(category, prices);
      console.log({ stats });
      setAveragePrice(stats.averagePrice);
      setAveragePerformance(stats.performance);
      setOverallPerformance(stats.overallPerformance);
    }
  }, [prices, isLoading]);

  const getPriceString = (n) => `${n} coins`;

  const getPercentageString = (n) => (n > 0 ? `+${n}%` : `${n}%`);

  return (
    <div className='text-center my-3'>
      <div className='bg-indigo-900 bg-opacity-50 shadow overflow-hidden sm:rounded-lg'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-lg leading-6 font-medium text-white'>
            {toTitleCase(category)}
          </h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-400'>
            General market information.
          </p>
        </div>
        <div className='border-t border-gray-200 px-4 py-5 sm:px-6'>
          <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-white'>Average Price</dt>
              <dd className='mt-1 text-sm text-gray-400'>{`${getPriceString(
                averagePrice
              )}`}</dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-white'>
                Average Performance
              </dt>
              <dd className='mt-1 text-sm text-gray-400'>{`${getPercentageString(
                averagePerformance
              )}`}</dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-white'>X</dt>
              <dd className='mt-1 text-sm text-gray-400'>{averagePrice}</dd>
            </div>
            <div className='sm:col-span-1'>
              <dt className='text-sm font-medium text-white'>Y</dt>
              <dd className='mt-1 text-sm text-gray-400'>
                {overallPerformance}
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
              <dt className='text-lg font-medium mb-3 text-white'>
                Individual Charts
              </dt>
              <dd className='mt-1 text-sm text-gray-900'>
                {blightsources.map((b, i) => (
                  <div key={`${b}-price-graph`} className='w-1/3 inline-block'>
                    <PriceGraph
                      key={`${b}-price-graph`}
                      blightsourceName={b}
                      height={150}
                      width={250}
                    />
                  </div>
                ))}
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

      {blightsources.map((b, i) => (
        <div key={`${b}-price-graph`} className='w-1/3 inline'>
          <PriceGraph
            key={`${b}-price-graph`}
            blightsourceName={b}
            height={150}
            width={250}
          />
        </div>
      ))} */}
    </div>
  );
};

export default BlightsourceCategoryReadout;
