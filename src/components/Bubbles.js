import React from 'react';
import * as d3 from 'd3';

const sizeValue = d => d['Total Dead and Missing'];
const maxRadius = 15;

const Bubbles = ({ data, filteredData, projection }) => {
  const sizeScale = React.useMemo(() => {
    return d3.scaleSqrt()
      .domain([0, d3.max(data, sizeValue)])
      .range([0, maxRadius]);
  }, [data]);

  return (
    <g className="bubbleMarks">
      {filteredData.map((d, index) => {
        const [x, y] = projection(d.coords);
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={sizeScale(sizeValue(d))}
          />
        );
      })}
    </g>
  );
};

export default Bubbles;
