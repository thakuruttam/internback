import Qrcode from "../compoents/qrcode";
import { useState, useEffect } from "react";
import Scanner from "../compoents/scanner";
import Rewards from "../compoents/rewards";
import SignIn from "./signin";
import { Outlet, Link } from "react-router-dom";

function Auth() {
  const [admin, setAdmin] = useState(null);
  const [customer, setCustomer] = useState(null);
  //   useEffect(() => {
  //     let role = localStorage.getItem("UserRole");
  //     if (role == 1) {
  //       setAdmin(true);
  //     } else {
  //       setCustomer(true);
  //     }
  //   }, []);

  return (
    <div>
      <SignIn />
      <Link to="/signup">Create Account </Link>
    </div>
  );
}

export default Auth;
