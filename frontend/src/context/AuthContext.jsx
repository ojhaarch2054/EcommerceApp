import React, {
  createContext,
  useState,
  useEffect,
} from "react";
//import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import Cookies from "js-cookie";
//to extract user info
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  //save authenticated user info
  const [user, setUser] = useState(null);
  //to save jwt token
  const [token, setToken] = useState(Cookies.get("token") || null);
  //to save role
  const [role, setRole] = useState(Cookies.get("role") || null);
  //to track
  const [loading, setLoading] = useState(true);
  //to save refresh token
  const [refreshToken, setRefreshToken] = useState(
    Cookies.get("refreshToken") || null
  );

  //logs user state whenever it change
  useEffect(() => {
    console.log("AuthContext user:", user);
  }, [user]);

  useEffect(() => {
    //get token from cookies
    const token = Cookies.get("token");
    if (token) {
      try {
        //decode using jwt
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        //extract id and set in user state
        setUser({ id: decoded.id });
        setToken(token);
        setRole(decoded.role);
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
    setLoading(false);
    console.log("loading false..")
  }, []);

  //to handle user login
  const logIn = async (email, password) => {
    try {
      console.log("login with:", email, password);
      //post rqst to the login endpoint
      const response = await axiosInstance.post("/logIn_users", {
        email,
        password,
      });
      const { data } = response;
      console.log("Login response data:", data);
      //check role from backend and set it to user
      if (data.roles === "admin") {
        setUser(data.user);
        setToken(data.token);
        setRefreshToken(data.refreshtoken);

        //store token and role in cookies
        //set the token cookie with the value of data.token ensuring it is secure and has strict same-site policy
        Cookies.set("token", data.token, { secure: true, sameSite: "strict" });
        Cookies.set("role", "admin", { secure: true, sameSite: "strict" });
        Cookies.set("refreshToken", data.refreshtoken, {
          secure: true,
          sameSite: "strict",
        });
      } else {
        throw new Error("No match role");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  //to handle user logout
  const logOut = () => {
    //clear user and token state
    setUser(null);
    setToken(null);
    setRole(null);
    //remove token from cookies
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("refreshToken");
  };

  //ceate the object of values to provide
  const values = {
    user,
    token,
    role,
    logIn,
    logOut,
    isAuthenticate: !!token, //check if token exists
    setLoading
  };

  return (
    //provide values to the context
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
