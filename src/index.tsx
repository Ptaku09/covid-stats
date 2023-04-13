import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './views/App/App';
import DefaultLayout from './layouts/DefaultLayout';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <DefaultLayout>
      <App />
    </DefaultLayout>
  </React.StrictMode>
);
