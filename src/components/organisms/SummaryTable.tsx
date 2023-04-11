import React, { Component } from 'react';
import SummaryTableLabel from '../atoms/SummaryTableLabel';
import SummaryTableRow from '../molecules/SummaryTableRow';
import SummaryTableLoader from '../molecules/SummaryTableLoader';
import { TotalSummary } from '../../types/summary';

interface MyProps {
  data: TotalSummary | null;
}

class SummaryTable extends Component<MyProps, {}> {
  constructor(props: MyProps) {
    super(props);
  }

  render() {
    const { data } = this.props;

    return (
      <div className="w-full h-auto">
        <SummaryTableLabel />
        {data ? (
          data['Countries'].map((item, index) => <SummaryTableRow index={index} countrySummary={item} key={item['ID']} />)
        ) : (
          <SummaryTableLoader />
        )}
      </div>
    );
  }
}

export default SummaryTable;
