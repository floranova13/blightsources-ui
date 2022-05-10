import React from 'react';
import IconWrapper from '../components/Icon';
import { toTitleCase } from '../utils';
import { useNavigate } from 'react-router-dom';

const Market = () => {
  let navigate = useNavigate();
  const categories = [
    'blightstones',
    'blightichors',
    'blightfumes',
    'blightflora',
    'blightfungi',
    'blightanomalies',
  ];

  const handleClick = (nav) => navigate(nav);

  return (
    <div className='text-white m-auto'>
      <ul className='text-center flex-row sm:flex justify-center'>
        {categories.map((category) => (
          <li
            key={category}
            className=''
            onClick={() => handleClick(`/market/${category.toLowerCase()}`)}
          >
            <div className='flex align-middle items-center justify-center'>
              <IconWrapper
                icon={category}
                size='72'
                nav={`/market/${category.toLowerCase()}`}
              />
            </div>
            <p className='mt-2 inline-block text-sm font-medium white'>
              {toTitleCase(category)}
            </p>
            <br />
            <p className='inline-block text-sm font-medium text-gray-500'>
              {0}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Market;
