import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import AxisLeft from './AxisLeft';
import AxisBottom from './AxisBottom';
import Bars from './Bars';

const margin = { top: 0, right: 30, bottom: 20, left: 45 };
const yValue = d => d['Total Dead and Missing'];
const yAxisLabel = "Total Dead and Missing";
const yAxisLabelOffset = 20;
const xAxisTickFormat = d3.timeFormat("%m/%d/%Y");

const Histogram = ({ data, width, height, setBrushExtent, xValue }) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = React.useMemo(() => {
    return d3.scaleTime()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice(d3.timeMonths);
  }, [data, xValue, innerWidth]);

  const binnedData = React.useMemo(() => {
    const [startDate, endDate] = xScale.domain();
    const histogram = d3.histogram()
      .value(xValue)
      .domain(xScale.domain())
      .thresholds(d3.timeMonths(startDate, endDate));
    
    return histogram(data).map(array => ({
      x0: array.x0,
      x1: array.x1,
      y: d3.sum(array, yValue)
    }));
  }, [data, xValue, xScale]);

  const yScale = React.useMemo(() => {
    return d3.scaleLinear()
      .domain([0, d3.max(binnedData, d => d.y)])
      .range([innerHeight, 0]);
  }, [binnedData, innerHeight]);

  const brushRef = useRef();

  useEffect(() => {
    const brush = d3.brushX().extent([[0, 0], [innerWidth, innerHeight]]);
    d3.select(brushRef.current).call(brush);
    brush.on('brush end', (event) => {
      setBrushExtent(event.selection && event.selection.map(xScale.invert));
    });
  }, [innerWidth, innerHeight, setBrushExtent, xScale]);

  return (
    <>
      <rect width={width} height={height} fill="white" />
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
        <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat} tickOffset={2} />
        <Bars binnedData={binnedData} xScale={xScale} yScale={yScale} innerHeight={innerHeight} />
        <text
          className="axis-label"
          x={-innerHeight / 2}
          y={-margin.left + yAxisLabelOffset}
          textAnchor="middle"
          transform="rotate(-90)"
        >
          {yAxisLabel}
        </text>
        <g ref={brushRef} />
      </g>
    </>
  );
};

export default Histogram;
