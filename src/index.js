/* eslint-disable import/first */
require('dotenv').config();
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Amplify } from 'aws-amplify';
const aws_exports =
  process.env.ENVIRONMENT === 'LOCAL'
    ? require('./aws-exports')
    : process.env.CONFIG;
    
Amplify.configure(aws_exports);

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 2,
      cacheTime: 1000 * 60 * 60 * 12,
      // refetchInterval: 1000 * 7,
    },
  },
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById('root')
);

