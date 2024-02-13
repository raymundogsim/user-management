import * as React from 'react';
import { useContext, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { ColorModeContext, tokens } from "../../theme";
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import {  IconButton, useTheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'features/auth/authApi';
import SetupDialog from 'components/SetupDialog';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.


export default function SignIn() {
  const dispatch = useDispatch();
  const {errors, message } = useSelector(({auth}) => auth)
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);
  const [isSetup, setIsSetup] = useState(0);
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    
    dispatch(login(values))
    .then(res => {
      if(res){
        navigate('/dashboard')
      }
    })
    // const data = new FormData(event.currentTarget);
  };


console.log(isSetup, errors)

  return (
    <>
    <SetupDialog
    open={isSetup === 5}
    handleClose={() => setIsSetup(0)}
    />
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: 2
      }}
    >
      <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        </Box>
      <Container component="main" maxWidth="xs" sx={{mt: 5}}>

      <br/>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p:2,
            borderRadius: '5px',
            backgroundColor: colors.primary[400]
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}
          onClick={() => setIsSetup(isSetup + 1)}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              error={errors.username}
              helperText={errors.username && errors.username}
              value={values.username}
              onChange={(e) => setValues({...values, username: e.target.value})}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errors.password}
              helperText={errors.password && errors.password}
              value={values.password}
              onChange={(e) => setValues({...values, password: e.target.value})}
            />
             <Typography
      align="center"
        color={colors.redAccent[400]}
      >
      {message}
      </Typography>
            <Button
              type="submit"
              fullWidth
              // variant="contained"
              sx={{ 
                mt: 3, mb: 2,
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
              }}
            >
              Sign In
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}