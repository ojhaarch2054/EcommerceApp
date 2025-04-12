import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import Cookies from 'js-cookie';

const Logout = () => {
    const { isAuthenticate, logOut } = useAuth();
    const navigate = useNavigate();
    //track the logOutStatus
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const logOutBtn = async () => {
        console.log("btn clicked")
        if (!isAuthenticate) {
            alert("You are not logged in.");
            return;
        }
        if (window.confirm("Do you want to logout?")) {
            //call the logout function from AuthContext
            await logOut();
            console.log("Logout Successful");
            //check token is cleared or not
            if (!Cookies.get('token')) {
                setIsLoggedOut(true);
                //if clear navigate to login page
                navigate('/');
            } else {
                console.error("Token not cleared");
            }
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <button onClick={logOutBtn} className="btn logOutbtn btn-danger">
                Logout
            </button>
            {isLoggedOut && <p>You have been logged out successfully.</p>}
            </div>
    );
};

export default Logout;