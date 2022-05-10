import { useQuery } from 'react-query';

const fetchCategories = async () => {
  const response = await fetch(
    'https://blightsources-backend.herokuapp.com/api/categories'
  );
  const data = await response.json();
  return data;
};

const fetchCategory = async (categoryName) => {
  const response = await fetch(
    `https://blightsources-backend.herokuapp.com/api/categories/${categoryName}`
  );
  const data = await response.json();
  return data;
};

export const useGetCategories = () => {
  return useQuery(['categories'], fetchCategories);
};

export const useGetCategory = (name) => {
  return useQuery(['category', name.toLowerCase()], () => fetchCategory(name));
};
