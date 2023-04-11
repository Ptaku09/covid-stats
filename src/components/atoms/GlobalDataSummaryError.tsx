import React, { Component } from 'react';

class GlobalDataSummaryError extends Component<{}, {}> {
  render() {
    return (
      <div className="p-8 flex items-center flex-col gap-5 bg-white">
        <div className="h-64 flex items-center flex-col">
          <h3 className="text-5xl font-[500]">TOTAL GLOBAL</h3>
          <div className="h-full flex items-center justify-center">
            <p className="text-center">
              Something went wrong.
              <br />
              Please try reloading the page.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default GlobalDataSummaryError;
