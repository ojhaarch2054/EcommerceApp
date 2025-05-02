import useAuth from "../context/Hook/useAuth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { isAuthenticate } = useAuth();
  const navigate = useNavigate()

  const logInbtnn = () => {
    navigate("/login")
  }

  return (
    <>
     <div className="container mt-5">
      {isAuthenticate ? (
        <div className="text-center">
          <h1 className="display-4">This is your profile section</h1>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="display-5 mb-4">
            You need to log in to view your profile.
          </h1>
          <button className="btn btn-secondary btn-lg" onClick={logInbtnn}>
            Log In
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default Profile;
