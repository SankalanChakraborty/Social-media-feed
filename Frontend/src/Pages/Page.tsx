import { useNavigate } from "react-router-dom";
import UploadImage from "./UploadImage";

const Page = ({
  loggedInUser,
  setLoggedInUser,
}: {
  loggedInUser: any;
  setLoggedInUser: React.Dispatch<React.SetStateAction<any>>;
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
    <div>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>
        Welcome, {loggedInUser?.userName || "Guest"}!
      </p>
      {loggedInUser?.userName && (
        <a href="/logout" onClick={handleLogout}>
          Log Out
        </a>
      )}
      <UploadImage />
    </div>
  );
};

export default Page;
