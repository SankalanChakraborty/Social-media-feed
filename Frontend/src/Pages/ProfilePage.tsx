import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UploadImage from "../components/UploadImage";
import Navbar from "../components/Navbar";
import type { Image, User } from "../App";
import "./ProfilePage.css";
import Feed from "./Feed";
import { API_BASE_URL } from "../constants";
import Toast from "../components/Toast";

const ProfilePage = ({
  loggedInUser,
  setLoggedInUser,
  images,
  setImages,
  filteredImageList,
  setFilteredImageist,
}: {
  loggedInUser: User | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
  filteredImageList: Image[];
  setFilteredImageist: React.Dispatch<React.SetStateAction<Image[]>>;
}) => {
  const navigate = useNavigate();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const handdleUploadButtonClick = () => {
    setShowUploadForm((prev) => !prev);
  };

  const fetchFeed = async () => {
    const response = await fetch(`${API_BASE_URL.BASE}/api/images/my-images`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    setImages(data.images);
    console.log(data);
    if (data.message === "No token provided") {
      navigate("/login");
    }
  };

  const removeImage = async (id: string, onImageDeleted?: () => void) => {
    try {
      const response = await fetch(
        `${API_BASE_URL.BASE}/api/images/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      if (!response.ok) {
        throw new Error("Failed to delete image");
      }
      const data = await response.json();
      console.log(data);
      if (data.ok) {
        // Immediately remove from UI
        setImages((prevImages) => prevImages.filter((img) => img._id !== id));
        // Refresh filtered list if it has items
        if (filteredImageList.length > 0) {
          setFilteredImageist((prevFiltered) =>
            prevFiltered.filter((img) => img._id !== id),
          );
        }
        // Show success toast
        setIsImageDeleted(true);
        setTimeout(() => setIsImageDeleted(false), 2500);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleLogout = async () => {
    const response = await fetch(`${API_BASE_URL.BASE}/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    console.log("Log out response>>> ", response);
    setLoggedInUser(null);
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <Navbar
        loggedInUser={loggedInUser}
        handdleUploadButtonClick={handdleUploadButtonClick}
        handleLogout={handleLogout}
        images={images}
        setFilteredImageist={setFilteredImageist}
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
      {isImageDeleted && (
        <Toast message="Image deleted successfully!" type="error" />
      )}
      {images.length > 0 ? (
        <Feed
          images={images}
          filteredImageList={filteredImageList}
          loggedInUser={loggedInUser}
          onImageDeleted={fetchFeed}
          removeImage={removeImage}
        />
      ) : (
        <p className="no-images-message">No memories to cherish.</p>
      )}
    </div>
  );
};

export default ProfilePage;
