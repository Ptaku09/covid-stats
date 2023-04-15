import React, { Component } from 'react';
import Summary from '../components/templates/Summary';

class Root extends Component<{}, {}> {
  render() {
    return (
      <div className="w-screen h-auto">
        <Summary />
      </div>
    );
  }
}

export default Root;
