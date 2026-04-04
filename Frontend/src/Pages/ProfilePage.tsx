import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
  const [showUploadForm, setShowUploadForm] = useState(false);
  const handdleUploadButtonClick = () => {
    setShowUploadForm((prev) => !prev);
  };

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
      <Navbar
        loggedInUser={loggedInUser}
        handdleUploadButtonClick={handdleUploadButtonClick}
        handleLogout={handleLogout}
      />
      {/* {loggedInUser?.userName && <UploadImage loggedInUser={loggedInUser} />} */}
      {showUploadForm && (
        <div className="modal-overlay" onClick={() => setShowUploadForm(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowUploadForm(false)}
            >
              ✕
            </button>
            <UploadImage
              loggedInUser={loggedInUser}
              onSuccess={() => setShowUploadForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
