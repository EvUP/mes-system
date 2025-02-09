import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { logoutThunk } from '../../entities/user';
import Style from './Style.module.css';

export default function Layout(): React.JSX.Element {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  return (
    <div className={Style.appContainer}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {user ? `Добро пожаловать, ${user.username}` : 'MES-система'}
          </Typography>
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
        </Toolbar>
      </AppBar>
      <Container className={Style.application} sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </div>
  );
}
