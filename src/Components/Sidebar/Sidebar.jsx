import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { Menu, TrendingUp, Inventory2 } from "@mui/icons-material";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="sidebarToggle" onClick={toggleSidebar}>
        <Menu className="sidebarIcon" />
      </button>
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">{!isCollapsed && "Dashboard"}</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem">
                <TrendingUp className="sidebarIcon" />
                {!isCollapsed && <span>Analytics</span>}
              </li>
            </Link>
            <Link to="/product" className="link">
              <li className="sidebarListItem">
                <Inventory2 className="sidebarIcon" />
                {!isCollapsed && <span>Products</span>}
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
