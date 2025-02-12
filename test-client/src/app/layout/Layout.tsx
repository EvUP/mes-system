import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { logoutThunk } from '../../entities/user';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import Style from './Style.module.css';

export default function Layout(): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className={Style.appContainer}>
      <AppBar position="static" sx={{ backgroundColor: '#334' }}>
        <Toolbar className={Style.toolbar}>
          {user && (
            <Typography variant="h6" className={Style.userText}>
              <span className={Style.hideOnMobile}>Добро пожаловать, </span>
              {user.username}
            </Typography>
          )}

          <Box className={Style.desktopMenu}>
            {user && (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/orders"
                  sx={{
                    color: location.pathname === '/orders' ? '#FFD700' : 'inherit', 
                  }}
                >
                  Заказы
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/equipment"
                  sx={{
                    color: location.pathname === '/equipment' ? '#FFD700' : 'inherit',
                  }}
                >
                  Оборудование
                </Button>
                <Button
                  color="inherit"
                  onClick={() => dispatch(logoutThunk()).then(() => navigate('/login'))}
                >
                  Выйти
                </Button>
              </>
            )}
          </Box>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            className={Style.mobileMenuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem
            component={Link}
            to="/orders"
            onClick={handleDrawerToggle}
            sx={{
              backgroundColor: location.pathname === '/orders' ? '#FFD700' : 'transparent',
            }}
          >
            <ListItemText primary="Заказы" />
          </ListItem>
          <ListItem
            component={Link}
            to="/equipment"
            onClick={handleDrawerToggle}
            sx={{
              backgroundColor: location.pathname === '/equipment' ? '#FFD700' : 'transparent',
            }}
          >
            <ListItemText primary="Оборудование" />
          </ListItem>
          <ListItem onClick={() => dispatch(logoutThunk()).then(() => navigate('/login'))}>
            <ListItemText primary="Выйти" />
          </ListItem>
        </List>
      </Drawer>

      <Container className={Style.application} sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </div>
  );
}
