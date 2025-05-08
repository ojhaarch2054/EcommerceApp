import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/signUp.css";

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
  //for popup message
  const [popupMessage, setPopupMessage] = useState("");
  //to control visibility of msg
  const [showPopup, setShowPopup] = useState(false);

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
    if (!inputs.fullname.trim()) {
      setPopupMessage("Fullname is required!");
      setShowPopup(true);
      return;
    }

    if (!inputs.emailAddress.trim()) {
      setPopupMessage("Email address is required!");
      setShowPopup(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.emailAddress)) {
      setPopupMessage("Please enter a valid email address!");
      setShowPopup(true);
      return;
    }

    if (!inputs.phoneNumber.trim()) {
      setPopupMessage("Phone number is required!");
      setShowPopup(true);
      return;
    }

    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(inputs.phoneNumber)) {
      setPopupMessage("Please enter a valid phone number!");
      setShowPopup(true);
      return;
    }

    if (!inputs.address.trim()) {
      setPopupMessage("Address is required!");
      setShowPopup(true);
      return;
    }

    if (!inputs.password.trim()) {
      setPopupMessage("Password is required!");
      setShowPopup(true);
      return;
    }

    if (inputs.password.length < 6) {
      setPopupMessage("Password must be at least 6 characters long!");
      setShowPopup(true);
      return;
    }

    if (inputs.password !== inputs.confirmPassword) {
      setPopupMessage("Passwords do not match!");
      setShowPopup(true);
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
      <h1 className="text-center mt-4 mb-4">Register your email id here: </h1>
      <div className="container card p-4 shadow-lg">
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
          <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn signupBtn text-white px-4 shadow-lg"
            onClick={signupBtn}
          >
            Sign Up
          </button>
          </div>
        </form>
      </div>
      {/*bnootstrap modal for popup*/}
      <div
        className={`modal fade ${showPopup ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Validation Message</h5>
              <button
                type="button"
                className="close"
                onClick={() => setShowPopup(false)}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{popupMessage}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn popUpBtn"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
