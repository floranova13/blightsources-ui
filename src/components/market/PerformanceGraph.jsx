import React, { useState, useEffect } from 'react';
import { usePrices } from '../../hooks/prices';
import SimplePerformanceAreaChart from './SimplePerformanceAreaChart';
import { toTitleCase } from '../../utils';
import {
  getRecentPrices,
  getBlightsourceStats,
  getCombinedCategoryStats,
  getCombinedSubcategoryStats,
} from '../../utils/prices';
import {
  getBlightsourceByName,
  getCategoryBySubcategory,
  getBlightsourceNamesBySubcategory,
  getBlightsourceNamesByCategory,
} from '../../utils/blightsources';
import { Link } from 'react-router-dom';

const getPerformanceArr = (prices, type, filter) => {
  switch (type) {
    case 'category':
      return getCombinedCategoryStats(filter, prices, true).performanceArr;
    case 'subcategory':
      return getCombinedSubcategoryStats(filter, prices, true).performanceArr;
    case 'blightsource':
      return getBlightsourceStats(prices[filter], true).performanceArr;
    default:
      return [];
  }
};

const getBlightsourceUrl = (s, type) => {
  switch (type) {
    case 'category':
      return `/market/${s}`;
    case 'subcategory':
      const cat = getCategoryBySubcategory(s).toLowerCase();
      return `/market/${cat}/${s}`;
    case 'blightsource':
      const b = getBlightsourceByName(s);
      const c = b.category.toLowerCase();
      const sub = b.subcategory.toLowerCase();
      return `/market/${c}/${sub}/${s}`;
    default:
      return '';
  }
};

const PriceGraph = ({ filter, type, height, width }) => {
  const { data: prices, isLoading } = usePrices();

  return (
    <div className='text-center inline-block'>
      {!isLoading && (
        <Link
          to={getBlightsourceUrl(filter, type)}
          className='text-gray-500 text-2xl font-bold transition-all duration-1000 inline hover:text-white hover:em'
        >
          {toTitleCase(filter)}
        </Link>
      )}
      {!isLoading && (
        <SimplePerformanceAreaChart
          key={prices.priceHistory.length}
          data={getPerformanceArr(prices, type, filter).map((p, i) => {
            return { name: `T${i}`, '% Change': p }; // TODO: MAKE SURE SIMPLEAREACHART KNOWS WHAT KEY TO USE
          })}
          height={height}
          width={width}
        />
      )}
    </div>
  );
};

export default PriceGraph;
