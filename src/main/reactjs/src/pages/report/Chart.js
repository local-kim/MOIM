import React, { useState } from 'react';
import { HalfPieChart } from "half-pie-chart";

const Chart = ({bmi}) => {
  const colors = [
    "#fa4b4b",
    "#faa54b",
    "#4cb38e",
    "#328ed9"
  ];

  const texts = [
    "비만",
    "과체중",
    "정상",
    "저체중"
  ];

  let idx = 0;

  bmi <= 18.5 ? (
    idx = 3
  ) : bmi <= 22.9 ? (
    idx = 2
  ) : bmi <= 24.9 ? (
    idx = 1
  ) : (
    idx = 0
  )

  const [right, setRight] = useState([{
    value: 70,
    color: colors[idx]
  }]);
  
  const [left, setLeft] = useState([{
    value: bmi,
    // displayValue: bmi,
    // text: "BMI",
    color: "#dddddd"
  }]);

  return (
    <HalfPieChart
      // name="BMI"
      right={right}
      left={left}
      dark={false}
      // title="BMI"
      fontStyle="Montserrat"
      // centerText={texts[0]}
      // centerPostText={bmi + "점"}
    />
  );
};

export default Chart;