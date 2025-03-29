import React from 'react';

const Countries = ({ worldAtlas, path }) => {
  const { land, interiors } = worldAtlas;
  return (
    <g className="countries">
      {land.features.map((feature, index) => (
        <path key={index} d={path(feature)} className="land" />
      ))}
      <path d={path(interiors)} className="interiors" />
    </g>
  );
};

export default Countries;
