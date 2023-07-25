import logo from "./logo.svg";
import "./App.css";
import Qrcode from "./compoents/qrcode";
import Scanner from "./compoents/scanner";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import SignUp from "./pages/signup";
import Home from "./pages/home";
import Auth from "./pages/auth";

function App() {
  const [showqr, setShowqr] = useState(false);
  const [tologout, setTologout] = useState(true);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
