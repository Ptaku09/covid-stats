import React, { Component } from 'react';

interface MyProps {
  countryCode: string;
  countryName: string;
}

class CountryNameWithFlag extends Component<MyProps, {}> {
  constructor(props: MyProps) {
    super(props);
  }

  render() {
    const { countryCode, countryName } = this.props;

    return (
      <div className="flex items-center justify-start gap-3">
        <img src={`https://flagcdn.com/20x15/${countryCode.toLowerCase()}.png`} width="20" height="15" alt={countryName} />
        <p>{countryName}</p>
      </div>
    );
  }
}

export default CountryNameWithFlag;
