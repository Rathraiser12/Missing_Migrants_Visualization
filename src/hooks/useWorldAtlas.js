import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { feature, mesh } from 'topojson-client';

const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

const useWorldAtlas = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    d3.json(jsonUrl).then(topology => {
      const { countries, land } = topology.objects;
      setData({
        land: feature(topology, land),
        interiors: mesh(topology, countries, (a, b) => a !== b)
      });
    });
  }, []);

  return data;
};

export default useWorldAtlas;
