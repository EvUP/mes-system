import React from 'react';
import { LoginForm } from '../../entities/user';
import { Container, Paper, Typography } from '@mui/material';
import Style from './Style.module.css';
export default function LoginPage(): React.JSX.Element {
  return (
    <Container className={Style.loginContainer} maxWidth="sm">
      <Paper className={Style.formContainer} sx={{ p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Вход в систему
        </Typography>
        <LoginForm />
      </Paper>
    </Container>
  );
}
