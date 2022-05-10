export const startingCoins = 100;

export const startingBlightsources = [
  {
    name: 'forslone',
    count: 10,
  },
];

export const setStartingResources = () => {
  localStorage.setItem('coins', startingCoins);
  localStorage.setItem('blightsources', startingBlightsources);
}