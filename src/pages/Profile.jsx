import React from 'react';
import IconWrapper from '../components/IconWrapper';
import { useResources } from '../hooks/resources';
import { toTitleCase } from '../utils';
import { getBlightsourceByName } from '../utils/blightsources';
import { Link } from 'react-router-dom';
// import {
//   GiStoneBlock,
//   GiBottleVapors,
//   GiPlantSeed,
//   GiMushroomsCluster,
//   GiStarSwirl,
// } from 'react-icons/gi';
// import { IoFlaskSharp } from 'react-icons/io5';

// const getIcon = (s) => {
//   // TODO: Get icons for each subcategory
//   switch (s) {
//     case 'blightstones':
//       return <GiStoneBlock />;
//     case 'blightichors':
//       return <IoFlaskSharp />;
//     case 'blightfumes':
//       return <GiBottleVapors />;
//     case 'blightflora':
//       return <GiPlantSeed />;
//     case 'blightfungi':
//       return <GiMushroomsCluster />;
//     case 'blightanomalies':
//       return <GiStarSwirl />;
//     default:
//       return <></>;
//   }
// };

const Profile = ({ user }) => {
  const { data: resources, isLoading } = useResources();

  return (
    <div className='shadow text-white overflow-hidden sm:rounded-lg'>
      <div className='px-4 py-5 sm:px-6'>
        <h3 className='text-lg leading-6 font-medium'>Merchant Information</h3>
        <p className='mt-1 max-w-2xl text-sm text-gray-300'>
          Personal details and resources.
        </p>
      </div>
      <div className='border-t border-gray-900 px-4 py-5 sm:p-0'>
        <dl className='sm:divide-y sm:divide-gray-900'>
          <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium'>Name</dt>
            <dd className='mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2'>
              {user.name}
            </dd>
          </div>
          <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium'>Classification</dt>
            <dd className='mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2'>
              {user.rank}
            </dd>
          </div>
          <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium'>Wealth</dt>
            <dd className='mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2 inline-block'>
              {`${user.coins}  `}
              <IconWrapper icon={'coins'} />
            </dd>
          </div>
          <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium'>About</dt>
            <dd className='mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2'>
              {user.about}
            </dd>
          </div>
          <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium'>Resources</dt>
            <dd className='mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2'>
              <ul className='bg-gray-700 border border-gray-900 rounded-md divide-y divide-gray-900'>
                {!isLoading &&
                  resources.map((r, i) => {
                    const blightsource = getBlightsourceByName(r.name);
                    const category = blightsource.category.toLowerCase();
                    const subcategory = blightsource.subcategory.toLowerCase();

                    return (
                      <li
                        key={`${r.name}-resource`}
                        className='text-white pl-3 pr-4 py-3 flex items-center justify-between text-sm'
                      >
                        <div className='w-0 flex-1 flex items-center'>
                          <IconWrapper icon={subcategory} />
                          {/* {getIcon(blightsource.category.toLowerCase())} */}
                          {/* <PaperClipIcon
                            className='flex-shrink-0 h-5 w-5 text-gray-400'
                            aria-hidden='true'
                          /> */}
                          <span className='ml-2 flex-1 w-0 truncate'>
                            {`${toTitleCase(r.name)} - (${r.count})`}
                          </span>
                        </div>
                        <div className='ml-4 flex-shrink-0'>
                          <Link
                            to={`/market/${blightsource.category}/${blightsource.subcategory}/${r.name}`}
                            className='font-bold text-white hover:text-indigo-500' // TODO: replace with icon!!!!!!
                          >
                            Market Data
                          </Link>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Profile;
