import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./Pages/ProductList";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import Home from "./Pages/Home";
import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:8000");

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on("data-updated", (updatedData) => {
      setData(updatedData);
    });

    return () => {
      socket.off("data-updated");
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/product" element={<ProductList />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
