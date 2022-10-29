import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer
} from "recharts";

const CustomizedLabel: FunctionComponent<any> = (props: any) => {
  const { x, y, stroke, value } = props;

  return (
    <text x={x} y={y} dy={-8} fill={stroke} fontSize={12} fontWeight={600} textAnchor="middle">
      {value}
    </text>
  );
};

// const CustomizedAxisTick: FunctionComponent<any> = (props: any) => {
//   const { x, y, payload } = props;

//   return (
//     <g transform={`translate(${x},${y})`}>
//       <text
//         x={0}
//         y={0}
//         dy={16}
//         textAnchor="end"
//         fill="#666"
//         transform="rotate(-35)"
//       >
//         {payload.value}
//       </text>
//     </g>
//   );
// };

export default function RechartsGraph({data}) {
  return (
    <ResponsiveContainer width="100%" aspect={2/1}>
      <LineChart
        // width={380}
        height={200}
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 5
        }}
      >
        {/* 안내 그리드 선 */}
        <CartesianGrid stroke="#eeeeee" strokeDasharray="5 5" />
        <XAxis dataKey="date" fontSize={11} />
        <YAxis hide={true} domain={['dataMin - 1', 'dataMax + 1']} />
        <Tooltip />
        {/* <Legend /> */}
        <Line type="linear" dataKey="weight" stroke="#86dbcb" dot={{stroke: '#86dbcb', strokeWidth: '2'}} >
          <LabelList content={<CustomizedLabel />} />
        </Line>
      </LineChart>
    </ResponsiveContainer>
  );
}
