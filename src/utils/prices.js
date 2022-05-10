import {
  getBlightsourceByName,
  getBlightsourceNamesByCategory,
  getBlightsourceNamesBySubcategory,
} from './blightsources';
import { getRandomInt, clamp, getMean, getMedian } from './index';

export const getPriceFromArr = (prices, blightsourceName) => prices.find(b => b.name === blightsourceName);


export const getNewBlightsourcePrice = (blightsourceName, price) => {
  const blightsource = getBlightsourceByName(blightsourceName);
  const { basePrice, priceHistory } = price;
  let maxMult = 1;
  let minMult = 1;

  switch (blightsource.volatility) {
    case 'volatile':
      maxMult = 1.75;
      minMult = 0.25;
      break;
    case 'fluid':
      maxMult = 1.5;
      minMult = 0.5;
      break;
    case 'stable':
      maxMult = 1.25;
      minMult = 0.75;
      break;
    case 'fixed':
      break;
    default:
      break;
  }

  const minNum = Math.round(basePrice * minMult);
  const maxNum = Math.round(basePrice * maxMult);
  const directionMult = Math.random() >= 0.5 ? 1 : -1;
  const newNum = clamp(
    getRandomInt(1, 31 - blightsource.rarity + 1) * directionMult +
      getCurrentPrice(price),
    minNum,
    maxNum
  );

  const newPrice = {
    basePrice,
    currentPrice: newNum,
    priceHistory: [...priceHistory, newNum],
  };

  return newPrice;
};

// export const updatePrices = () => {
//   const newPrices = {};

//   for (const blightsourceName in prices) {
//     if (prices.hasOwnProperty(blightsourceName)) {
//       const newPrice = getNewBlightsourcePrice(
//         blightsourceName,
//         prices[blightsourceName]
//       );
//       newPrices[blightsourceName] = newPrice;
//     }
//   }

//   prices = newPrices;
// };

export const getRecentPrices = (price, numRecent = 30) => {
  const priceArr = [];
  const len = price.priceHistory.length;
  for (let i = len - (1 + numRecent); i < len; i++) {
    priceArr.push(price.priceHistory[i]);
  }

  return priceArr;
};

export const getCurrentPrice = (price) =>
  price.priceHistory[price.priceHistory.length - 1];

export const getBlightsourceStats = (price, round = false) => {
  const recentPrices = getRecentPrices(price);
  const averagePrice = getMean(recentPrices);
  const overallAveragePrice = getMean(price.priceHistory);
  const medianPrice = getMedian(recentPrices);
  const overallMedianPrice = getMedian(price.priceHistory);
  const difference = getCurrentPrice(price) - recentPrices[0];
  const overallDifference = getCurrentPrice(price) - price.basePrice;
  const percentage = (difference / recentPrices[0]) * 100;
  const overallPercentage = (overallDifference / price.basePrice) * 100;
  const performance = round
    ? Math.round((percentage + Number.EPSILON) * 100) / 100
    : percentage;
  const overallPerformance = round
    ? Math.round((overallPercentage + Number.EPSILON) * 100) / 100
    : overallPercentage;

  const performanceArr = [];

  for (let i = 0; i < recentPrices.length; i++) {
    const currentOverallDifference = recentPrices[i] - price.basePrice;
    const currentOverallPercentage =
      (currentOverallDifference / price.basePrice) * 100;
    const currentOverallPerformance = round
      ? Math.round((currentOverallPercentage + Number.EPSILON) * 100) / 100
      : currentOverallPercentage;
    performanceArr.push(currentOverallPerformance);
  }

  return {
    performance,
    overallPerformance,
    averagePrice,
    medianPrice,
    overallAveragePrice,
    overallMedianPrice,
    performanceArr,
  };
};

const getCombinedBlightsourceStats = (
  prices,
  blightsourceNames,
  round = false
) => {
  const recentNum = 30;
  let performance = 0;
  let overallPerformance = 0;
  let averagePrice = 0;
  let medianPrice = 0;
  let overallAveragePrice = 0;
  let overallMedianPrice = 0;
  const performanceArr = [];
  for (let i = 0; i < recentNum; i++) {
    performanceArr.push(0);
  }
  const nameArr = blightsourceNames.map((s) => s.toLowerCase());

  for (let i = 0; i < nameArr.length; i++) {
    const stats = getBlightsourceStats(prices[nameArr[0]], false);
    performance += stats.performance;
    overallPerformance += stats.overallPerformance;
    averagePrice += stats.averagePrice;
    medianPrice += stats.medianPrice;
    overallAveragePrice += stats.overallAveragePrice;
    overallMedianPrice += stats.overallMedianPrice;
    stats.performanceArr.forEach((perf, i) => (performanceArr[i] += perf));
  }

  performance /= nameArr.length;
  overallPerformance /= nameArr.length;
  averagePrice /= nameArr.length;
  medianPrice /= nameArr.length;
  overallAveragePrice /= nameArr.length;
  overallMedianPrice /= nameArr.length;
  performanceArr.map((perf) => (perf /= perf.length));

  if (round) {
    performance = Math.round((performance + Number.EPSILON) * 100) / 100;
    overallPerformance =
      Math.round((overallPerformance + Number.EPSILON) * 100) / 100;
    averagePrice = Math.round((averagePrice + Number.EPSILON) * 100) / 100;
    medianPrice = Math.round((medianPrice + Number.EPSILON) * 100) / 100;
    overallAveragePrice =
      Math.round((overallAveragePrice + Number.EPSILON) * 100) / 100;
    overallMedianPrice =
      Math.round((overallMedianPrice + Number.EPSILON) * 100) / 100;
    performanceArr.map(
      (perf) => Math.round((perf + Number.EPSILON) * 100) / 100
    );
  }

  return {
    performance,
    overallPerformance,
    averagePrice,
    medianPrice,
    overallAveragePrice,
    overallMedianPrice,
    performanceArr,
  };
};

export const getCombinedSubcategoryStats = (
  subcategory,
  prices,
  round = false
) => {
  const blightsourceNameArr = getBlightsourceNamesBySubcategory(subcategory);
  return getCombinedBlightsourceStats(prices, blightsourceNameArr, round);
};

export const getCombinedCategoryStats = (category, prices, round = false) => {
  const blightsourceNameArr = getBlightsourceNamesByCategory(category);
  return getCombinedBlightsourceStats(prices, blightsourceNameArr, round);
};
