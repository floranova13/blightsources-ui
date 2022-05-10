export let knownVolatility = [
  {
    'forslone': true,
  },
];

export const clearKnowledge = (all = true) => {
  knownVolatility = all ? {} : { 'forslone': true };
};

export const getKnowledge = () => {
  return { knownVolatility };
};

export const checkVolatilityKnowledge = (s) => knownVolatility[s];

export const updateVolatilityKnowledge = (s) => (knownVolatility[s] = true);
