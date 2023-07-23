import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Navbar() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.clear("access_token");

    Swal.fire({
      icon: "success",
      title: "Logout successful!",
    }).then(() => {
      navigate("/login");
    });
  };
  return (
    <div className="sidebar">
      <div className="sidebar-logo"></div>
      <ul>
        <li>
          <NavLink to={"/"}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/25/25694.png"
              className="menu-icon"
            />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to={"/category"}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/3405/3405802.png"
              alt="Category Icon"
              className="menu-icon"
            />
            Category
          </NavLink>
        </li>
        <li>
          <NavLink to={"/register"}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/7542/7542245.png"
              alt="Admin Icon"
              className="menu-icon"
            />
            Register Admin
          </NavLink>
        </li>
        <li>
          <div onClick={handleSignOut}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1828/1828479.png"
              alt="Sign Out Icon"
              className="menu-icon"
            />
            Sign Out
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
