import { useState, useEffect } from 'react';
import * as d3 from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/Rathraiser12/a76def5555d012fad7136b78979ef649/raw/7764d8ec39ccaae106ac150eb1c57eaede61086b/Missing.csv';

const row = d => {
  d.coords = d['Location Coordinates']
    .split(',')
    .map(coord => +coord)
    .reverse();
  d['Total Dead and Missing'] = +d['Total Dead and Missing'];
  d['Reported Date'] = new Date(d['Reported Date']);
  return d;
};

const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    d3.csv(csvUrl, row).then(setData);
  }, []);

  return data;
};

export default useData;
