import React from 'react';

const Introduction = ({ data }) => {
  const numRows = data.length;
  const numCols = data.columns ? data.columns.length : 'unknown';
  const introText = `Let's explore the data of missing migrants across the globe. This visualization shows the number of dead and missing migrants and includes a world map with bubbles scaled by incident size and a bar chart for time-based filtering. The dataset contains ${numRows} rows and ${numCols} columns. You can drag on the histogram to select a range of months and then drag the selection around to see the changes on the map.`;

  return (
    <>
      <div className="introTitle">Description</div>
      <br />
      <div className="intro">{introText}</div>
    </>
  );
};

export default Introduction;
