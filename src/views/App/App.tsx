import React, { Component } from 'react';
import SummaryTable from '../../components/organisms/SummaryTable';

class App extends Component<{}, {}> {
  render() {
    return (
      <div className="w-screen h-auto min-h-screen">
        <SummaryTable />
      </div>
    );
  }
}

export default App;
