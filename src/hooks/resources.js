import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchPrices } from './prices';
import { getCurrentPrice } from '../utils/prices';
import _ from 'lodash';

const getBlightsources = () => {
  const blightsources = localStorage.getItem('blightsources');
  return blightsources;
};

const getCoins = () => {
  const coins = localStorage.getItem('coins');
  return coins;
};

export const useResources = async () => {
  return useQuery(['resources'], getBlightsources());
};

export const useCoins = async () => {
  return useQuery(['coins'], getCoins());
};

const makeTransaction = async (coins, blightsources, transaction) => {
  const { blightsourceName, count, isBuy } = transaction;
  const blightsourcePrice = await fetchPrices(blightsourceName);
  const blightsourcesCopy = _.cloneDeep(blightsources);
  const blightsource = blightsourcesCopy.find(
    (b) => b.name === blightsourceName
  );

  if (isBuy) {
    // ADD TO THE RECORD OF TRANSACTIONS HERE?
    blightsource.count += count;
    localStorage.setItem(
      'coins',
      coins - getCurrentPrice(blightsourcePrice) * count
    );
  } else {
    blightsource.count -= count;
    localStorage.setItem(
      'coins',
      coins + getCurrentPrice(blightsourcePrice) * count
    );
  }

  localStorage.setItem('blightsources', blightsourcesCopy);
};

export const useMarket = async (transaction) => {
  const blightsources = getBlightsources();
  const coins = getCoins();

  const queryClient = useQueryClient();

  return useMutation(() => makeTransaction(coins, blightsources, transaction), {
    onSuccess: () => {
      queryClient.refetchQueries(['resources', 'coins']);
    },
  });
};
