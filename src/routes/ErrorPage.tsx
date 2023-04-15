import React from 'react';
import PageNotFoundError from '../components/atoms/PageNotFoundError';

const ErrorPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <PageNotFoundError />
    </div>
  );
};

export default ErrorPage;
