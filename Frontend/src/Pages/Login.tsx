import Input from "../components/Input";
import Toast from "../components/Toast";
import "./Login.css";

interface LoginProps {
  handleLogin: (e: React.FormEvent) => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const Login = (props: LoginProps) => {
  const { handleLogin, email, setEmail, password, setPassword } = props;

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form className="form" onSubmit={handleLogin}>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
