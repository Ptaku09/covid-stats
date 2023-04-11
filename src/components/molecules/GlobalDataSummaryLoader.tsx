import React, { Component } from 'react';

class GlobalDataSummaryLoader extends Component<{}, {}> {
  render() {
    return (
      <div className="p-8 flex items-center flex-col gap-5 bg-white">
        <div className="flex items-center flex-col">
          <h3 className="text-5xl font-[500]">TOTAL GLOBAL</h3>
          <div className="w-5/6 h-4 bg-gray-300 rounded-full animate-pulse" />
        </div>
        <div className="flex items-center flex-col">
          <h4 className="text-2xl font-bold">CASES</h4>
          <div className="w-36 h-4 bg-gray-300 rounded-full animate-pulse" />
        </div>
        <div className="flex items-center flex-col">
          <h4 className="text-2xl font-bold">DEATHS</h4>
          <div className="w-36 h-4 bg-gray-300 rounded-full animate-pulse" />
        </div>
        <div className="flex items-center flex-col">
          <h4 className="text-2xl font-bold">RECOVERED</h4>
          <div className="w-36 h-4 bg-gray-300 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }
}

export default GlobalDataSummaryLoader;
