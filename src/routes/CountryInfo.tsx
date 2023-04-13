import React, { Component } from 'react';
import withRouter, { WithRouterProps } from '../utils/withRouter';
import { ComposableMap, Geographies, Geography, Graticule, Sphere } from 'react-simple-maps';

class CountryInfo extends Component<WithRouterProps, {}> {
  constructor(props: WithRouterProps) {
    super(props);
  }

  componentDidMount() {
    const { countrySlug } = this.props.router.params;
    this.fetchCountryData(countrySlug);
  }

  fetchCountryData(countrySlug: string) {
    console.log(countrySlug);
  }

  render() {
    const { countrySlug } = this.props.router.params;

    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-5/6 px-5 border-2 border-neutral-200">
          <ComposableMap
            projectionConfig={{
              rotate: [-10, 0, 0],
              scale: 147,
            }}
          >
            <Sphere stroke="#E4E5E6" strokeWidth={0.5} fill="transparent" id="test" />
            <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
            <Geographies geography="/countries.json">
              {({ geographies }) =>
                geographies.map((geo) => {
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#ccc"
                      stroke="#fff"
                      style={{
                        default: { outline: 'none' },
                        hover: { fill: 'rgb(191 219 254)', outline: 'none' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    );
  }
}

export default withRouter(CountryInfo);
