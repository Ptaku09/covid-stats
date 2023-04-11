import React, { Component } from 'react';
import memoFetch from '../../utils/memoFetch';
import { TotalSummary } from '../../types/summary';
import GlobalDataSummary from '../molecules/GlobalDataSummary';
import SummaryTable from '../organisms/SummaryTable';

interface MyState {
  data: TotalSummary | null;
}

class Summary extends Component<{}, MyState> {
  constructor(props = {}) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    memoFetch(`${process.env.REACT_APP_BASE_URL}/summary`).then((data) => this.setState({ data }));
  }

  render() {
    const { data } = this.state;

    return (
      <div className="w-full h-auto flex justify-start items-center flex-col">
        <GlobalDataSummary data={data} />
        <SummaryTable data={data} />
      </div>
    );
  }
}

export default Summary;
