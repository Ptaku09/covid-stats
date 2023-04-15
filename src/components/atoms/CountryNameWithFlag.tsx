import React from 'react';
import { Link } from 'react-router-dom';

interface MyProps {
  countryCode: string;
  countryName: string;
  countrySlug: string;
}

const CountryNameWithFlag = ({ countryCode, countryName, countrySlug }: MyProps) => {
  return (
    <div className="flex items-center justify-start gap-3">
      <img src={`https://flagcdn.com/20x15/${countryCode.toLowerCase()}.png`} width="20" height="15" alt={countryName} />
      <Link to={`/country/${countrySlug}`} className="text-blue-500 underline underline-offset-2">
        {countryName}
      </Link>
    </div>
  );
};

export default CountryNameWithFlag;
