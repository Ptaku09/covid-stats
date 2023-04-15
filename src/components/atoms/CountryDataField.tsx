import React, { Component } from 'react';

interface MyProps {
  title: string;
  data: number;
}

class CountryDataField extends Component<MyProps, {}> {
  constructor(props: MyProps) {
    super(props);
  }

  render() {
    const { title, data } = this.props;

    return (
      <div className="flex items-center flex-col gap-3">
        <h4 className="text-4xl font-thin">{title}</h4>
        <p className="text-6xl font-[500]">{data}</p>
      </div>
    );
  }
}

export default CountryDataField;
