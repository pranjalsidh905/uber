import { useState } from "react";
import { Link } from "react-router";
const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captaindata, setCaptainData] = useState([]);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(email, password);
    setCaptainData({ email: email, password: password });
    console.log(captaindata);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-2"
          src="https://pngimg.com/uploads/uber/uber_PNG24.png"
          alt="Uber Logo"
        ></img>
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <h3 className="text-lg font-medium mb-2">What your email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full border text-lg placeholder:text-base"
            type="email"
            required
            placeholder="your@email.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full border text-lg placeholder:text-base"
            type="password"
            required
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          Join a fleet?{" "}
          <Link to="/captain-signup" className="text-blue-500   ">
            Register a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/Login"
          className="bg-[#111] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
        >
          {" "}
          Sign in as a User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
