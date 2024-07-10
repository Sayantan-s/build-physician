import { useAuth } from "./store/auth";

const App = () => {
  const { googleLogin } = useAuth();

  return (
    <div>
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <button onClick={googleLogin}>Google Login</button>
    </div>
  );
};

export default App;
