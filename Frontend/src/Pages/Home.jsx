import { Link } from "react-router";

const Home = () => {
  return (
    <div className="bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1564694202225-cc1920e206ed?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] h-screen pt-8 flex flex-col justify-between bg-red-400 w-full">
      <img
        className="w-16 ml-8"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      ></img>
      <div className="bg-white pb-8 py-4 px-4">
        <h2 className="text-3xl font-semibold">Get Started With Uber</h2>
        <Link
          to="/login"
          className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-8"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Home;
