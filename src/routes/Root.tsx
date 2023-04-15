import React, { useEffect, useState } from 'react';
import memoFetch from '../utils/memoFetch';
import { TotalSummary } from '../types/summary';
import GlobalDataSummary from '../components/molecules/GlobalDataSummary';
import SummaryTable from '../components/organisms/SummaryTable';
import TooManyRequestsError from '../components/atoms/TooManyRequestsError';
import GlobalDataSummaryLoader from '../components/molecules/GlobalDataSummaryLoader';
import SummaryTableLoader from '../components/molecules/SummaryTableLoader';

const Root = () => {
  const [data, setData] = useState<TotalSummary | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    memoFetch(`${process.env.REACT_APP_BASE_URL}/summary`)
      .then((data) => setData(data))
      .catch((_) => setIsError(true));
  }, []);

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
};

export default Root;
