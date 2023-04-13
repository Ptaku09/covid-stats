import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DefaultLayout from './layouts/DefaultLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './routes/ErrorPage';
import Root from './routes/Root';
import CountryInfo from './routes/CountryInfo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'country/:countrySlug',
    element: <CountryInfo />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <DefaultLayout>
      <RouterProvider router={router} />
    </DefaultLayout>
  </React.StrictMode>
);
