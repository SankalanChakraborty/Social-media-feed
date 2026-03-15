import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <Link to="/login">Login</Link>
      <span style={{ margin: "0 10px" }}>|</span>
      <Link to="/register-user">Register</Link>
    </div>
  );
};

export default Homepage;
