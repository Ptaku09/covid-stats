import React from 'react';

const PageNotFoundError = () => {
  return (
    <div className="w-11/12 md:w-96 p-5 mx-5 flex items-center justify-center flex-col gap-4 border-2 shadow-lg text-center">
      <h3 className="text-4xl font-bold">Oops!</h3>
      <p className="text-lg">Too many requests.</p>
      <p className="text-lg">
        <i>The API is not responding</i>
      </p>
      <div>
        <p>
          Please wait a moment and try{' '}
          <span>
            <button onClick={() => location.reload()} className="text-blue-500">
              reloading
            </button>
          </span>
        </p>
      </div>
    </div>
  );
};

export default PageNotFoundError;
