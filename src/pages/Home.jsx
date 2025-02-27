import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4 text-blue-400">Welcome to Task Manager</h1>
      <p className="text-lg text-gray-400 mb-6">Manage your tasks efficiently</p>
      <div className="flex space-x-6">
        <Link 
          to="/login" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-300"
        >
          Login
        </Link>
        <Link 
          to="/register" 
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition duration-300"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
