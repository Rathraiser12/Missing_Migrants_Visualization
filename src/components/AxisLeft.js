import React from 'react';

const AxisLeft = ({ yScale, innerWidth, tickOffset }) => {
  return yScale.ticks().map(tickValue => (
    <g className="tick" key={tickValue} transform={`translate(0,${yScale(tickValue)})`}>
      <line x2={innerWidth} />
      <text style={{ textAnchor: 'end' }} dy=".32em" x={-tickOffset}>
        {tickValue}
      </text>
    </g>
  ));
};

export default AxisLeft;
