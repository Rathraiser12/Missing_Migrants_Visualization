import React from 'react';

const Bars = ({ binnedData, xScale, yScale, innerHeight }) => {
  return (
    <>
      {binnedData.map((d, index) => (
        <rect
          className="bar"
          key={index}
          x={xScale(d.x0)}
          y={yScale(d.y)}
          width={xScale(d.x1) - xScale(d.x0)}
          height={innerHeight - yScale(d.y)}
        />
      ))}
    </>
  );
};

export default Bars;
