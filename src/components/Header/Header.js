import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export default function Header() {
    const navigate = useNavigate();
    const name = useSelector(function (state) {
        return state.currentUser.name;
    });

    const goTo = () => {
        if(name === ''){
            navigate("/login")
        }else {
            navigate("/profile")
        }
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                    </Typography>
                    <Button onClick={goTo} color="inherit"><AccountCircleIcon/></Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}