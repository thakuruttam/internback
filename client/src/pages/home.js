import Qrcode from "../compoents/qrcode";
import { useState, useEffect } from "react";
import Scanner from "../compoents/scanner";
import Rewards from "../compoents/rewards";
import Logout from "../compoents/logout";

function Home() {
  const [admin, setAdmin] = useState(null);
  const [customer, setCustomer] = useState(null);
  useEffect(() => {
    let role = localStorage.getItem("UserRole");
    if (role == 1) {
      setAdmin(true);
    } else {
      setCustomer(true);
    }
  }, []);

  return (
    <div>
      <Logout />
      {customer && <Qrcode />}
      {admin && <Scanner />}
      {customer && <Rewards />}
    </div>
  );
}

export default Home;
