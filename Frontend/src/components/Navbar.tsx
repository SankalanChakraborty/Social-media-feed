import type { User } from "../App";
import "./Navbar.css";

interface NavbarProps {
  loggedInUser: User | null;
  handleLogout: () => void;
}

const Navbar = ({ loggedInUser, handleLogout }: NavbarProps) => {
  return (
    <div className="banner">
      {loggedInUser?.userName ? (
        <h1>Hello {loggedInUser.userName} welcome to your library</h1>
      ) : (
        <h1>Please login to access your library</h1>
      )}
      {loggedInUser?.userName && (
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
