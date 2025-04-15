import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  //state for input section
  const [inputs, setInputs] = useState({
    fullname: "",
    emailAddress: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  //state to save response
  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate();

  //for onchange function
  const handleChange = (e) => {
    //destructure the name and value from the event target
    const { name, value } = e.target;
    //update the state with the new value for input field
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const signupSubmit = async (e) => {
    //prevent form submission
    e.preventDefault();
    //validation
    if (
      !inputs.fullname ||
      !inputs.emailAddress ||
      !inputs.phoneNumber ||
      !inputs.address ||
      !inputs.password ||
      !inputs.confirmPassword
    ) {
      alert("All fields are required!");
      return;
    }

    if (inputs.password !== inputs.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      //post request to register user
      const response = await axios.post(
        "http://localhost:3000/register_users",
        {
          name: inputs.fullname,
          email: inputs.emailAddress,
          phone_number: inputs.phoneNumber,
          address: inputs.address,
          password: inputs.password,
          confirmPassword: inputs.confirmPassword,
        }
      );
      //show the backend email verification error in frontend
      if (response.status === 400) {
        alert(response.data.error);
        //stop further execution if there is any error
        return;
      }
      //update the previous state by adding newly added data
      setUserInfo((prevState) => [...prevState, response.data]);
      setInputs({
        fullname: "",
        emailAddress: "",
        phone_number: "",
        address: "",
        password: "",
        confirmPassword: "",
      });
      console.log(inputs.emailAddress + " added");
      navigate("/login");
    } catch (error) {
      console.error("Error occurred:", error);
      //if error object has response and response has data and data has error, then display the specific error
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("Error occurred while signing up");
      }
    }
  };

  const signupBtn = () => {
    console.log("btn clicked yayyyy");
  };

  return (
    <>
      <h1>Register your email id here: </h1>
      <div className="container">
        <form onSubmit={signupSubmit}>
          <div className="form-group">
            <label>Fullname</label>
            <input
              type="text"
              className="form-control"
              id="fullname"
              placeholder="eg: Jenni Hiukkonen"
              name="fullname"
              value={inputs.fullname}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="eg: Jenni@gmail.com"
              name="emailAddress"
              value={inputs.emailAddress}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              placeholder="eg: +3584525961565"
              name="phoneNumber"
              value={inputs.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="eg: Helsinki, Finland"
              name="address"
              value={inputs.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="password1"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="password2"
              placeholder="Password"
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <br />
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={signupBtn}
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
