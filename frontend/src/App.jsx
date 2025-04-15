import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cart from './components/Cart';
import NavBar from './components/NavBar';

const App = () => {

  return (
    <>
    <Router>
    <NavBar/>
      <Routes>
      <Route path="/" element={<HomePage/>} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/carts" element={<Cart />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
