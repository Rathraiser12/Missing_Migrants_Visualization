import React from 'react';

const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset }) => {
  return xScale.ticks().map(tickValue => (
    <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
      <line y2={innerHeight} />
      <text style={{ textAnchor: 'middle' }} dy="1.6em" y={innerHeight + tickOffset}>
        {tickFormat(tickValue)}
      </text>
    </g>
  ));
};

export default AxisBottom;
