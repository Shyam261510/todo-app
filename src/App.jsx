import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./component/SignUp";
import Home from "./component/Home";
import Login from "./component/Loign";
import TeamInvite from "./component/TeamInvite";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teams/:teamid" element={<TeamInvite />} />
      </Routes>
    </div>
  );
}

export default App;
