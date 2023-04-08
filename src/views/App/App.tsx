import React, { Component } from 'react';
import axios from 'axios';
import Summary from '@/types/summary';

interface MyState {
  data: Summary | null;
}

class App extends Component<{}, MyState> {
  constructor() {
    super({});
    this.state = {
      data: null,
    };
  }
  componentDidMount() {
    axios.get('https://api.covid19api.com/summary').then((r) => this.setState({ data: r.data }));
  }

  render() {
    return (
      <div className="w-screen h-auto min-h-screen">
        <div className="">
          {this.state.data &&
            this.state.data['Countries'].map((item, index) => (
              <div key={index} className="border-b-2 py-3">
                {item['Country']}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default App;
