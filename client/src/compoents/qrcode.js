import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function Qrcode() {
  const [qrnumber, setQrnumber] = useState("");
  const [qrrole, setRole] = useState(null);

  useEffect(() => {
    setTokens();
  }, []);

  async function setTokens() {
    const phone = localStorage.getItem("UserPhonenumber");
    const role = localStorage.getItem("UserRole");
    setQrnumber(phone);
    setRole(role);
  }

  return (
    <div>
      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 64,
          width: "100%",
        }}
      >
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "250px", width: "250px " }}
          value={qrnumber}
          viewBox={`0 0 256 256`}
        />
      </div>
    </div>
  );
}
