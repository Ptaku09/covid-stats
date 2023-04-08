import Country from '@/types/country';

interface Summary {
  ID: string;
  Message: string;
  Global: {
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;
    Date: string;
  };
  Countries: Country[];
}

export default Summary;
