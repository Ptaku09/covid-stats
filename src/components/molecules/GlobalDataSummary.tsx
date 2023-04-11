import React, { Component } from 'react';
import { TotalSummary } from '../../types/summary';
import GlobalDataField from '../atoms/GlobalDataField';
import GlobalDataSummaryLoader from './GlobalDataSummaryLoader';

interface MyProps {
  data: TotalSummary | null;
}

class GlobalDataSummary extends Component<MyProps, {}> {
  constructor(props: MyProps) {
    super(props);
  }

  render() {
    const { data } = this.props;

    return (
      <div className="bg-color-corners p-1">
        {data ? (
          <div className="p-8 flex items-center flex-col gap-5 bg-white">
            <div className="flex items-center flex-col">
              <h3 className="text-5xl font-[500]">TOTAL GLOBAL</h3>
              <p className="text-sm text-gray-500">Last updated: {new Date(data['Global']['Date']).toLocaleString()}</p>
            </div>
            <GlobalDataField title="CASES" data={data['Global']['TotalConfirmed']} />
            <GlobalDataField title="DEATHS" data={data['Global']['TotalDeaths']} />
            <GlobalDataField title="RECOVERED" data={data['Global']['TotalRecovered']} />
          </div>
        ) : (
          <GlobalDataSummaryLoader />
        )}
      </div>
    );
  }
}

export default GlobalDataSummary;
