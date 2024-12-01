import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./Pages/ProductList";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import Home from "./Pages/Home";
import "./App.css";
import socketIO from "socket.io-client";

const socket = socketIO("http://localhost:8001");

function App() {
  return (
    <div className="App">
      <Router>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Routes>
            <Route path="/" component={<Home />} />
            <Route path="/product" component={<ProductList />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
