import React, { useState, useEffect } from 'react';
import { usePrices, usePrice } from '../hooks/prices';
import { getBlightsourceNames } from '../utils/blightsources';

const Information = () => {
  const [blightsources, setBlightsources] = useState([]);
  const [prices, setPrices] = useState(null);
  const { data: pricesData, isLoading: isLoadingPrices } = usePrices();

  const fetchBlightsources = async () => {
    const response = await fetch(
      'https://blightsources-backend.herokuapp.com/api/blightsources'
    );
    const data = await response.json();
    setBlightsources(data);
  };

  useEffect(() => {
    if (!isLoadingPrices) {
      setPrices(pricesData);
    }
  }, [pricesData, isLoadingPrices]);

  return (
    <div className='text-white'>
      <ul>
        {prices &&
          getBlightsourceNames().map((blightsourceName, i) => {
            console.log(prices[blightsourceName]);
            return (
              <li
                key={blightsourceName}
              >{`${blightsourceName} - ${prices[blightsourceName].basePrice}`}</li>
            );
          })}
      </ul>
    </div>
  );
};

export default Information;
