import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function Login(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    
    fetch('http://localhost:3001/user')
      .then((response) => response.json())
      .then((data) => {
        
       
        const user = data.find((user) => user.email === username && user.password === password );
        if (user) {

          alert('Login successful!');
          dispatch({
            type: "edit-current-user-name",
            payload: {
                name: username,
                id: user.id
            }
        })
          navigate('/home')
          setUsername('');
          setPassword('');
          setError('');
        } else {
         
          setError('Invalid username or password');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('An error occurred. Please try again later.');
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );

  }
export default Login;
