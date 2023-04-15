import React from 'react';
import WaveGray from '../atoms/WaveGray';

const Header = () => {
  return (
    <header className="font-rubik">
      <div className="relative z-10 pt-10 bg-neutral-200 flex items-center justify-center flex-col">
        <h1 className="text-6xl font-bold">COINFO-19</h1>
        <h2 className="text-xl text-gray-700">Your current coronavirus statistics</h2>
      </div>
      <div className="lg:-translate-y-20">
        <WaveGray />
      </div>
    </header>
  );
};

export default Header;
