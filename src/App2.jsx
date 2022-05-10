import React, { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  BellIcon,
  MenuIcon,
  XIcon,
  BeakerIcon,
  MinusCircleIcon,
  SparklesIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Market from './pages/Market';
import Blightsources from './pages/Blightsources';
import Information from './pages/Information';
import BlightsourceReadout from './components/market/BlightsourceReadout';
import BlightsourceSubcategoryReadout from './components/market/BlightsourceSubcategoryReadout';
import BlightsourceCategoryReadout from './components/market/BlightsourceCategoryReadout';
import Profile from './pages/Profile';
import { useUpdatePrices } from './hooks/blightsources';
import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const user = {
  name: 'Gwen',
  rank: 'Struggling Peddler',
  coins: '100',
  imageUrl:
    'https://images.unsplash.com/photo-1627645835237-0743e52b991f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80&auto=format&fit=crop&w=880&q=80',
  about:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicabo ex eligendi minima! Tenetur explicabo officia non, similique enim veritatis.',
};
const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Blightsources', path: '/blightsources' },
  { name: 'Market', path: '/market' },
  { name: 'Information', path: '/info' },
];
const userNavigation = [
  { name: 'Profile', path: '/profile' },
  { name: 'Settings', path: '/settings' },
];
const getIcon = {
  'Home': <SparklesIcon className='h-9 w-9' aria-hidden='true' />,
  'Blightsources': <BeakerIcon className='h-9 w-9' aria-hidden='true' />,
  'Market': <MinusCircleIcon className='h-9 w-9' aria-hidden='true' />,
  'Information': (
    <InformationCircleIcon className='h-9 w-9' aria-hidden='true' />
  ),
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function App({ signOut, user }) {
  let location = useLocation();
  let navigate = useNavigate();
  const [title, setTitle] = useState('Home');

  // useEffect(() => {
  //   let intervalID = setInterval(() => updatePrices(), 1000 * 20);
  //   return () => clearInterval(intervalID);
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setTitle(
      userNavigation.find((route) => location.pathname.includes(route.path))
        ?.name ||
        navigation
          .slice(1)
          .find((route) => location.pathname.includes(route.path))?.name ||
        'Home'
    );
  }, [location]);

  // TODO: BREAK OUT NAV AND TITLE INTO A PAGE HEADER COMPONENT
  // TODO: MAKE IT SO THE MOBILE MENU ACTUALLY NAVIGATES TO PAGES

  return (
    <div className='min-h-full'>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
      <div className='pb-32'>
        <Disclosure as='nav' className='bg-gray-800'>
          {({ open }) => (
            <>
              <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                <div className=''>
                  <div className='flex items-center justify-between h-16 px-4 sm:px-0'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0'>
                        <button
                          type='button'
                          className='ml-auto flex-shrink-0 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                        >
                          <span className='sr-only'>View notifications</span>
                          {getIcon[title]}
                        </button>
                      </div>
                      <div className='hidden md:block'>
                        <div className='ml-10 flex items-baseline space-x-4'>
                          {navigation.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              className={classNames(
                                item.path === location.pathname
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium',
                                item.name
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className='hidden md:block'>
                      <div className='ml-4 flex items-center md:ml-6'>
                        <button
                          type='button'
                          className=' p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                        >
                          <span className='sr-only'>View notifications</span>
                          <BellIcon className='h-6 w-6' aria-hidden='true' />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as='div' className='ml-3 relative'>
                          <div>
                            <Menu.Button className='max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                              <span className='sr-only'>Open user menu</span>
                              <img
                                className='h-8 w-8 rounded-full'
                                src={user.imageUrl}
                                alt='profile'
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter='transition ease-out duration-100'
                            enterFrom='transform opacity-0 scale-95'
                            enterTo='transform opacity-100 scale-100'
                            leave='transition ease-in duration-75'
                            leaveFrom='transform opacity-100 scale-100'
                            leaveTo='transform opacity-0 scale-95'
                          >
                            <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  <Link
                                    to={item.path}
                                    className={classNames(
                                      item.path === location.pathname
                                        ? 'bg-gray-100'
                                        : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <div className='-mr-2 flex md:hidden'>
                      {/* Mobile menu button */}
                      <Disclosure.Button className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                        <span className='sr-only'>Open main menu</span>
                        {open ? (
                          <XIcon className='block h-6 w-6' aria-hidden='true' />
                        ) : (
                          <MenuIcon
                            className='block h-6 w-6'
                            aria-hidden='true'
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className='border-b border-gray-700 md:hidden'>
                <div className='px-2 py-3 space-y-1 sm:px-3'>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={classNames(
                        item.path === location.pathname
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className='pt-4 pb-3 border-t border-gray-700'>
                  <div className='flex items-center px-5'>
                    <div className='flex-shrink-0'>
                      <img
                        className='h-10 w-10 rounded-full'
                        src={user.imageUrl}
                        alt=''
                      />
                    </div>
                    <div className='ml-3'>
                      <div className='text-base font-medium leading-none text-white'>
                        {user.name}
                      </div>
                      <div className='text-sm font-medium leading-none text-gray-400'>
                        {user.email}
                      </div>
                    </div>
                    <button
                      type='button'
                      className='ml-auto bg-gray-800 flex-shrink-0 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                    >
                      <span className='sr-only'>View notifications</span>
                      <BellIcon className='h-6 w-6' aria-hidden='true' />
                    </button>
                  </div>
                  <div className='mt-3 px-2 space-y-1'>
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as='a'
                        onClick={() => navigate(item.path)}
                        className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <header className='py-10'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='text-3xl font-bold text-white'>{title}</h1>
          </div>
        </header>
      </div>

      <main className='-mt-32 h-full'>
        <div className='max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 h-full'>
          <Routes>
            <Route path='/blightsources' element={<Blightsources />} />
            <Route
              path='/market/:category/:subcategory/:blightsourceName'
              element={<BlightsourceReadout />}
            />
            <Route
              path='/market/:category/:subcategory'
              element={<BlightsourceSubcategoryReadout />}
            />
            <Route
              path='/market/:category'
              element={<BlightsourceCategoryReadout />}
            />
            <Route path='/market' element={<Market />} />
            <Route path='/info' element={<Information />} />
            <Route path='/profile' element={<Profile user={user} />} />
            <Route path='/' element={<Homepage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default withAuthenticator(App);

