const Login = () => {
  return (
    <div className="login">
      <form>
        <label htmlFor="login">Email/Username</label>
        <input id="login" type="email" required placeholder="Enter email" />
      </form>
    </div>
  );
};

export default Login;
