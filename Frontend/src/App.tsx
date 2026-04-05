import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Homepage";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import ProfilePage from "./Pages/ProfilePage";
import Toast from "./components/Toast";

export interface User {
  userName: string;
  email: string;
  role: "user" | "admin";
}

function App() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState("");
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

  useEffect(() => {
    if (loginMessage) {
      const timer = setTimeout(() => {
        setLoginMessage("");
        setLoginSuccess(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
    if (registrationMessage) {
      const timer = setTimeout(() => {
        setRegistrationMessage("");
        setIsRegistrationSuccess(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [loginMessage]);

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
    if (data?.status === "Error") {
      setRegistrationMessage(data.message);
      setIsRegistrationSuccess(false);
    } else {
      setRegistrationMessage(data.message);
      setIsRegistrationSuccess(true);
    }
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
    if (data?.message === "Invalid email or password") {
      setLoginMessage("Invalid email or password");
      setLoginSuccess(false);
    } else {
      setLoginMessage("Login successful");
      setLoginSuccess(true);
    }
    if (data?.token) {
      await getUserprofile();
      navigate("/profile");
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="app-container">
      {loginSuccess ? (
        <Toast message={loginMessage} type={"success"} />
      ) : !loginSuccess && loginMessage ? (
        <Toast message={loginMessage} type={"error"} />
      ) : null}
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
            <ProfilePage
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
