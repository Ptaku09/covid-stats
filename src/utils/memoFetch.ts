import axios from 'axios';
import { TotalSummary } from '../types/summary';
import { CountryDailyInfo } from '../types/country';

const cache = new Map<string, TotalSummary | CountryDailyInfo>();

const memoFetch = async (url: string) => {
  if (cache.has(url)) {
    return cache.get(url);
  }

  const { data } = await axios.get(url);
  cache.set(url, data);

  return data;
};

export default memoFetch;
