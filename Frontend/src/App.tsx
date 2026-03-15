import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Page from "./Pages/Page";
import Homepage from "./Pages/Homepage";
import Registration from "./Pages/Registration";

function App() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  const getUserprofile = async () => {
    try {
      const response = await fetch("http://localhost:8080/users/profile", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setLoggedInUser(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    getUserprofile();
  }, []);

  //handle user registration
  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data?.message === "User registered successfully") {
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);
    if (data?.token) {
      await getUserprofile();
      navigate("/profile");
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/register-user"
          element={
            <Registration
              userName={userName}
              setUserName={setUserName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              handleRegistration={handleRegistration}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              handleLogin={handleLogin}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path="/logout"
          element={
            <Login
              handleLogin={handleLogin}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Page
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
