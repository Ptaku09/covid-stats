import React, { Component } from 'react';
import { CartesianGrid, ComposedChart, ResponsiveContainer, Scatter, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';
import { CustomCountryDailyInfo } from '../../routes/CountryInfo';
import { tickFormatter } from '../../utils/tickFormatter';

interface MyProps {
  countryName: string;
  data: CustomCountryDailyInfo[];
}

class TotalDeathsGraph extends Component<MyProps, {}> {
  constructor(props: MyProps) {
    super(props);
  }

  render() {
    const { data, countryName } = this.props;

    return (
      <div className="w-full h-full flex items-center justify-center flex-col gap-3">
        <div className="flex items-center justify-center flex-col text-center">
          <h2 className="text-xl md:text-2xl">Total Coronavirus deaths in {countryName}</h2>
          <p className="text-gray-500 font-thin text-sm">Last update: {data.at(-1)?.Date}</p>
        </div>
        <ResponsiveContainer width={screen.width < 768 ? '95%' : 800} height={400}>
          <ComposedChart
            data={data}
            margin={{
              top: 40,
              right: 20,
              bottom: 60,
              left: 0,
            }}
            className="border-2 shadow-lg"
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="Date" angle={-55} interval={screen.width < 768 ? 100 : 40} textAnchor="end" tick={{ fontSize: 12 }} />
            <YAxis type="number" dataKey="Deaths" tickFormatter={tickFormatter} />
            <ZAxis range={[15]} />
            <Tooltip isAnimationActive={false} />
            <Scatter dataKey="Deaths" fill={'#d05e1a'} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default TotalDeathsGraph;
