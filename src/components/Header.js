import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useState, useContext,useEffect } from "react";
import UserContext from "../utils/UserContext";
const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  console.log("Header render");

  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);
  console.log(loggedInUser);

  //if no dependency array then useEffect will be called on every render

  //if dependency array is empty = [] = useEffect will be called on initial render(just once)

  //if dependency array is [btnNameReact] then useEffect will be called evverytime btnNameReact updates
  useEffect(() =>{
    console.log("useEffect called");
  },[btnNameReact]);

  return (
    <div className="flex justify-between bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-green-50">
      <div className="logo-container">
        <img className="w-56" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">Online Status: {onlineStatus ? "✅" : "🔴"}</li>
          
          
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>

          <li  className="px-4">
            <Link to="/about">About Us</Link>
          </li>

          <li  className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>

          <li  className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>

          <li className="px-4">Cart</li>

          <button
            className="login"
            onClick={() => {
              btnNameReact === "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>

          <li className="px-4 font-bold">{loggedInUser}</li>
          
        </ul>
      </div>
    </div>
  );
};

export default Header;