import { useQuery, useMutation, useQueryClient } from 'react-query';

const fetchBlightsources = async () => {
  const response = await fetch(
    'https://blightsources-backend.herokuapp.com/api/blightsources'
  );
  const data = await response.json();
  return data;
};

const fetchBlightsource = async (blightsourceName) => {
  const response = await fetch(
    'https://blightsources-backend.herokuapp.com/api/blightsources'
  );
  const data = await response.json();
  return data;
};

export const useBlightsources = () => {
  try {
    return useQuery(['blightsources'], fetchBlightsources);
  } catch (e) {
    console.log('Error in useBlightsources');
    console.log(e);
  }
};

export const useBlightsource = (name) => {
  try {
    return useQuery(['blightsource', name.toLowerCase()], () =>
      fetchBlightsource(name)
    );
  } catch (e) {
    console.log('Error in useBlightsources');
    console.log(e);
  }
};

// export const useUpdatePrices = () => {
//   const queryClient = useQueryClient();
//   return useMutation(updatePrices, {
//     onSuccess: () => {
//       queryClient.refetchQueries('blightsources', 'blightsource');
//     },
//   });
// };
