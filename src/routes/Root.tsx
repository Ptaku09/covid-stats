import React, { Component } from 'react';
import memoFetch from '../utils/memoFetch';
import { TotalSummary } from '../types/summary';
import GlobalDataSummary from '../components/molecules/GlobalDataSummary';
import SummaryTable from '../components/organisms/SummaryTable';
import TooManyRequestsError from '../components/atoms/TooManyRequestsError';
import GlobalDataSummaryLoader from '../components/molecules/GlobalDataSummaryLoader';
import SummaryTableLoader from '../components/molecules/SummaryTableLoader';

interface MyState {
  data: TotalSummary | null;
  isError: boolean;
}

class Root extends Component<{}, MyState> {
  constructor(props = {}) {
    super(props);
    this.state = {
      data: null,
      isError: false,
    };
  }

  componentDidMount() {
    this.fetchSummaryData();
  }

  fetchSummaryData() {
    memoFetch(`${process.env.REACT_APP_BASE_URL}/summary`)
      .then((data) => this.setState({ data }))
      .catch((_) => this.setState({ isError: true }));
  }

  render() {
    const { data, isError } = this.state;

    return (
      <div className="w-screen h-auto flex justify-start items-center flex-col gap-10">
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

export default Root;
