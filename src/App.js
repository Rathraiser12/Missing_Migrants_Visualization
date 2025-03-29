import React, { useState } from 'react';
import * as d3 from 'd3';
import { geoNaturalEarth1, geoPath } from 'd3';
import useWorldAtlas from './hooks/useWorldAtlas';
import useData from './hooks/useData';
import WorldGraticule from './components/WorldGraticule';
import Countries from './components/Countries';
import Bubbles from './components/Bubbles';
import Introduction from './components/Introduction';
import Histogram from './components/Histogram';

// Define the projection and path generator
const projection = geoNaturalEarth1();
const pathGenerator = geoPath(projection);

// Accessor for the reported date
const xValue = d => d['Reported Date'];

const App = () => {
  const width = 960;
  const height = 500;
  const dateHistogramSize = 0.2;

  const [brushExtent, setBrushExtent] = useState(null);
  const worldAtlas = useWorldAtlas();
  const data = useData();

  if (!data) {
    return <div>Loading Data...</div>;
  }

  const filteredData = brushExtent
    ? data.filter(d => {
        const date = xValue(d);
        return date > brushExtent[0] && date < brushExtent[1];
      })
    : data;

  return (
    <>
      <Introduction data={data} />
      <svg width={width} height={height}>
        <WorldGraticule width={width} height={height} path={pathGenerator} />
        {worldAtlas && <Countries worldAtlas={worldAtlas} path={pathGenerator} />}
        <Bubbles data={data} filteredData={filteredData} projection={projection} />
        <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
          <Histogram
            data={data}
            width={width}
            height={height * 0.2}
            setBrushExtent={setBrushExtent}
            xValue={xValue}
          />
        </g>
      </svg>
    </>
  );
};

export default App;
