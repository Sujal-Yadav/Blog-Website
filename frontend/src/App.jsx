import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import UserBlogs from "./components/UserBlogs";
import BlogPage from "./components/BlogPage";
import Setting from "./components/Setting";

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

          {/* <Route element={<PrivateRoute />}>
            <Route path="/setting/:userId" element={<Setting />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/blogs/:userId" element={<UserBlogs />} />
          </Route> */}
          <Route path="/setting/:userId" element={<Setting />}>
            <Route path="blogs" element={<UserBlogs />} />
            <Route path="resources" element={<div>Resources Page</div>} />
            <Route path="contacts" element={<div>Resources Page</div>} />
            <Route path="about" element={<div>About Page</div>} />
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
