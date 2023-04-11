import React, { Component } from 'react';

interface MyProps {
  title: string;
  data: number;
}

class GlobalDataField extends Component<MyProps, {}> {
  constructor(props: MyProps) {
    super(props);
  }

  render() {
    const { title, data } = this.props;

    return (
      <div className="flex items-center flex-col">
        <h4 className="text-2xl font-bold">{title}</h4>
        <p className="text-xl">{data}</p>
      </div>
    );
  }
}

export default GlobalDataField;
