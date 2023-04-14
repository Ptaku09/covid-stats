import React, { Component } from 'react';
import withRouter, { WithRouterProps } from '../utils/withRouter';
import memoFetch from '../utils/memoFetch';
import { CountryDailyInfo } from '../types/country';
import WorldMap from '../components/organisms/WorldMap';
import SpinnerLoader from '../components/atoms/SpinnerLoader';

interface MyState {
  data: CountryDailyInfo[] | null;
  isError: boolean;
}

class CountryInfo extends Component<WithRouterProps, MyState> {
  constructor(props: WithRouterProps) {
    super(props);
    this.state = {
      data: null,
      isError: false,
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
        console.error(err);
        this.setState({ isError: true });
      });
  }

  render() {
    const { data, isError } = this.state;

    return (
      <div className="w-full h-full flex items-center justify-center">
        {data ? <WorldMap countryName={data[0].Country} /> : isError ? <div>Something went wrong</div> : <SpinnerLoader />}
      </div>
    );
  }
}

export default withRouter(CountryInfo);
