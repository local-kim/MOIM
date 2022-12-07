import React, { useEffect, useState } from 'react';
import { HalfPieChart } from "half-pie-chart";

const Chart = ({bmi}) => {
  // let bmi = 25.7;
  const colors = [
    "#328ed9",  // 파랑
    "#4cb38e",  // 초록
    "#FFCC61",  // 노랑
    "#faa54b",  // 주황
    "#fa4b4b",  // 빨강
  ];

  const texts = [
    "비만",
    "과체중",
    "정상",
    "저체중"
  ];

  let idx;

  useEffect(() => {
    bmi <= 17 ? (
      idx = 2
    ) : bmi <= 18.5 ? (
      idx = 0
    ) : bmi <= 22.9 ? (
      idx = 1
    ) : bmi <= 23.9 ? (
      idx = 2
    ) : bmi <= 24.9 ? (
      idx = 3
    ) : (
      idx = 4
    )
    // console.log(bmi);
  }, [bmi]);

  useEffect(() => {
    setRight([{
      value: 1000,
      // value: 30,
      color: colors[idx]
    }]);

    setLeft([{
      value: Math.sqrt((bmi - 17) * (bmi - 17)) * 100,
      // value: bmi,
      // displayValue: bmi,
      // text: "BMI",
      color: "#dddddd"
    }]);
    // console.log(idx);

  }, [idx, bmi]);

  const [right, setRight] = useState([]);
  
  const [left, setLeft] = useState([]);

  return (
    bmi != undefined && bmi != null && 
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