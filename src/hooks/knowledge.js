// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import { getKnowledge, checkVolatilityKnowledge, updateVolatilityKnowledge } from '../utils/knowledge';

// export const useGetKnowledge = () => {
//   return useQuery(['allKnowledge'], getKnowledge);
// };

// // TODO: FINISH HERE!!!!!!!!!!!!!!!!!!!!

// export const useGetBlightsource = (name) => {
//   return useQuery(['knowledge', name.toLowerCase()], () => getResource(name));
// };

// export const useUpdateResource = (r) => {
//   const queryClient = useQueryClient();
//   return useMutation(() => updateResource(r), {
//     onSuccess: () => {
//       queryClient.refetchQueries('allKnowledge', 'knowledge');
//     },
//   });
// };
