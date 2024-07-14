import { useGoogleLogin } from "./apis/hooks/auth/useGoogleLogin";

const App = () => {
  const googleLogin = useGoogleLogin();

  return (
    <div>
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <button onClick={googleLogin}>Google Login</button>
    </div>
  );
};

export default App;
