import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import logo from "../images/logo.jpg";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";

function Scanner() {
  const [scannerResult, setScannerResult] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 500,
        height: 500,
      },
      fps: 5,
    });
    scanner.render(success);
    function success(result) {
      scanner.clear();
      setScannerResult(result);
      console.log("scaaned", result);
    }
    // function error(err) {
    //   console.warn(err);
    // }
  }, []);
  async function addReward() {
    try {
      let reward = await calculateReward();

      let result = await axios.post("http://localhost:8000/reward/", {
        phonenumber: scannerResult,
        reward: reward,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  let calculateReward = async () => {
    let result;
    try {
      result = await axios.post("http://localhost:8000/reward/get", {
        phonenumber: scannerResult,
      });
      console.log("corresponding data", result);
    } catch (error) {
      console.log(error);
    }
    let rewardleft = await countTotal(result);
    console.log("reardleft", rewardleft);

    let newOffer = await ((Math.abs(amount - rewardleft) * 3) / 100);
    console.log("new ooffere reward", newOffer);

    try {
      let result1 = await axios.post("http://localhost:8000/reward/delete", {
        phonenumber: scannerResult,
      });
      console.log("delete result", result1);
      let result2 = await axios.post("http://localhost:8000/reward/", {
        phonenumber: scannerResult,
        reward: newOffer,
      });

      console.log("what is posted", result2);
    } catch (error) {
      console.log(error);
    }
  };

  async function countTotal(data) {
    if (data.data) {
      let grandtotal = data.data.reduce(
        (accumulator, currentValue) => accumulator + currentValue.last_reward,
        0
      );

      return grandtotal;
    }
  }
  return (
    <div className="App">
      <div>
        {scannerResult ? (
          <div>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "30ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label=" Enter Amount "
                variant="standard"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </Box>
            <Button
              variant="outlined"
              onClick={async () => {
                addReward();
              }}
            >
              Next
            </Button>
          </div>
        ) : (
          <div id="reader"></div>
        )}
      </div>
    </div>
  );
}

export default Scanner;
