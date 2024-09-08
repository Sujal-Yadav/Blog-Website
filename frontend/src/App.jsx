import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import UserBlogs from "./components/UserBlogs";
import BlogPage from "./components/BlogPage";

function App() {

  return (
    <div className="dark:bg-slate-950 bg-white">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />\
          
          <Route element={<PrivateRoute />}>
            <Route path="/home/:userId" element={<HomePage />} />
          </Route>
          
          <Route element={<PrivateRoute />}>
            <Route path="/profile/:userId" element={<Profile />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/userBlogs/:userId" element={<UserBlogs />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/userBlogs/:userId/blogPage/:blogId" element={<BlogPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App;
