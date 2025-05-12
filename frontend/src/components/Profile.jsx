import { useEffect, useState } from "react";
import useAuth from "../context/Hook/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/profile.css";

const Profile = () => {
  const { isAuthenticate, user, setLoading } = useAuth();
  const navigate = useNavigate();
  //store use details
  const [userDetails, setUserDetails] = useState(null);
  //track the editing mode
  const [isEditing, setIsEditing] = useState(false);
  //to store form data for editing
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  //for non authenticate user
  const logInbtnn = () => {
    navigate("/login");
  };

  //fetch user detail
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await axios.get("http://localhost:3000/users");
        setUserDetails(result.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Error fetching users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [isAuthenticate, setLoading]);

  //filter profile based on the authenticated user id
  const filterProfile =
    userDetails?.find((item) => item.id === user?.id) || null;
  console.log("Filtered profile:", filterProfile);

  //fetch user details
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

  //to update profile
  const updateProfile = async (id, name, email, phone_number, address) => {
    try {
      await axios.put("http://localhost:3000/updateProfile", {
        id,
        name,
        email,
        phone_number,
        address,
      });
      alert("Profile updated successfully!");
      //exit edit mode
      setIsEditing(false);
      //create updated user update
      const updatedUser = { id, name, email, phone_number, address };
      setUserDetails((prevDetails) =>
        prevDetails.map((user) => (user.id === id ? updatedUser : user))
      );
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };
  // Handle input changes in the form and update formData state
  const handleInputChange = (e) => {
    // Destructure name and value from the event
    const { name, value } = e.target;
    //update form obj
    setFormData({ ...formData, [name]: value });
  };

  //enable edit mode
  const handleEdit = () => {
    //enable edit mode
    setIsEditing(true);
    setFormData({
      id: filterProfile.id,
      name: filterProfile.name,
      email: filterProfile.email,
      phone_number: filterProfile.phone_number,
      address: filterProfile.address,
    });
  };
  //save updated profile by calling the updateProfile fun
  const handleSave = () => {
    //destructure form data
    const { id, name, email, phone_number, address } = formData;
    //call updateProfile fun with updated data
    updateProfile(id, name, email, phone_number, address);
  };

  const handleCancel = () => {
    // exist editing mode
    setIsEditing(false);
  };

  return (
    <div className="container mt-5">
      {isAuthenticate ? (
        <div className="text-center">
          {/*check if user profile exist or not and editing mode or npot*/}
          {filterProfile ? (
            isEditing ? (
              <div className="card mx-auto profileCard">
                <div className="card-header bg-secondary text-white">
                  <h4 className="mb-0">Edit Profile</h4>
                </div>
                <div className="card-body">
                  <form>
                    {/*form for editing profile */}
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group ">
                      <label>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </form>
                  {/*btns to save or cancel changes */}
                  <button
                    className="btn btn-secondary mt-3"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                  <button
                    className="btn btn-danger mt-3 ml-2"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              //display user's details
              <div className="card mx-auto profileCard">
                <div className="card-header text-white">
                  <h4 className="mb-0">User's Details</h4>
                </div>
                <div className="card-body ">
                  <p>
                    <strong>Name: </strong>
                    {filterProfile.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    {filterProfile.email}
                  </p>
                  <p>
                    <strong>Phone: </strong>
                    {filterProfile.phone_number}
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {filterProfile.address}
                  </p>
                  {/*to enable edit mode*/}
                  <button
                    className="btn btn-secondary editBtn"
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )
          ) : (
            <p>No profile found.</p>
          )}
        </div>
      ) : (
        <div>
          <p className="text-center ">Please log in to view your profile.</p>
          <button
            className="btn logInBtn d-block mx-auto px-4 text-white"
            onClick={logInbtnn}
          >
            LogIn Here
          </button>{" "}
        </div>
      )}
    </div>
  );
};
export default Profile;
