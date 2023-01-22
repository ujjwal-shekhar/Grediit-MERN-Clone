import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    card: {
      width: 281,
      margin: 'auto',
      height: '80vh',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main,
    },
  }));

const ProfileCard = ({ user }) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                <Avatar aria-label="user" className={classes.avatar}>
                    {user.name[0]}
                </Avatar>
                }
                title={user.name}
                subheader={user.email}
            />
            <CardMedia
                className={classes.media}
                image={user.image}
                title="User Profile"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                {user.bio}
                </Typography>
            </CardContent>
        </Card>
    );
} 

export default ProfileCard;