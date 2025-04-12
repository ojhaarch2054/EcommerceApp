import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
     //clear err msg when user type in input field
     setError("");
  };

  //to submit login
  const logInSubmit = async (e) => {
    e.preventDefault();
    if (!loginInput.email || !loginInput.password) {
      //set err msg
      setError("Email and password are required."); 
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
    console.log("logIn btn clicked yayyyy")
  }

    return(
        <>
        <div className="container">
        <form onSubmit={logInSubmit}>
      <div className="form-group">
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
        </div><br />
        <button className="btn btn-secondary" onClick={logInbtn}>Log In</button>
        </form>
        </div>
        </>
    )
}


export default LogIn;