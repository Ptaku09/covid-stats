import React, { Component } from 'react';
import Country from '../../types/country';

interface MyProps {
  index: number;
  countrySummary: Country;
}

class SummaryTableRow extends Component<MyProps, {}> {
  render() {
    const { index, countrySummary: item } = this.props;

    return (
      <div
        className={`py-3 px-10 grid grid-cols-[100px_1fr_0.5fr_0.8fr_0.5fr_0.8fr_0.5fr_0.5fr_1fr] gap-2 text-xs ${
          index % 2 === 0 ? 'bg-neutral-100' : 'bg-white'
        }`}
      >
        <p>{index + 1}.</p>
        <div className="flex items-center justify-start gap-3">
          <img src={`https://flagcdn.com/20x15/${item['CountryCode'].toLowerCase()}.png`} width="20" height="15" alt={item['Country']} />
          <p>{item['Country']}</p>
        </div>
        <p className="text-end peer-hover:bg-red-200">{item['NewConfirmed']}</p>
        <p className="text-end">{item['TotalConfirmed']}</p>
        <p className="text-end">{item['NewDeaths']}</p>
        <p className="text-end">{item['TotalDeaths']}</p>
        <p className="text-end">{item['NewRecovered']}</p>
        <p className="text-end">{item['TotalRecovered']}</p>
        <p className="text-end">
          {new Date(item['Date']).toLocaleDateString()} {new Date(item['Date']).toLocaleTimeString()}
        </p>
      </div>
    );
  }
}

export default SummaryTableRow;
