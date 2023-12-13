// import React, { useState } from "react";
// import "./Login.css";

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSignInClicked, setIsSignInClicked] = useState(false);
//   const minLength = 5;

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSignInClick = () => {
//     setIsSignInClicked(true);

//     if (username.length >= minLength && password.length >= minLength) {
//       alert('Wrong username/password'); 
//     }
//   };

//   // const handleSignInClick = async () => {
//   //   setIsSignInClicked(true);
  
//   //   if (username.length >= minLength && password.length >= minLength) {
//   //     try {
//   //       const response = await fetch('http://localhost:5000/login', {
//   //         method: 'POST',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //         },
//   //         body: JSON.stringify({ username, password }),
//   //       });
  
//   //       const data = await response.json();
//   //       window.prompt(data.message);
//   //     } catch (error) {
//   //       console.error('Error:', error);
//   //     }
//   //   }
//   // };
  
//   return (

//     <div className="form">
//       <div className="title">Sign In</div>

//       <label className="label">User Name</label>
//       <input
//         className="input"
//         type="text"
//         id="usernameField"
//         placeholder="User name"
//         value={username}
//         onChange={handleUsernameChange}

//       />
//       {isSignInClicked && username.length < minLength && (
//         <p className="error">*Minimum number of characters for Username is {minLength}</p>
//       )}

//       <label className="label">Password</label>
//       <input
//         className="input"
//         type="password"
//         id="passwordField"
//         placeholder="Password"
//         value={password}
//         onChange={handlePasswordChange}

//       />
//       {isSignInClicked && password.length < minLength && (
//         <p className="error">*Minimum number of characters for Password is {minLength}</p>
//       )}

//       <button type="button" className="btn" onClick={handleSignInClick}>
//         Sign In
//       </button>

//       <p className="para">
//         Didn't have an account? <span className="spantag">Sign Up</span>
//       </p>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      // Check if username and password lengths are less than 5
      if (username.length < 5 || password.length < 5) {
        const response = await axios.get(`https://petals.ath.cx/test/login.jsp?username=${username}&password=${password}`);
        setError(response.data.error);
        setApiData(null);
      } else {
        // If lengths are not less than 5, proceed with the original API call
        const response = await axios.get('http://localhost:3001'); // Assuming your server is running locally on port 3001
        setApiData(response.data);
        setError(null);
      }
    } catch (error) {
      console.error('Error fetching data from the server:', error.message);
      setError(error.response?.data?.error || 'Internal Server Error');
    }
  };

  return (
    <div className="form">
      <h1 className="title">Sign In</h1>
      <div className='username'>
        <label className="label">
          Username</label>
          <input className="input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        
        {error && error.username && <p className="error">{error.username}</p>}
      </div>
      <div className='password'> 
        <label className="label">
          Password</label>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        {error && error.password && <p className="error">{error.password}</p>}
      </div>
      <div>
        <button className="btn" onClick={handleLogin}>Login</button>
      </div>


      <div>
        {apiData && (
          <div>
            <h2>API Data:</h2>
            <pre>{JSON.stringify(apiData, null, 2)}</pre>
          </div>
        )}
        {error && !error.username && !error.password && (
          <p className="error">{error.ok ? 'Failed to login' : 'Wrong Username/Password Credentials'}</p>
        )}
      </div>


      <p className="para">
         Didn't have an account? <span className="spantag">Sign Up</span>
     </p>
    </div>
  );
}

export default Login;
