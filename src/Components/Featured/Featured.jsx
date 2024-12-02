// import { data } from "../../utils/data";
import "./Featured.css";
import Chart from "../Chart/Chart";
import Bigchart from "../Bigchart";
import Piechart from "../Piechart";
// import { useEffect, useState } from "react";

function Featured({ data }) {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:8000/api/data")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data);
  //     })
  //     .catch((err) => console.error("Error fetching data:", err));
  // }, []);

  return (
    <div className="featured">
      <div className="featuredpiechart">
        <Piechart
          data={data}
          title="Top 5 Required products"
          dataKey="requirement_in_mt_"
        />
        <Piechart
          data={data}
          title="Top 5 Available products"
          dataKey="availability_in_mt_"
        />
      </div>
      <Bigchart
        data={data}
        title="Product Availability and Requirements"
        grid
      />
      <div className="featuredItem">
        <div className="widgetsm">
          <Chart
            data={data}
            title="State wise product"
            grid
            parent="state"
            child="product"
            defaultValue={data[0]}
          />
        </div>

        <div className="widgetsm">
          <Chart
            data={data}
            title="Year wise product"
            grid
            parent="_year"
            child="product"
            defaultValue={data[0]}
          />
        </div>

        <div className="widgetsm">
          <Chart
            data={data}
            title="Month wise product"
            grid
            parent="month"
            child="product"
            defaultValue={data[0]}
          />
        </div>
      </div>
    </div>
  );
}

export default Featured;
