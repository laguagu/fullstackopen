
const LoginForm = ({
    handleLogin,
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
   }) => {
    return(
    <>
      <h2>Log in to application</h2>
      
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
  };
  
  export default LoginForm