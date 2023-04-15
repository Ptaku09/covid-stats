import React, { Component } from 'react';
import CountryDataField from '../atoms/CountryDataField';
import { CustomCountryDailyInfo } from '../../routes/CountryInfo';

interface MyProps {
  data: CustomCountryDailyInfo;
}

class CountryDataSummary extends Component<MyProps, {}> {
  constructor(props: MyProps) {
    super(props);
  }

  render() {
    const { data } = this.props;

    return (
      <div className="w-11/12 md:w-96 flex items-center justify-center flex-col gap-7 px-20 pb-10 border-[1px] border-stone-400 text-center">
        <div className="w-full py-2 flex items-center justify-center flex-col bg-stone-400 font-thin">
          <h2 className="text-white text-2xl">Main data</h2>
          <p className="text-sm text-gray-50">Last update: {data.Date}</p>
        </div>
        <CountryDataField title="Coronavirus cases" data={data.Confirmed} />
        <CountryDataField title="Deaths" data={data.Deaths} />
        <CountryDataField title="Recovered" data={data.Recovered} />
      </div>
    );
  }
}

export default CountryDataSummary;
