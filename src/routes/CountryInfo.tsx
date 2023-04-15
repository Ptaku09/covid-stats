import React, { Component } from 'react';
import withRouter, { WithRouterProps } from '../utils/withRouter';
import memoFetch from '../utils/memoFetch';
import { CountryDailyInfo } from '../types/country';
import SpinnerLoader from '../components/atoms/SpinnerLoader';
import PageNotFoundError from '../components/atoms/PageNotFoundError';
import TooManyRequestsError from '../components/atoms/TooManyRequestsError';
import TotalCasesGraph from '../components/organisms/TotalCasesGraph';
import WorldMap from '../components/organisms/WorldMap';

interface MyState {
  data: Pick<CountryDailyInfo, 'Date' | 'Active' | 'Confirmed' | 'Deaths'>[] | null;
  countryName: string;
  isError: boolean;
  errorCode: number;
}

class CountryInfo extends Component<WithRouterProps, MyState> {
  constructor(props: WithRouterProps) {
    super(props);
    this.state = {
      data: null,
      countryName: '',
      isError: false,
      errorCode: 0,
    };
  }

  componentDidMount() {
    const { countrySlug } = this.props.router.params;
    this.fetchCountryData(countrySlug);
  }

  fetchCountryData(countrySlug: string) {
    memoFetch(`${process.env.REACT_APP_BASE_URL}/total/country/${countrySlug}`)
      .then((data) => this.normalizeData(data))
      .catch((err) => {
        const { status } = err.response;
        this.setState({ isError: true, errorCode: status });
      });
  }

  normalizeData(data: CountryDailyInfo[]) {
    const normalized = data.map((item) => {
      return {
        Date: new Date(item.Date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        Active: item.Active,
        Confirmed: item.Confirmed,
        Deaths: item.Deaths,
      };
    });

    this.setState({ countryName: data[0].Country, data: normalized });
  }

  render() {
    const { data, countryName, isError, errorCode } = this.state;

    return (
      <div className="w-full h-full flex items-center justify-center flex-col gap-20">
        {data ? (
          <>
            <WorldMap countryName={countryName} />
            <TotalCasesGraph countryName={countryName} data={data} />
          </>
        ) : isError ? (
          errorCode === 404 ? (
            <PageNotFoundError />
          ) : (
            <TooManyRequestsError />
          )
        ) : (
          <SpinnerLoader />
        )}
      </div>
    );
  }
}

export default withRouter(CountryInfo);
