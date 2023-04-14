import React, { Component } from 'react';
import withRouter, { WithRouterProps } from '../utils/withRouter';
import { ComposableMap, Geographies, Geography, Graticule, Sphere } from 'react-simple-maps';
import memoFetch from '../utils/memoFetch';
import { CountryDailyInfo } from '../types/country';

interface MyState {
  data: CountryDailyInfo[] | null;
  isError: boolean;
}

class CountryInfo extends Component<WithRouterProps, MyState> {
  constructor(props: WithRouterProps) {
    super(props);
    this.state = {
      data: null,
      isError: false,
    };
  }

  componentDidMount() {
    const { countrySlug } = this.props.router.params;
    this.fetchCountryData(countrySlug);
  }

  fetchCountryData(countrySlug: string) {
    memoFetch(`${process.env.REACT_APP_BASE_URL}/total/country/${countrySlug}`)
      .then((data) => this.setState({ data }))
      .catch((err) => {
        console.error(err);
        this.setState({ isError: true });
      });
  }

  render() {
    const { data, isError } = this.state;
    const { countrySlug } = this.props.router.params;

    return (
      <div className="w-full h-full flex items-center justify-center">
        {data ? (
          <div className="hidden md:flex w-5/6 px-5 border-2 border-neutral-200">
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
                    const { name } = geo.properties;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={name === data[0].Country || name.toLowerCase() === countrySlug ? 'rgb(0 123 255)' : '#ccc'}
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
        ) : isError ? (
          <div>Something went wrong</div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default withRouter(CountryInfo);
