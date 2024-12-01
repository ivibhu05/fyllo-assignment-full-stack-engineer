import { useState, useMemo } from "react";
import { STATES } from "../../utils/constants";
import "./Bigchart.css";

import {
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
  Legend,
} from "recharts";

function Bigchart({ title, data }) {
  const productList = [...new Set(data.map((item) => item.product))];

  const [stateValue, setStateValue] = useState(STATES[0]);
  const [productValue, setProductValue] = useState(productList[0]);

  const OnchangeSetStateValue = (e) => setStateValue(e.target.value);
  const onChangeProductValue = (e) => setProductValue(e.target.value);

  const chartData = useMemo(() => {
    const filteredData = data.filter(
      (obj) => obj["state"] === stateValue && obj["product"] === productValue
    );

    return filteredData.map((element) => ({
      ...element,
      requirement_in_mt_: parseFloat(element["requirement_in_mt_"]),
      availability_in_mt_: parseFloat(element["availability_in_mt_"]),
    }));
  }, [data, stateValue, productValue]);

  return (
    <div className="bigchart">
      <h3 className="bigchartTitle">{title}</h3>

      <div className="bigchartSelect">
        <h5>Product</h5>
        <select
          name="product"
          onChange={onChangeProductValue}
          value={productValue}
          aria-label="Product"
        >
          {productList.map((product) => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>

        <h5>State</h5>
        <select
          name="state"
          onChange={OnchangeSetStateValue}
          value={stateValue}
          aria-label="State"
        >
          {STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {chartData.length === 0 && (
          <h6 className="errordata">No data available to show</h6>
        )}
      </div>

      <ResponsiveContainer width="100%" height="100%" aspect={2 / 1}>
        <BarChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="requirement_in_mt_" fill="#60AC4A" />
          <Bar dataKey="availability_in_mt_" fill="#FF6347" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Bigchart;
