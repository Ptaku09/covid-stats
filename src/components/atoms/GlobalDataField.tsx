import React from 'react';

interface MyProps {
  title: string;
  data: number;
}

const GlobalDataField = ({ title, data }: MyProps) => {
  return (
    <div className="flex items-center flex-col">
      <h4 className="text-2xl font-bold">{title}</h4>
      <p className="text-xl">{data}</p>
    </div>
  );
};

export default GlobalDataField;
