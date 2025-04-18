import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome, FaUser, FaShoppingCart } from 'react-icons/fa';
import  useAuth  from "../context/Hook/useAuth";
import { useNavigate } from "react-router-dom";
import Logout from './LogOut';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const { isAuthenticate} = useAuth();
    console.log("Authenticated:", isAuthenticate);

    const navigate = useNavigate();

    const handleLogin = () => navigate("/logIn");
    const handleSignUp = () => navigate("/sign_up");

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MyApp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <FaHome className="me-2" /> Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <FaUser className="me-2" /> Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/carts">
                                <FaShoppingCart className="me-2" /> Cart
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {isAuthenticate ? (
                            <>
                                <h1>You are logged in</h1>
                                <li className="nav-item">
                                    <Logout />
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <button className="btn btn-secondary mx-2" onClick={handleLogin}>
                                        Log In
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-secondary" onClick={handleSignUp}>
                                        Sign Up
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;