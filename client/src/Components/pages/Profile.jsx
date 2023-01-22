import { Grid, Container, Box } from '@material-ui/core';
import * as React from 'react';

import ProfileCard from '../Dashboard/Profile/ProfileCard.jsx';

export default function Profile() {
    const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        image: 'https://via.placeholder.com/150',
        bio: 'I am a software developer and enjoy working on projects that make a positive impact.',
        phone: '+1234567890',
        location: 'New York City'
      };
      
    return (
        <Grid>
            <ProfileCard user={user}/>
        </Grid>
    );
} 