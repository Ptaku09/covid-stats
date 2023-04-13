import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorPage extends Component<{}, {}> {
  render() {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col">
        <div className="p-5 mx-5 flex items-center justify-center flex-col gap-4 border-2 shadow-lg text-center">
          <h3 className="text-4xl font-bold">Oops!</h3>
          <p className="text-lg">Sorry, an unexpected error has occurred.</p>
          <p className="text-lg">
            <i>Page not found</i>
          </p>
          <div>
            <p>
              Go back to{' '}
              <span>
                <Link to="/" className="text-blue-500">
                  home page
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorPage;
