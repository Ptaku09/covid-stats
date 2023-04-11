import React, { Component } from 'react';
import { TotalSummary } from '../../types/summary';
import GlobalDataField from '../atoms/GlobalDataField';

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
      <>
        {data ? (
          <div className="bg-color-corners p-1">
            <div className="p-8 flex items-center flex-col gap-5 bg-white">
              <div className="flex items-center flex-col">
                <h3 className="text-5xl font-[500]">TOTAL GLOBAL</h3>
                <p className="text-sm text-gray-500">Last updated: {new Date(data['Global']['Date']).toLocaleString()}</p>
              </div>
              <GlobalDataField title="CASES" data={data['Global']['TotalConfirmed']} />
              <GlobalDataField title="DEATHS" data={data['Global']['TotalDeaths']} />
              <GlobalDataField title="RECOVERED" data={data['Global']['TotalRecovered']} />
            </div>
          </div>
        ) : (
          'Loading...'
        )}
      </>
    );
  }
}

export default GlobalDataSummary;
