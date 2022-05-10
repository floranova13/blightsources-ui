import blightsources from '../resources/blightsources.json';

export const getRarityLabel = (n) => {
  if (n < 9) {
    return 'Rare';
  } else if (n < 27) {
    return 'Uncommon';
  }
  return 'Common';
};

export const getBlightsourceCategories = () => {
  return blightsources.information;
};

export const getBlightsourceSubcategories = (category = '') => {
  if (category) {
    return getBlightsourceCategories().first((c) => c.name === category);
  }

  return getBlightsourceCategories().reduce((arr, c) => {
    arr.push(...c.subcategories);
    return arr;
  }, []);
};

export const getBlightsources = (category = '', subcategory = '') => {
  const blightsourceArray = [];

  Object.values(blightsources.blightsources).forEach((subcategoryObject) =>
    Object.values(subcategoryObject).forEach((blightsourceObject) => {
      blightsourceArray.push(...blightsourceObject);
    })
  );

  return blightsourceArray.filter(
    (b) =>
      (!category || b.category.toLowerCase() === category.toLowerCase()) &&
      (!subcategory ||
        b.subcategory.toLowerCase() === subcategory.toLowerCase())
  );
};

export const getCategoryBySubcategory = (s) => {
  return blightsources.information.find(
    (c) =>
      c.subcategories.filter(
        (subcategory) =>
          subcategory.subcategory.toLowerCase() === s.toLowerCase()
      ).length > 0
  ).category;
};

export const getBlightsourceNames = () =>
  getBlightsources().map((b) => b.name.toLowerCase());

export const getBlightsourceNamesByCategory = (s) => {
    return getBlightsources(s).map((b) => b.name.toLowerCase());
};

export const getBlightsourceNamesBySubcategory = (s) => {
  const category = getCategoryBySubcategory(s);
  return getBlightsources(category, s).map((b) => b.name.toLowerCase());
};

export const getBlightsourceByName = (s) =>
  getBlightsources().find((b) => b.name.toLowerCase() === s.toLowerCase());
