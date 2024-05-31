import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import Navbar from "./components/Navbar";
import { useState } from "react";
import Profile from "./components/Profile";

function App() {

  return (
    <div className="dark:bg-slate-950 bg-white">
      <BrowserRouter>
      {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage profile={true} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App;
