import { useQuery } from 'react-query';

const fetchSubcategories = async () => {
  const response = await fetch(
    'https://blightsources-backend.herokuapp.com/api/subcategories'
  );
  const data = await response.json();
  return data;
};

const fetchSubcategory = async (subcategoryName) => {
  const response = await fetch(
    `https://blightsources-backend.herokuapp.com/api/subcategories/${subcategoryName}`
  );
  const data = await response.json();
  return data;
};

export const useGetSubcategories = () => {
  return useQuery(['subcategories'], fetchSubcategories);
};

export const useGetSubcategory = (name) => {
  return useQuery(['subcategory', name.toLowerCase()], () => fetchSubcategory(name));
};
