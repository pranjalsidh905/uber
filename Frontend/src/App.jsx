import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import CaptainSignup from "./Pages/CaptainSignup";
import Signup from "./Pages/Signup";
import CaptainLogin from "./Pages/CaptainLogin";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-Login" element={<CaptainLogin />} />
      </Routes>
    </div>
  );
};

export default App;
