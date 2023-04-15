import React from 'react';

const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full h-16 pb-4 bg-neutral-200 rounded-t-[70%50px]">
      <div className="h-full flex items-end justify-center w-full text-sm font-bold">
        <p>
          <span className="after:content-['❤'] after:font-sans after:mx-1">Created with</span>
          by{' '}
          <a className="text-blue-500" href="https://github.com/Ptaku09" target="_blank" rel="noreferrer">
            Ptaku09
          </a>{' '}
          ©2023
        </p>
      </div>
    </footer>
  );
};

export default Footer;
