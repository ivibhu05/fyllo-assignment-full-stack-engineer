import { useState, useMemo } from "react";
import { MONTHS, STATES } from "../../utils/constants";
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
  const [stateValue, setStateValue] = useState(STATES[0]);
  const [monthValue, setMonthValue] = useState(MONTHS[0]);

  const OnchangeSetStateValue = (e) => setStateValue(e.target.value);
  const OnchangeSetMonthValue = (e) => setMonthValue(e.target.value);

  const chartData = useMemo(() => {
    const filteredData = data.filter(
      (obj) => obj["state"] === stateValue && obj["month"] === monthValue
    );

    return filteredData.map((element) => ({
      ...element,
      requirement_in_mt_: parseFloat(element["requirement_in_mt_"]),
      availability_in_mt_: parseFloat(element["availability_in_mt_"]),
    }));
  }, [data, stateValue, monthValue]);

  return (
    <div className="bigchart">
      <h3 className="bigchartTitle">{title}</h3>

      <div className="bigchartSelect">
        <h5>Month</h5>
        <select
          name="month"
          onChange={OnchangeSetMonthValue}
          value={monthValue}
          aria-label="Month"
        >
          {MONTHS.map((month) => (
            <option key={month} value={month}>
              {month}
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
          <XAxis dataKey="product" />
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
