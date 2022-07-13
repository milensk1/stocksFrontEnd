import "./chartStyles.css";
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

export default function Chart({ data }) {
  const [dataParsed, setDataParsed] = useState();

  useEffect(() => {
    if (!data) {
      return;
    }
    const actualValues = data["Time Series (15min)"];

    const actualValuesParsed = Object.keys(actualValues)
      .reverse()
      .map((key) => {
        return {
          name: key,
          uv: Number(actualValues[key]["1. open"]),
        };
      });
    setDataParsed(actualValuesParsed);
  }, [data]);

  return (
    <LineChart width={500} height={300} data={dataParsed}>
      <XAxis dataKey="name" />
      <YAxis domain={["dataMin", "dataMax"]} />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    </LineChart>
  );
}
