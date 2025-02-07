import React from 'react';
import LoginForm from '../../entities/user/ui/LoginForm';
import { Container, Paper, Typography } from '@mui/material';

export default function LoginPage(): React.JSX.Element {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3, mt: 5 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Вход в систему
        </Typography>
        <LoginForm />
      </Paper>
    </Container>
  );
}
