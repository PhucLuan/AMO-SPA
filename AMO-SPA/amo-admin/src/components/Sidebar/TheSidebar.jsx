import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Logo_lk from "../../assets/images/Logo_lk.png";
import { onChangePageName } from "../../features/home/homeSlice";
import "./Sidebar.css";
const TheSidebar = () => {
  const dispatch = useDispatch();

  const handleChangePageName = (pagename) => {
    dispatch(onChangePageName(pagename));
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = user && !user.expired
  const isAdmin = isAuthenticated && user.profile['role'] === 'Admin';

  return (
    <div id="Menu_mis">
      <div id="Logo_mjb">
        <img id="Logo_mjd" src={Logo_lk} alt="NashTech" />

        <div id="Online_Asset_Management_mjc">
          <span>Online Asset Management</span>
        </div>
      </div>
      <NavLink
        to="/home"
        id="Home_mi"
        className="navitem Home navitem"
        onClick={() => handleChangePageName("Home")}
      >
        <div id="Home_mja">
          <span>Home</span>
        </div>
      </NavLink>
      {isAdmin && 
      <React.Fragment>
      <NavLink
        to="/manageuser"
        id="Manage_User_mi"
        className="navitem Manage_User navitem"
        onClick={() => handleChangePageName("Manage User")}
      >
        <div id="Manage_User_mja">
          <span>Manage User</span>
        </div>
      </NavLink>
      <NavLink
        to="/manageasset"
        id="Manage_Asset_mi"
        className="navitem Manage_Asset navitem"
        onClick={() => handleChangePageName("Manage Asset")}
      >
        <div id="Manage_Asset_mja">
          <span>Manage Asset</span>
        </div>
      </NavLink>
      <NavLink
        to="/manageassignment"
        id="Manage_Assignment_miz"
        className="navitem Manage_Assignment navitem"
        onClick={() => handleChangePageName("Manage Assignment")}
      >
        <div id="Manage_Assignment_mi">
          <span>Manage Assignment</span>
        </div>
      </NavLink>
      <NavLink
        to="/request_returning"
        id="Request_for_Returning_miw"
        className="Request_for_Returning navitem"
        onClick={() => handleChangePageName("Request for Returning")}
      >
        <div id="Request_for_Returning_miy">
          <span>Request for Returning</span>
        </div>
      </NavLink>
      <NavLink
        to="/report"
        id="Report_mit"
        className="Report navitem"
        onClick={() => handleChangePageName("Report")}
      >
        <div id="Report_miv">
          <span>Report</span>
        </div>
      </NavLink>
      </React.Fragment>}
    </div>
  );
};

export default TheSidebar;
