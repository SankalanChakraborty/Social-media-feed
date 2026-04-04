import { useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import Navbar from "../components/Navbar";
import type { User } from "../App";
import "./ProfilePage.css";

const ProfilePage = ({
  loggedInUser,
  setLoggedInUser,
}: {
  loggedInUser: User | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await fetch("http://localhost:8080/users/logout", {
      method: "POST",
      credentials: "include",
    });
    setLoggedInUser(null);
    navigate("/login");
  };
  return (
    <div className="profile-page">
      <Navbar loggedInUser={loggedInUser} handleLogout={handleLogout} />
      {loggedInUser?.userName && <UploadImage loggedInUser={loggedInUser} />}
    </div>
  );
};

export default ProfilePage;
