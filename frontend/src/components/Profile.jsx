import { useEffect, useState } from "react";
import useAuth from "../context/Hook/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { isAuthenticate, user } = useAuth();
  const navigate = useNavigate();
  //store use details
  const [userDetails, setUserDetails] = useState(null);

  const logInbtnn = () => {
    navigate("/login");
  };

  //filter profile based on the authenticated user id
  const filterProfile = userDetails?.find((item) => item.id === user?.id) || null;
  console.log("Filtered profile:", filterProfile);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get("http://localhost:3000/users");
        setUserDetails(result.data);
        console.log(result);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Error fetching users:");
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="container mt-5">
        {isAuthenticate ? (
          <div className="text-center">
            <h1 className="display-4 mb-4">Your Profile</h1>
            {filterProfile ? (
              <div className="card mx-auto">
                <div className="card-header bg-secondary text-white">
                  <h4 className="mb-0">User's Details</h4>
                </div>
                <div className="card-body">
                  <p className="">
                    <strong>Name: </strong>
                    {filterProfile.name}
                  </p>
                  <p className="card-text">
                    <strong>Address:</strong> {filterProfile.address}
                  </p>
                  <p className="card-text">
                    <strong>Phone:</strong> {filterProfile.phone_number}
                  </p>
                  <p className="card-text">
                    <strong>Email:</strong> {filterProfile.email}
                  </p>
                </div>
              </div>
            ) : (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <h1 className="display-5 mb-4">Log in to view your profile</h1>
            <button className="btn btn-primary btn-lg" onClick={logInbtnn}>
              Log In
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
