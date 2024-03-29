import * as React from 'react';
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const LoginRegisterForm = ({ user, setUser }) => {

    const [value, setValue] = React.useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container component="main" maxWidth="xs">
            <TabContext value={value} >
                <Box textAlign="center">
                    <TabList onChange={handleChange} sx={{marginTop:1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Tab
                            label="Log In" value="1" style={{height: '30px'}} fullWidth/>
                        <Tab
                            label="Sign Up" value="2" style={{height: '30px'}} fullWidth/>
                    </TabList>
                
                <TabPanel value="1" fullwidth="true">
                    <LoginForm users={user} setUser={setUser}/>
                </TabPanel>
                <TabPanel value="2" fullwidth="true">
                    <RegisterForm />
                </TabPanel>
                </Box>
            </TabContext>
        </Container>
    );
}

export default LoginRegisterForm;