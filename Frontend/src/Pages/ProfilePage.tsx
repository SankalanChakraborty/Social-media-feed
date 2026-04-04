import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UploadImage from "../components/UploadImage";
import Navbar from "../components/Navbar";
import type { User } from "../App";
import "./ProfilePage.css";
import Feed from "./Feed";

const ProfilePage = ({
  loggedInUser,
  setLoggedInUser,
}: {
  loggedInUser: User | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  const navigate = useNavigate();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [images, setImages] = useState([]);

  const handdleUploadButtonClick = () => {
    setShowUploadForm((prev) => !prev);
  };

  const fetchFeed = async () => {
    const response = await fetch("http://localhost:8080/api/images/my-images", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    setImages(data.images);
    console.log(data);
  };

  useEffect(() => {
    fetchFeed();
  }, []);

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
              onSuccess={() => {
                setShowUploadForm(false);
                fetchFeed();
              }}
            />
          </div>
        </div>
      )}
      {images.length > 0 && <Feed images={images} />}
    </div>
  );
};

export default ProfilePage;
