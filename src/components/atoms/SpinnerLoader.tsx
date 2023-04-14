import React, { Component } from 'react';

class SpinnerLoader extends Component<{}, {}> {
  render() {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-44 h-44 border-t-[2rem] border-neutral-200 rounded-full animate-spin" />
      </div>
    );
  }
}

export default SpinnerLoader;
