import React, { Component } from 'react';
import memoFetch from '../../utils/memoFetch';
import { TotalSummary } from '../../types/summary';
import GlobalDataSummary from '../molecules/GlobalDataSummary';
import SummaryTable from '../organisms/SummaryTable';
import SummaryTableLoader from '../molecules/SummaryTableLoader';
import TooManyRequestsError from '../atoms/TooManyRequestsError';
import GlobalDataSummaryLoader from '../molecules/GlobalDataSummaryLoader';

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
      <div className="w-full h-full flex justify-start items-center flex-col gap-10">
        {data ? (
          <>
            <GlobalDataSummary data={data} />
            <SummaryTable data={data} />
          </>
        ) : isError ? (
          <TooManyRequestsError />
        ) : (
          <>
            <GlobalDataSummaryLoader />
            <SummaryTableLoader />
          </>
        )}
      </div>
    );
  }
}

export default Summary;
