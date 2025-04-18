import React from 'react';

const Introduction = ({ data }) => {
  const numRows = Array.isArray(data) ? data.length : 0;
  const numCols =
    Array.isArray(data) && data.length > 0
      ? Object.keys(data[0]).length
      : 0;

  const introText = `
    Let's explore global missing‑migrant incidents.
    This dashboard presents the number of dead and missing migrants on a world map
    (bubble size ∝ incident count) alongside a time‑series histogram.
    The dataset contains ${numRows} records and ${numCols} attributes.
    Brush the histogram to select a time window, then pan the selection to see the changes on the map.
  `.trim().replace(/\s+/g, ' ');

  return (
    <>
      <div className="text-xl font-semibold mb-2">Description</div>
      <p className="text-base leading-relaxed">{introText}</p>
    </>
  );
};

export default Introduction;
