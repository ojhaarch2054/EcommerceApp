import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
