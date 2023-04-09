import React, { Component } from 'react';
import SummaryTableLabel from '../atoms/SummaryTableLabel';
import Summary from '../../types/summary';
import SummaryTableRow from '../molecules/SummaryTableRow';
import SummaryTableLoader from '../molecules/SummaryTableLoader';
import memoFetch from '../../utils/memoFetch';

interface MyState {
  data: Summary | null;
}

class SummaryTable extends Component<{}, MyState> {
  constructor(props = {}) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    memoFetch('https://api.covid19api.com/summary').then((data) => this.setState({ data }));
  }

  render() {
    return (
      <div className="w-full h-auto">
        <SummaryTableLabel />
        {this.state.data ? (
          this.state.data['Countries'].map((item, index) => <SummaryTableRow index={index} countrySummary={item} key={item['ID']} />)
        ) : (
          <SummaryTableLoader />
        )}
      </div>
    );
  }
}

export default SummaryTable;
