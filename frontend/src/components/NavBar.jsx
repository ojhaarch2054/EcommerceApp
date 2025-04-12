import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome, FaUser, FaShoppingCart } from 'react-icons/fa';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logout from './LogOut';

const NavBar = () => {
    const { isAuthenticate, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => navigate("/logIn");
    const handleSignUp = () => navigate("/sign_up");

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">MyApp</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FaHome className="me-2" /> Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FaUser className="me-2" /> Profile
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FaShoppingCart className="me-2" /> Cart
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {isAuthenticate ? (
                            <>
                            <h1>You are logged in</h1>
                            <li className="nav-item">
                            <Logout/>
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