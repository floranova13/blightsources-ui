import React, { useState, useEffect } from 'react';
import { usePrice } from '../../hooks/prices';
import SimpleAreaChart from './SimpleAreaChart';
import { toTitleCase } from '../../utils';
import { getRecentPrices } from '../../utils/prices';
import { getBlightsourceByName } from '../../utils/blightsources';
import { Link } from 'react-router-dom';

const getBlightsourceUrl = (s) => {
  const b = getBlightsourceByName(s);
  const cat = b.category.toLowerCase();
  const subcat = b.subcategory.toLowerCase();
  return `/market/${cat}/${subcat}/${s}`;
};

const PriceGraph = ({ blightsourceName, height, width }) => {
  const { data: price, isLoading: isPriceLoading } = usePrice(blightsourceName);
  const [blightsource, setBlightsource] = useState(null);

  useEffect(() => {
    // REMOVE???
    if (!isPriceLoading) {
      setBlightsource(getBlightsourceByName(blightsourceName));
    }
  }, [isPriceLoading, blightsourceName]);

  return (
    <div className='text-center inline-block'>
      {blightsource && (
        <Link
          to={getBlightsourceUrl(blightsourceName)}
          className='text-gray-500 text-2xl font-bold transition-all duration-1000 inline hover:text-white hover:em'
        >
          {toTitleCase(blightsourceName)}
        </Link>
      )}
      {!isPriceLoading && (
        <SimpleAreaChart
          key={price.priceHistory.length}
          data={getRecentPrices(price).map((p, i) => {
            return { name: `T${i}`, coins: p };
          })}
          height={height}
          width={width}
        />
      )}
    </div>
  );
};

export default PriceGraph;
