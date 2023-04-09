import React, { Component } from 'react';

class SummaryTableLabel extends Component<{}, {}> {
  render() {
    return (
      <div className="py-3 px-10 grid grid-cols-[100px_1fr_0.5fr_0.8fr_0.5fr_0.8fr_0.5fr_0.5fr_1fr] bg-white text-xs">
        <p>#</p>
        <p>Country</p>
        <p className="text-end">New Confirmed</p>
        <p className="text-end">Total Confirmed</p>
        <p className="text-end">New Deaths</p>
        <p className="text-end">Total Deaths</p>
        <p className="text-end">New Recovered</p>
        <p className="text-end">Total Recovered</p>
        <p className="text-end">Last update</p>
      </div>
    );
  }
}

export default SummaryTableLabel;
