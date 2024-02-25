import { useEffect, useState } from 'react';
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
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import useAppauth from '../../hooks/useAppAuth';

import { useTranslation } from 'react-i18next';

function MaraAppBar() {

  const { t } = useTranslation();

  const pages = [
    {name: 'Menu', description: t('Menu')},
    {name: 'Orders', description: t('Orders')}, 
    {name: 'Customers', description: t('Customers')},
    {name: 'Reports', description: t('Reports')},
  ];

  const settings = [
    {name: 'Logout', description: t('Logout')}
  ];


  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [selected, setSelected] = useState(pages[0]);
  const [appAuth, setAppAuth] = useAppauth();

  const location = useLocation();

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

  const onClickMenuItem = (page) => {
    setSelected(page);
    handleCloseNavMenu();
  };

  const onClickSettingsItem = (page) => {

    if(page === 'Logout') {
      setAppAuth({});
    }

    handleCloseUserMenu();
  };

  useEffect(() => {
    
    const path = location.pathname.split('/')[1];
    
    //capitalize the first letter
    setSelected(path.charAt(0).toUpperCase() + path.slice(1));

  }, []);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} display={appAuth && appAuth.token} >
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
                display: (appAuth && appAuth.token)  ? { xs: 'block', md: 'none' } : "none",
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.name} 
                  onClick={() => onClickMenuItem(page)}
                  component={ReactRouterLink}
                  to={`/${page.name.toLowerCase()}`}
                >
                  <Typography textAlign="center">{page.description}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
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
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: (appAuth && appAuth.token) ? { xs: 'none', md: 'flex' } : "none" }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => onClickMenuItem(page.name)}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block', 
                  textDecoration: (selected === page ? 'underline' : 'none'), 
                  textUnderlineOffset: 3,
                  textDecorationThickness: 1.5,
                }}
                component={ReactRouterLink}
                to={`/${page.name.toLowerCase()}`}
              >
                {page.description}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: (appAuth && appAuth.token) ? "flex" : "none" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {<Avatar />}
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
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={() => {onClickSettingsItem(setting.name)}}>
                  <Typography textAlign="center">{setting.description}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MaraAppBar;
