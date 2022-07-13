import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown, Option } from "./Dropdown";
import Chart from "./Chart";

export default function App() {
  const [optionValue, setOptionValue] = useState("");
  const [stock, setStock] = useState("");

  const handleSelect = (e) => {
    console.log(e.target.value);
    setOptionValue(e.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/stocks/company?symbol=${optionValue}`
        );
        setStock(data);
      } catch (err) {
        console.log("Error:", err);
      }
    };

    if (optionValue) {
      getData();
    }
  }, [optionValue]);

  return (
    <div>
      <h1>Which stock are you interested in?</h1>
      <Dropdown formLabel="Choose a service" onChange={handleSelect}>
        <Option selected value="Click to see options" />
        <Option value="Alphabet" />
        <Option value="IBM" />
        <Option value="Apple" />
      </Dropdown>
      <p>You selected {optionValue} </p>
      <Chart data={stock}></Chart>
    </div>
  );
}
