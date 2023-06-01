import React, {useState} from 'react';
import { useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function Login(props) {
    const dispatch = useDispatch()
    const [username, setName] = useState('')
    const [password, setPass] = useState('')
    const navigate = useNavigate();
    const ProceedLogin = (e) => {
        e.preventDefault()
        if(validate()) {
            fetch(" http://localhost:3001/user/" + username).then((res) => {
                return res.json()
            }).then((resp) => {
                console.log(resp)
                if(Object.keys(resp).length === 0) {
                    alert('Please Enter Valid Email')
                }else {
                    if(resp.password === password){

                        dispatch({
                            type: "edit-current-user-name",
                            payload: {
                                name: username
                            }
                        })
                        navigate('/home')

                    }else{
                        alert('Please Enter Valid Password')
                    }
                }

            })
        }
    }



    const validate = () => {
        let result = true;
        if(username === '' || username === null) {
            result = false

            alert('Please Enter Email ')
        }
        if(password === '' || password === null) {
            result = false
            alert('Please Enter Password ')
        }
        return result
    }


    return (
        <div style={{textAlign: "center"}}>

            <h1>React Project Media</h1>
            <form onSubmit={ProceedLogin} className="container" >
            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-controlled"
        label="Email"
        value={username}
        onChange={(e) => {setName(e.target.value)}} 
      />
      <TextField
        id="outlined-uncontrolled"
        onChange={(e) => {setPass(e.target.value)}} 
        label="Password"
        type='password'
       
      />
                </Box>
                <Stack direction="row"
                 spacing={2}
                 sx={{ justifyContent: "center" }}
                 mt={1}
                  >
                <Button type='submit' variant="contained" >
                    Log In
                </Button>
                </Stack>
             
            </form>
        </div>
    );
}


export default Login;
