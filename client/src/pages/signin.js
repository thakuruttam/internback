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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  const [optres, setOptres] = useState(false);
  const [phonenumber, setPhonenumber] = useState(false);
  const [displayrest, setDisplayrest] = useState(null);
  const [displaynumber, setDisplaynumber] = useState(true);
  const [code, setCode] = useState(null);
  const [passcode, setPasscode] = useState(true);

  //   async function sendOtp(phone) {
  //     console.log("phone", phone);
  //     try {
  //       let result = await axios.post("http://localhost:8000/otp", {
  //         phonenumber: phone,
  //         code: 333,
  //       });
  //       console.log(result);
  //       setDisplaynumber(false);
  //       setDisplayrest(true);

  //       return result;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  async function login() {
    const notify = (value) => {
      console.log("hit notify");
      toast.success(value);
    };
    const notifyerror = (value) => {
      toast.error(value);
    };

    if (isNaN(phonenumber - parseFloat(phonenumber)) || phonenumber === "") {
      notifyerror("Incorrect phone number");
    } else if (passcode === "") {
      notifyerror("Enter a Password");
    } else {
      try {
        let result = await axios.post(
          "http://localhost:8000/user/signin",
          {
            phonenumber: phonenumber,
            password: passcode,
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
          notify("logged in successfully");
          setTimeout(() => {
            window.open("/home", "_self");
          }, 1000);
        }
        return result;
      } catch (error) {
        notifyerror("Login failed");

        console.log(error);
      }
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
        </div>
      )}
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
            type="password"
            label=" Password"
            variant="standard"
            onChange={(e) => {
              setPasscode(e.target.value);
            }}
          />
        </Box>
        <Button
          variant="outlined"
          onClick={async () => {
            let result = await login();
          }}
        >
          Login
        </Button>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
