import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, LineMarkSeries} from 'react-vis';

const VisGraph = ({data}) => {
  // const data = new Array(19).fill(0).reduce((prev, curr) => [...prev, {
  //   x: prev.slice(-1)[0].x + 1,
  //   y: prev.slice(-1)[0].y * (0.9 + Math.random() * 0.2) 
  // }], [{x: 0, y: 10}]);
  
  const axisStyle = {
    ticks: {
      fontSize: '14px',
      color: '#333'
    },
    title: {
      fontSize: '16px',
      color: '#333'
    }
  };

  console.log(data);

  return (
    <XYPlot xType="dateTime" width={300} height={300}>
      <HorizontalGridLines />
      <VerticalGridLines />
      <XAxis/>
      <YAxis/>
      <LineMarkSeries data={data} />
    </XYPlot>
  );
};

export default VisGraph;