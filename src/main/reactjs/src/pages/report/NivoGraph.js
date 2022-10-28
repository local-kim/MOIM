import React from 'react';
import { ResponsiveLine } from '@nivo/line'

const NivoGraph = ({data}) => {
  // const data = [{
  //   "id": "weight",
  //   "color": "hsl(111, 50%, 50%)",
  //   "data" : [{
  //     "x": "202",
  //     "y": "50"
  //   },{
  //     "x": '2022',
  //     "y": '40'
  //   }]}]
  console.log(JSON.stringify(data));

  return (
    <ResponsiveLine
      data={data}
      keys={['weight']}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ 
        type: 'linear',
        min: 'auto',
        max: 'auto',
      }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // legend: 'transportation',
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      colors={{ scheme: 'accent' }}
      pointSize={8}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      // legends={[
      //   {
      //     anchor: 'bottom-right',
      //     direction: 'column',
      //     justify: false,
      //     translateX: 100,
      //     translateY: 0,
      //     itemsSpacing: 0,
      //     itemDirection: 'left-to-right',
      //     itemWidth: 80,
      //     itemHeight: 20,
      //     itemOpacity: 0.75,
      //     symbolSize: 12,
      //     symbolShape: 'circle',
      //     symbolBorderColor: 'rgba(0, 0, 0, .5)',
      //     effects: [
      //       {
      //         on: 'hover',
      //         style: {
      //             itemBackground: 'rgba(0, 0, 0, .03)',
      //             itemOpacity: 1
      //         }
      //       }
      //     ]
      //   }
      // ]}
    />
  )
}

export default NivoGraph;