import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

export default function Qrcode() {
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    generateReward();
  }, []);

  async function generateReward() {
    let number = await localStorage.getItem("UserPhonenumber");
    try {
      let result = await axios.post("http://localhost:8000/reward/get", {
        phonenumber: number,
      });

      countTotal(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function countTotal(data) {
    if (data.data) {
      let grandtotal = data.data.reduce(
        (accumulator, currentValue) => accumulator + currentValue.last_reward,
        0
      );

      setTotal(grandtotal);
    }
  }

  return <div>total Rewards{total && total}</div>;
}
