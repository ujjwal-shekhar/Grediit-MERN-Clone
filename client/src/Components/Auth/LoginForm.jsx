import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Copyright = (props) => {
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

const theme = createTheme();

const LoginForm = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [usernameError, setUsernameError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  let formValid = username.length > 0 && password.length > 0;

  const handleUsernameChange = event => {
    setUsername(event.target.value);
    if (!event.target.value) {
      setUsernameError('Username is required');
    } else {
      setUsernameError('');
    }
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value);
    if (!event.target.value) {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }
  }

  const handleSubmit = async event => {
    event.preventDefault();

    const formData = {
      "username": username,
      "password": password
    }

    axios({
      url: "http://localhost:8080/user/login",
      method: "POST",
      data: formData
    })
      .then(function (response){
        console.log(response);
      })
      .catch(function (error){
        console.log(error);
      })
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <Container component="main" maxWidth="xs"> */}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '100%',
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
            <TextField
              error={usernameError ? true : false}
              helperText={usernameError}
              margin="dense"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={handleUsernameChange}
              autoFocus
              // size="small"
            />
            <TextField
              error={passwordError ? true : false}
              helperText={passwordError}
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handlePasswordChange}
              autoComplete="current-password"
              // size="small"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
              disabled={!formValid}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 3, mb: 3  }} />
      {/* </Container> */}
    </ThemeProvider>
  );
}

export default LoginForm;