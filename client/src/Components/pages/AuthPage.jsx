import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import authPageBackground from '../../utils/authPageBackground.jpg'

import LoginRegisterForm from '../Auth/LoginRegisterForm.jsx';

const theme = createTheme();

const AuthPage = ({ user, setUser }) => {
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={8}
                    md={8}
                    sx={{
                        backgroundImage: `url(${authPageBackground})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                    >
                    <LoginRegisterForm user={user} setUser={setUser}/>    
                    {/* <YourComponent /> */}
                </Box>
                    </Grid>

        </ThemeProvider>
    );
}

export default AuthPage;