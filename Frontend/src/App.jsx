import './App.css'

import { Route, Routes } from "react-router-dom";

import Homepage from './Pages/Homepage.jsx';
import LoginPage from "./Pages/Login.jsx";
import SignupPage from "./Pages/Signup.jsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
      </Routes>
    </>
  )
}

export default App
