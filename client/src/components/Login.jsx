import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useAppAuth from "../hooks/useAppAuth";
import {axiosPublic} from "../api/axios";

function Login() {

    const [, setAppAuth] = useAppAuth();
    
    const [usernameError, setUsernameError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || "/" ;

    console.log("from", from);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let error = false;

        //validate form
        if(data.get('username') === ""){
            setUsernameError(true);
            error = true;
        }

        if(data.get('password') === ""){
            setPasswordError(true);
            error = true;
        }

        if(error){
            return;
        }

        axiosPublic.post('/api/token/', {
            username: data.get('username'),
            password: data.get('password')
        }).then((response) => {
            
            setAppAuth({
                token: response.data.access,
                refreshToken: response.data.refresh,
                name: response.data.name,
                username: response.data.username,
            });

            navigate(from , { replace: true });

        }).catch((error) => {
            console.log(error);
        });
        
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        required
                        fullWidth
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        sx={{ mt: 2 }}
                        error={usernameError}
                        onChange={() => { setUsernameError(false) }}
                    />
                    <TextField
                        required
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        sx={{ mt: 2 }}
                        error={passwordError}
                        onChange={() => { setPasswordError(false) }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;