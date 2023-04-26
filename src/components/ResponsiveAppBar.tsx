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
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

import routes from '../routes/routes';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import HoverNavbarStled from './HoverNavbarStyled';
import { removeAllErrands } from '../store/modules/errandsSlice';
import { clearUserLogged } from '../store/modules/userLoggedSlice';

const settings = ['Sair'];

function ResponsiveAppBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userLoggedRedux = useAppSelector(state => state.userLogged);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (url: string) => {
    setAnchorElNav(null);
    navigate(url);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    navigate('/login');
    dispatch(clearUserLogged());
    dispatch(removeAllErrands());
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
                horizontal: 'left'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {routes.map(page => (
                <MenuItem key={page.url} onClick={() => handleCloseNavMenu(page.url)}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {routes.map(page => (
              <Button key={page.url} onClick={() => handleCloseNavMenu(`${page.url}/${userLoggedRedux.email}`)}>
                <HoverNavbarStled>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      letterSpacing: '.1rem'
                    }}
                  >
                    {page.label}
                  </Typography>
                </HoverNavbarStled>
              </Button>
            ))}
          </Box>
          <Typography
            variant="h5"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },

              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none'
            }}
          >
            {userLoggedRedux.name}
          </Typography>
          <Box sx={{ flexGrow: 0, marginRight: '10px' }}>
            <Tooltip title="Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar variant="rounded" sx={{ bgcolor: 'secondary' }}>
                  <HoverNavbarStled>
                    <PersonIcon />
                  </HoverNavbarStled>
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(setting => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Button onClick={logout} variant="contained" size="small" color="secondary">
                    {setting}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
