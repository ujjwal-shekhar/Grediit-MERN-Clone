import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Login Form component
import LoginForm from './LoginForm';

// Register Form component
import RegisterForm from './RegisterForm';

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

export default function LoginRegisterForm() {

    const [value, setValue] = React.useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container component="main" maxWidth="xs">
            <TabContext value={value}>
                <Box sx={{
                    borderBottom: 1,
                    borderColor: "divider"
                }}>
                    <TabList onChange={handleChange}>
                        <Tab
                            label="Log In" value="1" />
                        <Tab
                            label="Sign Up" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <LoginForm />
                </TabPanel>
                <TabPanel value="2">
                    <RegisterForm />
                </TabPanel>
            </TabContext>
        </Container>
        // <LoginForm />
        // <TabContext value={value}>
        //     <Box sx={{
        //         borderBottom: 1,
        //         borderColor: "divider"
        //     }}>
        //         <TabList onChange={handleChange}>
        //             <Tab
        //                 label="Log In" value="1" />
        //             <Tab
        //                 label="Sign Up" value="2" />
        //         </TabList>
        //     </Box>
        //     <TabPanel value="1">
        //         <LoginForm />
        //     </TabPanel>
        //     <TabPanel value="2">
        //         <RegisterForm />
        //     </TabPanel>
        // </TabContext>
    );
}