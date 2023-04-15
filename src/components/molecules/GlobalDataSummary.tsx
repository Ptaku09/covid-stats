import React from 'react';
import { TotalSummary } from '../../types/summary';
import GlobalDataField from '../atoms/GlobalDataField';

interface MyProps {
  data: TotalSummary;
}

const GlobalDataSummary = ({ data }: MyProps) => {
  return (
    <div className="bg-color-corners p-1 mx-5 lg:mx-0">
      <div className="p-8 flex items-center flex-col gap-5 bg-white">
        <div className="flex items-center flex-col">
          <h3 className="text-5xl font-[500] text-center">TOTAL GLOBAL</h3>
          <p className="text-sm text-gray-500">Last updated: {new Date(data['Global']['Date']).toLocaleString()}</p>
        </div>
        <GlobalDataField title="CASES" data={data['Global']['TotalConfirmed']} />
        <GlobalDataField title="DEATHS" data={data['Global']['TotalDeaths']} />
        <GlobalDataField title="RECOVERED" data={data['Global']['TotalRecovered']} />
      </div>
    </div>
  );
};

export default GlobalDataSummary;
