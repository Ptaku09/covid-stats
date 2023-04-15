import React, { Component } from 'react';
import withRouter, { WithRouterProps } from '../utils/withRouter';
import memoFetch from '../utils/memoFetch';
import { CountryDailyInfo } from '../types/country';
import SpinnerLoader from '../components/atoms/SpinnerLoader';
import PageNotFoundError from '../components/atoms/PageNotFoundError';
import TooManyRequestsError from '../components/atoms/TooManyRequestsError';
import TotalCasesGraph from '../components/organisms/TotalCasesGraph';
import WorldMap from '../components/organisms/WorldMap';
import NewCasesGraph from '../components/organisms/NewCasesGraph';
import TotalDeathsGraph from '../components/organisms/TotalDeathsGraph';
import NewDeathsGraph from '../components/organisms/NewDeathsGraph';
import CountryDataSummary from '../components/molecules/CountryDataSummary';
import { Link } from 'react-router-dom';

export interface CustomCountryDailyInfo extends Pick<CountryDailyInfo, 'Date' | 'Confirmed' | 'Deaths' | 'Recovered'> {
  NewConfirmed: number;
  NewDeaths: number;
}

interface MyState {
  data: CustomCountryDailyInfo[] | null;
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
    let prevConfirmed = 0;
    let prevDeaths = 0;

    const normalized = data.map((item) => {
      const newConfirmed = Math.abs(item.Confirmed - prevConfirmed);
      const newDeaths = Math.abs(item.Deaths - prevDeaths);
      prevConfirmed = item.Confirmed;
      prevDeaths = item.Deaths;

      return {
        Date: new Date(item.Date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        Confirmed: item.Confirmed,
        NewConfirmed: newConfirmed,
        Deaths: item.Deaths,
        NewDeaths: newDeaths,
        Recovered: item.Recovered,
      };
    });

    this.setState({ countryName: data[0].Country, data: normalized });
  }

  render() {
    const { data, countryName, isError, errorCode } = this.state;

    return (
      <div className="w-full h-auto flex items-center justify-center flex-col gap-10">
        <Link to="/" className="text-blue-500 md:hover:text-blue-400 underline font-bold text-xl">
          Go back
        </Link>
        <div className="w-full h-full flex items-center justify-center flex-col gap-20">
          {data ? (
            <>
              <WorldMap countryName={countryName} />
              <CountryDataSummary data={data.at(-1)!} />
              <TotalCasesGraph countryName={countryName} data={data} />
              <NewCasesGraph countryName={countryName} data={data} />
              <TotalDeathsGraph countryName={countryName} data={data} />
              <NewDeathsGraph countryName={countryName} data={data} />
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
      </div>
    );
  }
}

export default withRouter(CountryInfo);
