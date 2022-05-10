import { useQuery } from 'react-query';

export const fetchPrices = async () => {
  const response = await fetch(
    'https://blightsources-backend.herokuapp.com/api/prices'
  );
  const data = await response.json();
  const pricesData = {};

  for (const price of data) {
    pricesData[price.name] = price;
  }

  console.log(pricesData);

  return pricesData;
};

export const fetchPrice = async (blightsourceName) => {
  const response = await fetch(
    `https://blightsources-backend.herokuapp.com/api/prices/${blightsourceName}`
  );
  const data = await response.json();
  return data;
};

export const usePrices = () => {
  try {
    return useQuery(['prices'], fetchPrices);
  } catch (e) {
    console.log('usePrices error');
    console.log(e);
  }
};

export const usePrice = (name) => {
  try {
    return useQuery(
      ['price', name.toLowerCase()],
      fetchPrice(name.toLowerCase())
    );
  } catch (e) {
    console.log('usePrice error');
    console.log(e);
  }
};
