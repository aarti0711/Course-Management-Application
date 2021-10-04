import React, { useState, useEffect } from "react";
import AuthService from "./api/auth.service";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Components/Home";
import AllCourses from "./Components/AllCourses";
import AddCourse from "./Components/AddCourse";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Profile from "./Components/Profile";
import User from "./Components/User";
import Admin from "./Components/Admin";
import EditCourse from "./Components/EditCourse";

const App = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const admin = AuthService.getAddCourse();

    if (user) {
      setCurrentUser(user);
      setShowAdmin(user.roles.includes("ROLE_USER"));
    }

    if (admin) {
      setCurrentUser(admin);
      setShowAdmin(admin.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          React
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/signup"} className="nav-link">
              SignUp
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>
        </div>

        {!showAdmin && currentUser && (
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Course
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/list"} className="nav-link">
                All Course
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          </div>
        )}

        {currentUser && (
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Logout
              </a>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/add" component={AddCourse} />
          <Route path="/list" component={AllCourses} />
          <Route path="/admin" component={Admin} />
          <Route path="/user" component={User} />
          <Route path="/add-course/:id" component={AddCourse}></Route>
          <Route exact path="/course/edit/:id" component={EditCourse} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
