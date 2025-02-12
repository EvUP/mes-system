import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { logoutThunk } from '../../entities/user';
import Style from './Style.module.css';

export default function Layout(): React.JSX.Element {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className={Style.appContainer}>
      <AppBar position="static">
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
                <Button color="inherit" component={Link} to="/orders">
                  Заказы
                </Button>
                <Button color="inherit" component={Link} to="/equipment">
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
          <ListItem component={Link} to="/orders" onClick={handleDrawerToggle}>
            <ListItemText primary="Заказы" />
          </ListItem>
          <ListItem component={Link} to="/equipment" onClick={handleDrawerToggle}>
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
