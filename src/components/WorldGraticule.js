import React from 'react';
import * as d3 from 'd3';

const WorldGraticule = ({ width, height, path }) => {
  const graticule = d3.geoGraticule();

  return (
    <g className="worldGraticule">
      <path className="sphere" d={path({ type: 'Sphere' })} />
      <path className="graticule" d={path(graticule())} />
    </g>
  );
};

export default WorldGraticule;
