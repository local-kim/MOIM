import React, { useEffect, useState } from 'react';
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

  let idx;



  useEffect(() => {
    bmi <= 18.5 ? (
      idx = 3
    ) : bmi <= 22.9 ? (
      idx = 2
    ) : bmi <= 24.9 ? (
      idx = 1
    ) : (
      idx = 0
    )
    console.log(bmi);
  }, [bmi]);

  useEffect(() => {
    setRight([{
      value: 5,
      color: colors[idx]
    }]);

    setLeft([{
      value: bmi * bmi / 100,
      // displayValue: bmi,
      // text: "BMI",
      color: "#dddddd"
    }]);
    console.log(idx);

  }, [idx, bmi]);

  const [right, setRight] = useState([]);
  
  const [left, setLeft] = useState([]);

  return (
    bmi != undefined && bmi != null && <HalfPieChart
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