import { useNavigate } from "react-router-dom";
import useAuthStore from "../context/authStore";

const PrivateRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return children;
};

export default PrivateRoute;
