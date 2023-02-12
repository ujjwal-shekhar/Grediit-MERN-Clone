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
import AdbIcon from '@mui/icons-material/Adb';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import Icon from '@mui/material/Icon';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const pages_sg_mod = ['Users', 'Joining Requests', 'Stats', 'Reports'];
const pages_sg  = ['Home', 'My SubGrediits', 'Logout'];
const pages_profile = ['Profile', 'Home', 'My SubGrediits', 'Logout'];  
const settings = ['Profile', 'Home', 'My SubGrediits', 'Logout'];

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [perms, setPerms] = React.useState(null);
  const [pages, setPages] = React.useState(null);

  let currPath = useLocation().pathname;
  console.log(user);
  console.log(currPath)
  React.useEffect(() => {
    let currPage = null;
    if (currPath === '/') {
      currPage = currPath.split('/')[1];
    } else {
      currPage = '/profile';
    }

    let currSubPage = null;
    if (currPath.split('/').length > 2){
      currSubPage = currPath.split('/')[2];
      if (currSubPage.length === 0) {
        currSubPage = "my";
      }
    }


    if (currPage == "subgreddiits") {
      // let currSG = currPath.split('/')[1];
      if (currSubPage !== "my") {
        axios.post("http://localhost:8080/subgreddiits/:" + currSubPage + "/perms", 
        JSON.stringify({
          "user": user 
        }), 
        {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization" : 'Bearer ' + localStorage.getItem('token')
        }
      })
      }
    } else if (currPage === "profile") {
      setPages(pages_profile);
    }
  }, [currPath]);

  // if (currComp == "subgreddiits") {
  //   let currSG = currPath.split('/')[1];
  //   if (!perms) {
  //     // axios({
  //     //   url
  //     // })
  //   }
  //   pages = (perms == "AUTH") ? pages_sg_mod : pages_sg;
  // } else if (currComp === "profile") {
  //   pages = pages_profile;
  // }

  // const pages = currPath.split('/')[0] == "subgreddiits" ?
  //              pages_sg : pages_profile;
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
  const handleHome = () => {
    
    handleCloseNavMenu();
  }
  const handleMySubGrediits = () => {
    
    handleCloseNavMenu();
  }
  const handleProfile = () => {
    navigate('/profile');
    handleCloseNavMenu();
  }

  if (!perms) {
    return (
      <h1>Loading...</h1>
    );
  }

  return (
    <AppBar position="static">
      <button onClick={test} width={100}>Test</button>
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
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
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
                    case 'Home':
                      return handleHome();
                    case 'My SubGrediits':
                      return handleMySubGrediits();
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