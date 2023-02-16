import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import Icon from '@mui/material/Icon';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import Person4Icon from '@mui/icons-material/Person4Rounded';
import HomeIcon from '@mui/icons-material/Home';
import RedditIcon from '@mui/icons-material/Reddit';
import axios from 'axios';

const pages_sg_mod = ['Users', 'Joining Requests', 'Stats', 'Reports'];
const pages_sg  = ['Home', 'My SubGreddiits', 'Logout'];
const pages_profile = ['Profile', 'Home', 'My SubGreddiits', 'Logout'];  
const settings = ['Profile', 'Home', 'My SubGreddiits', 'Logout'];
const pages = ['Profile Page', 'My SubGreddiits', 'Subgreddiits']

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const currPath = useLocation().pathname;
  const filteredSettings = settings.filter( setting => {
    return setting.toLowerCase() !== currPath.toLowerCase();
  });

  const test = () => {
    console.log(filteredSettings)
    console.log(pages)
    console.log(currPath.split('/')[0]);
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // console.log("Called logout")
    setUser('');
    localStorage.clear();
    handleCloseNavMenu();
  }
  const handleSubGreddiits = () => {
    navigate('/subgreddiits');
    handleCloseNavMenu();
  }
  const handleMySubGreddiits = () => {
    navigate('/subgreddiits/my');
    handleCloseNavMenu();
  }
  const handleProfile = () => {
    navigate('/profile');
    handleCloseNavMenu();
  }

  return (
    <AppBar position="static">
      {/* <button onClick={test} width={100}>Test</button> */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <PsychologyAltIcon />
          </Icon>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Greddiit
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Icon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <PsychologyAltIcon />
          </Icon>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Greddiit
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <IconButton onClick={handleProfile}>
              <Person4Icon sx={{color: 'white'}} />
              <Typography sx={{ my: 2, color: 'white', display: 'block' }}>Profile</Typography>
            </IconButton>
            <IconButton onClick={handleMySubGreddiits}>
              <HomeIcon sx={{color: 'white'}} />
              <Typography sx={{ my: 2, color: 'white', display: 'block' }}>My Subgreddiits</Typography>
            </IconButton>
            <IconButton onClick={handleSubGreddiits}>
              <RedditIcon sx={{color: 'white'}} />
              <Typography sx={{ my: 2, color: 'white', display: 'block' }}>Subgreddiits</Typography>
            </IconButton>
            {/* {pages.map((page) => (
              <IconButton>
              </IconButton>
              // <Button
              //   key={page}
              //   onClick={handleCloseNavMenu}
              //   sx={{ my: 2, color: 'white', display: 'block' }}
              // >
              //   {page}
              // </Button>
            ))} */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {filteredSettings.map((setting) => (
                <MenuItem key={setting} onClick={() => {
                  switch (setting) {
                    case 'Profile':
                      return handleProfile();
                    case 'SubGreddiits':
                      return handleSubGreddiits();
                    case 'My SubGreddiits':
                      return handleMySubGreddiits();
                    case 'Logout':
                      return handleLogout();
                    default:
                      return handleCloseUserMenu();
                  }
                }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;