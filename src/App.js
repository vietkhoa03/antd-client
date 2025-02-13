import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./User/Home";
import Login from "./User/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
