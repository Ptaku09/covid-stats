import React, { Component } from 'react';
import PageNotFoundError from '../components/atoms/PageNotFoundError';

class ErrorPage extends Component<{}, {}> {
  render() {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col">
        <PageNotFoundError />
      </div>
    );
  }
}

export default ErrorPage;
