import React, { Component, ReactNode } from 'react';
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';

interface MyProps {
  children: ReactNode;
}

class DefaultLayout extends Component<MyProps, {}> {
  constructor(props: MyProps) {
    super(props);
  }

  render() {
    return (
      <div className="relative bg-white min-h-screen">
        <Header />
        <main className="w-full h-auto py-12 pb-24 lg:p-0 lg:pb-4 lg:-translate-y-20 font-rubik">{this.props.children}</main>
        <Footer />
      </div>
    );
  }
}

export default DefaultLayout;
