<<<<<<< Updated upstream
import { BrowserRouter, Routes, Route } from "react-router-dom";
=======
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
>>>>>>> Stashed changes
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import Navbar from "./components/Navbar";
import { useState } from "react";
import Profile from "./components/Profile";
<<<<<<< Updated upstream

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
=======
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId='974966331785-10jm2j7o2pe67rsf12qb9gqnfkonapjh.apps.googleusercontent.com'>
        <LoginPage />
      </GoogleOAuthProvider>
    )
  }

  return (
    <BrowserRouter>
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<GoogleAuthWrapper />} />
        <Route path="/signup" element={<SignUpPage />} />\

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
>>>>>>> Stashed changes

  )


}

export default App;
