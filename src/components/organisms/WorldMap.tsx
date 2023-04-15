import React, { Component } from 'react';
import { ComposableMap, Geographies, Geography, Graticule, Sphere } from 'react-simple-maps';

interface MyProps {
  countryName: string;
}

class WorldMap extends Component<MyProps, {}> {
  constructor(props: MyProps) {
    super(props);
  }

  render() {
    const { countryName } = this.props;

    return (
      <div className="hidden md:flex w-5/6 px-5 border-2 border-neutral-200">
        <ComposableMap
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 147,
          }}
        >
          <Sphere stroke="#E4E5E6" strokeWidth={0.5} fill="transparent" id="test" />
          <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
          <Geographies geography="/custom.geo.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                const { name_en: name } = geo.properties;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={countryName.startsWith(name) ? 'rgb(0 123 255)' : '#ccc'}
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
    );
  }
}

export default WorldMap;