import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Tabs, Tab } from '@mui/material';


export default function Component ({ subgreddiitName }) {
    const navigate = useNavigate();
    const [valueVertical, setValueVertical] = React.useState('one');

    React.useEffect(() => {
        navigate(`/subgreddiits/${subgreddiitName}/mod/users`);
    }, [])

    const handleVerticalChange = (event, newValue) => {
        setValueVertical(newValue);
        if (newValue == 'one') {
          navigate(`/subgreddiits/${subgreddiitName}/mod/users`);
        } else if (newValue == 'two') {
            navigate(`/subgreddiits/${subgreddiitName}/mod/joining-requests`);
        } else if (newValue == 'three') {
            navigate(`/subgreddiits/${subgreddiitName}/mod/stats`);
        }
        else if (newValue == 'four') {
            navigate(`/subgreddiits/${subgreddiitName}/mod/reported-page`);
        }
                
      };

    return (
        <Box sx={{ bgcolor:'white', width: '250px', marginBottom: '5px' }}>
            <Tabs value={valueVertical} onChange={handleVerticalChange} aria-label="nav tabs example" orientation="vertical">
            <Tab label="Users" value='one'/>
            <Tab label="Joining Requests" value='two'/>
            <Tab label="Stats" value='three'/>
            <Tab label="Reported Page" value='four'/>
            </Tabs>
            {/* Routes here */}
        </Box>
    );
}