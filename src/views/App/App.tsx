import React, { Component } from 'react';
import Summary from '../../components/templates/Summary';

class App extends Component<{}, {}> {
  render() {
    return (
      <div className="w-screen h-auto min-h-screen font-rubik">
        <Summary />
      </div>
    );
  }
}

export default App;
