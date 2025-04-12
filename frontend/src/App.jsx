import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

const App = () => {

  return (
    <>
    <AuthProvider>
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
    </AuthProvider>
    </>
  )
}

export default App
