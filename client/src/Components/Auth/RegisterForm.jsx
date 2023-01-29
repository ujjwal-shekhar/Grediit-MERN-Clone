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
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


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

const contactNumberRegex = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const theme = createTheme();

const RegisterForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [contactNumber, setContactNumber] = React.useState('');

  const [emailError, setEmailError] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(null);
  const [usernameError, setUsernameError] = React.useState(null);
  const [firstNameError, setFirstNameError] = React.useState(null);
  const [lastNameError, setLastNameError] = React.useState(null);
  const [ageError, setAgeError] = React.useState(null);
  const [contactNumberError, setContactNumberError] = React.useState(null);

  let formValid = (
    (email.length > 0) &&
    (password.length > 0) &&
    (username.length > 0) &&
    (firstName.length > 0) &&
    (lastName.length > 0) &&
    (age.length > 0) &&
    (contactNumber.length > 0)
  );

  const handleUsernameChange = event => {
    setUsername(event.target.value);
    if (!event.target.value) {
      setUsernameError('Username is required');
    }
  }

  const handleEmailChange = event => {
    let checkEmail = event.target.value;
    if (!emailRegex.test(checkEmail)) {
      setEmail('')
      setEmailError('Email is Invalid');
    } else {
      setEmail(event.target.value);
      setEmailError(null);
    }
  }

  const handleFirstNameChange = event => {
    setFirstName(event.target.value);
    if (!event.target.value) {
      setFirstNameError('First Name is required');
    }
  }

  const handleLastNameChange = event => {
    setLastName(event.target.value);
    if (!event.target.value) {
      setLastNameError('Last Name is required');
    }
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value);
    if (!event.target.value) {
      setPasswordError('Password is required');
    }
  }

  const handleAgeChange = event => {
    if (!event.target.value) {
      setAge('');
      setAgeError('Age is required');
    } else if (event.target.value < 13) {
      setAge('');
      setAgeError('Age must be greater than 13');
    } else if (event.target.value > 120) {
      setAge('');
      setAgeError('Age must be less than 120');
    } else {
      setAge(event.target.value);
      setAgeError(null);
    }
  }

  const handleContactNumberChange = event => {
    if (!event.target.value) {
      setContactNumber('');
      setContactNumberError('Contact Number is required');
    } else if (event.target.value.length !== 10) {
      let tempNumber = event.target.value;  
         if (!contactNumberRegex.test(tempNumber)) {
          setContactNumber('');
          setContactNumberError('Contact Number is invalid');
        } else {
          const extractedNumber = tempNumber.match(/\d+/g).join('').slice(-10);
          let extractedRegex = /^[6-9]\d{9}$/;
          if (!extractedRegex.test(extractedNumber) || extractedNumber.length !== 10) {
            setContactNumber('');
            setContactNumberError('Contact Number is invalid');
          } else {
            setContactNumber(extractedNumber);
            setContactNumberError(null);
          }
        }
    } else {
      setContactNumber(event.target.value);
      setContactNumberError(null);
    }
    // console.log((contactNumberRegex.test(contactNumber)));
    // console.log(contactNumber)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          {/* <Typography component="h1" variant="h5">
            Sign up
          </Typography> */}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleFirstNameChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleLastNameChange}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  type="username"
                  id="username"
                  autoComplete="lite"
                  onChange={handleUsernameChange}
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  required
                  fullWidth
                  name="contactnumber"
                  label="Contact Number"
                  type="tel"
                  id="contactnumber"
                  autoComplete="123456789"
                  onChange={handleContactNumberChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  name="age"
                  label="Age"
                  type="age"
                  id="age"
                  autoComplete="13"
                  onChange={handleAgeChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!formValid}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      {/* </Container> */}
    </ThemeProvider>
  );
}

export default RegisterForm;