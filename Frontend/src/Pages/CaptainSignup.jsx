import { useState } from "react";
import { Link } from "react-router";
const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(email, password);
    setData({
      username: {
        firstName: firstName,
        lastName: lastName,
      },

      email: email,
      password: password,
    });
    console.log(data);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10 "
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        ></img>
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <h3 className="text-lg font-medium mb-2">What`s your Name</h3>
          <div className="flex gap-4 mb-6">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              required
              placeholder="FirstName"
            />
            {/* <h3 className="text-lg font-medium mb-2">LastName</h3> */}
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              required
              placeholder="LastName"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What your email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full border text-lg placeholder:text-base"
            type="email"
            required
            placeholder="your@email.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full border text-lg placeholder:text-base"
            type="password"
            required
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          Already have a account?{" "}
          <Link to="/login" className="text-blue-500   ">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply.</span>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
