import React from "react";
import "../Header.css";

import { NavLink } from "react-router-dom";
function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-links">
          <li className="nav-item">
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/menu"}>Menu</NavLink>
          </li>
          <li className="nav-item">
            <a href="#offers">Offers</a>
          </li>
          <li className="nav-item">
            <a href="#locations">Locations</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
