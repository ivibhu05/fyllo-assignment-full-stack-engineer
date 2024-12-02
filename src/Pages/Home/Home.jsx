import React from "react";
import Featured from "../../Components/Featured/Featured";
import "./Home.css";

function Home({ data }) {
  return (
    <div className="home">
      <Featured data={data} />
    </div>
  );
}

export default Home;
