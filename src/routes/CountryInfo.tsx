import React, { useEffect, useState } from 'react';
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
import { Link, useParams } from 'react-router-dom';

export interface CustomCountryDailyInfo extends Pick<CountryDailyInfo, 'Date' | 'Confirmed' | 'Deaths' | 'Recovered'> {
  NewConfirmed: number;
  NewDeaths: number;
}

const CountryInfo = () => {
  const [data, setData] = useState<CustomCountryDailyInfo[] | null>(null);
  const [countryName, setCountryName] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [errorCode, setErrorCode] = useState<number>(0);
  const { countrySlug } = useParams();

  useEffect(() => {
    memoFetch(`${process.env.REACT_APP_BASE_URL}/total/country/${countrySlug}`)
      .then((data) => normalizeData(data))
      .catch((err) => {
        const { status } = err.response;
        setIsError(true);
        setErrorCode(status);
      });
  }, []);

  const normalizeData = (data: CountryDailyInfo[]) => {
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

    setData(normalized);
    setCountryName(data[0].Country);
  };

  return (
    <div className="w-full h-auto flex items-center justify-center flex-col gap-5">
      <Link to="/" className="text-blue-500 md:hover:text-blue-400 underline font-bold text-xl">
        Go back
      </Link>
      <h2 className="text-4xl font-bold underline underline-offset-2">{countryName}</h2>
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
};

export default CountryInfo;
