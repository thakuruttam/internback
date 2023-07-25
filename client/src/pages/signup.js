import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import logo from "../images/logo.jpg";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";

export default function SignUp() {
  const [optres, setOptres] = useState(false);
  const [phonenumber, setPhonenumber] = useState(false);
  const [displayrest, setDisplayrest] = useState(null);
  const [displaynumber, setDisplaynumber] = useState(true);
  const [code, setCode] = useState(null);
  const [passcode, setPasscode] = useState(true);

  async function sendOtp(phone) {
    console.log("phone", phone);
    try {
      let result = await axios.post("http://localhost:8000/otp", {
        phonenumber: phone,
        code: 333,
      });
      console.log(result);
      setDisplaynumber(false);
      setDisplayrest(true);

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function createAccount() {
    try {
      let result = await axios.post(
        "http://localhost:8000/user",
        {
          phonenumber: phonenumber,
          password: passcode,
          code: code,
        },
        { withCredentials: true }
      );
      console.log("result", result);
      let mytoken = Cookies.get("Cookie");
      console.log("received token", mytoken);
      if (mytoken) {
        let decoded = await jwt_decode(mytoken);
        console.log(decoded);
        await localStorage.setItem("UserPhonenumber", decoded.phonenumber);
        await localStorage.setItem("UserRole", decoded.role);
        window.open("/home", "_self");
      }
      setDisplaynumber(false);
      setDisplayrest(true);

      return result;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      {displaynumber && (
        <div className="number">
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
              label=" Enter Phone Number"
              variant="standard"
              onChange={(e) => {
                setPhonenumber(e.target.value);
              }}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={async () => {
              let result = await sendOtp(phonenumber);
              await setOptres(result);
            }}
          >
            Next
          </Button>
        </div>
      )}
      {displayrest && (
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
              label=" Enter Otp"
              variant="standard"
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
            <TextField
              id="standard-basic"
              label=" Create a Password"
              variant="standard"
              onChange={(e) => {
                setPasscode(e.target.value);
              }}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={async () => {
              let result = await createAccount();
            }}
          >
            SignUp
          </Button>
        </div>
      )}
    </div>
  );
}
