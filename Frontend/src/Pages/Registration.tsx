import Input from "../components/Input";

interface RegistrationProps {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  handleRegistration: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Registration = (props: RegistrationProps) => {
  //Desctructure props
  const {
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleRegistration,
  } = props;
  return (
    <div className="form-container">
      <h1>Register User</h1>
      <form className="form" onSubmit={handleRegistration}>
        <Input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your username"
          required
        />

        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password..."
          required
        />
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password..."
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Registration;
