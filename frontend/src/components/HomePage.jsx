import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import Logout from "./LogOut";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticate } = useAuth();

  const logInPageBtn = () => {
    navigate("/logIn");
  };
  const SignUpPageBtn = () => {
    navigate("/sign_up");
  };
  return (
    <>
      {isAuthenticate ? (
        <div>
          <h1>Welcome to the page you are logged in</h1>
          <Logout />
        </div>
      ) : (
        <div>
          <h1>This is home page</h1>
          <button onClick={logInPageBtn} className="btn btn-secondary mx-3">
            Log In
          </button>
          <button onClick={SignUpPageBtn} className="btn btn-secondary">
            Sign Up
          </button>
        </div>
      )}
    </>
  );
};

export default HomePage;
