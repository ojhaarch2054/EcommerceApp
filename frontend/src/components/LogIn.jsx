import useAuth from "../context/Hook/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/signUp.css";

const LogIn = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  //state for input field
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  //to show the err msg
  const [error, setError] = useState("");
  //to show password err mdg
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    //clear err msg when user type in input field
    setError("");
    if (name === "password") {
      //clear password error when typing
      setPasswordError("");
    }
  };

  //to submit login
  const logInSubmit = async (e) => {
    e.preventDefault();
    //validation
    if (!loginInput.email || !loginInput.password) {
      //set err msg
      setError("Email and password are required.");
      return;
    }
    // Password validation
    if (loginInput.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }
    try {
      //try to login with email and pw
      await logIn(loginInput.email, loginInput.password);
      //if login is succesful navigate to home
      console.log("Navigating to home...");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errMsg = error.response.data.error || error.response.data;
        setError(errMsg);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const logInbtn = () => {
    console.log("logIn btn clicked yayyyy");
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center mt-5 ">
        <div className="card shadow-lg p-5 w-75">
          <h3 className="text-center mb-4 logInPage">Log In</h3>
          <form onSubmit={logInSubmit} className="logInPage">
            <div className="form-group ">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="eg: Jenni@gmail.com"
                name="email"
                value={loginInput.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="password"
                name="password"
                value={loginInput.password}
                onChange={handleChange}
              />
              {passwordError && (
                <small className="text-danger">{passwordError}</small>
              )}
            </div>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            <br />
            <div className="d-flex justify-content-center">
              <button
                className="btn logInBtn text-white px-4 shadow-lg"
                type="submit"
                onClick={logInbtn}
              >
                Log In
              </button>
            </div>{" "}
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
