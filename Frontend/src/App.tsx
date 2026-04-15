import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Homepage";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import ProfilePage from "./Pages/ProfilePage";
import Toast from "./components/Toast";
import { API_BASE_URL, LOGIN, TOAST } from "./constants";

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
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
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
  }, [loginMessage, registrationMessage]);

  //handle user registration
  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`${API_BASE_URL}/users/register`, {
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
    }
    if (
      data?.status === "OK" &&
      data?.message === "User registered successfully"
    ) {
      setRegistrationMessage(data.message);
      setIsRegistrationSuccess(true);
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (data?.message === LOGIN.ERROR_MESSAGE) {
        setLoginMessage(LOGIN.ERROR_MESSAGE);
        setLoginSuccess(false);
      }
      if (data?.message === LOGIN.USER_NOT_FOUND) {
        setLoginMessage(LOGIN.USER_NOT_FOUND);
        setLoginSuccess(false);
      } else {
        setLoginMessage(LOGIN.SUCCESS_MESSAGE);
        setLoginSuccess(true);
      }
      if (data?.token) {
        await getUserprofile();
        navigate("/profile");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log("Error logggin in, please try again later", error);
    }
  };
  return (
    <div className="app-container">
      {loginSuccess ? (
        <Toast message={loginMessage} type={TOAST.TYPE_SUCCESS} />
      ) : !loginSuccess && loginMessage ? (
        <Toast message={loginMessage} type={TOAST.TYPE_ERROR} />
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
