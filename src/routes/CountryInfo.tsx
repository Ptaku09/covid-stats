import React, { Component } from 'react';
import withRouter, { WithRouterProps } from '../utils/withRouter';

class CountryInfo extends Component<WithRouterProps, {}> {
  constructor(props: WithRouterProps) {
    super(props);
  }

  render() {
    const { countrySlug } = this.props.router.params;

    return (
      <div>
        <p>{countrySlug}</p>
      </div>
    );
  }
}

export default withRouter(CountryInfo);
