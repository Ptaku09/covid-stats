import React from 'react';

interface MyProps {
  title: string;
  data: number;
}

const CountryDataField = ({ title, data }: MyProps) => {
  return (
    <div className="flex items-center flex-col gap-3">
      <h4 className="text-4xl font-thin">{title}</h4>
      <p className="text-6xl font-[500]">{data}</p>
    </div>
  );
};

export default CountryDataField;
