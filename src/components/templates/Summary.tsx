import React, { Component } from 'react';
import memoFetch from '../../utils/memoFetch';
import { TotalSummary } from '../../types/summary';
import GlobalDataSummary from '../molecules/GlobalDataSummary';
import SummaryTable from '../organisms/SummaryTable';
import SummaryTableLoader from '../molecules/SummaryTableLoader';

interface MyState {
  data: TotalSummary | null;
  isError: boolean;
}

class Summary extends Component<{}, MyState> {
  constructor(props = {}) {
    super(props);
    this.state = {
      data: null,
      isError: false,
    };
  }

  componentDidMount() {
    memoFetch(`${process.env.REACT_APP_BASE_URL}/summary`)
      .then((data) => this.setState({ data }))
      .catch((_) => this.setState({ isError: true }));
  }

  render() {
    const { data, isError } = this.state;

    return (
      <div className="w-full h-auto flex justify-start items-center flex-col gap-10">
        <GlobalDataSummary data={data} isError={isError} />
        {data ? <SummaryTable data={data} /> : <SummaryTableLoader />}
      </div>
    );
  }
}

export default Summary;
