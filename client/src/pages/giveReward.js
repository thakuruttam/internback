import Qrcode from "../compoents/qrcode";
import { useState, useEffect } from "react";
import Scanner from "../compoents/scanner";
import Rewards from "../compoents/rewards";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Logout from "../compoents/logout";

function Home() {
  const [admin, setAdmin] = useState(null);
  const [customer, setCustomer] = useState(null);

  return (
    <div>
      <Logout />
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
          label=" Amount"
          variant="standard"
          onChange={(e) => {
            //  setPhonenumber(e.target.value);
          }}
        />
      </Box>
      <Button
        variant="outlined"
        onClick={async () => {
          //   let result = await sendOtp(phonenumber);
          //   await setOptres(result);
        }}
      >
        Next
      </Button>
    </div>
  );
}

export default Home;
