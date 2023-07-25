import axios from "axios";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function Logout() {
  const [qrnumber, setQrnumber] = useState("");
  const [qrrole, setRole] = useState(null);

  async function clearCookie() {
    let result = await axios.post("http://localhost:8000/user/logout");
    window.open("/", "_self");
  }

  return (
    <div>
      <button
        onClick={() => {
          clearCookie();
        }}
      >
        Logout
      </button>
    </div>
  );
}
