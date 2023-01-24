import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
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
                    sx={{
                        backgroundImage: `url(${authPageBackground})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100vw'
                    }}
                    align="center"
                >
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Paper elevation={3} style={{ position: 'relative', zIndex: 1, margin:'auto' }}>
                            <LoginRegisterForm user={user} setUser={setUser}/> 
                        </Paper>
                    </Box>
                </Grid>
            </Grid>

        </ThemeProvider>
    );
}

export default AuthPage;