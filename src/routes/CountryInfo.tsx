import React, { Component } from 'react';
import withRouter, { WithRouterProps } from '../utils/withRouter';
import memoFetch from '../utils/memoFetch';
import { CountryDailyInfo } from '../types/country';
import SpinnerLoader from '../components/atoms/SpinnerLoader';
import PageNotFoundError from '../components/atoms/PageNotFoundError';
import WorldMap from '../components/organisms/WorldMap';

interface MyState {
  data: CountryDailyInfo[] | null;
  isError: boolean;
  errorCode: number;
}

class CountryInfo extends Component<WithRouterProps, MyState> {
  constructor(props: WithRouterProps) {
    super(props);
    this.state = {
      data: null,
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
      .then((data) => this.setState({ data }))
      .catch((err) => {
        const { status } = err.response;
        this.setState({ isError: true, errorCode: status });
      });
  }

  render() {
    const { data, isError, errorCode } = this.state;

    return (
      <div className="w-full h-full flex items-center justify-center">
        {data ? (
          <WorldMap countryName={data[0].Country} />
        ) : isError ? (
          <div className="w-full h-full flex items-center justify-center flex-col">
            {errorCode === 404 ? (
              <PageNotFoundError />
            ) : (
              <div>
                <p>reload</p>
              </div>
            )}
          </div>
        ) : (
          <SpinnerLoader />
        )}
      </div>
    );
  }
}

export default withRouter(CountryInfo);
