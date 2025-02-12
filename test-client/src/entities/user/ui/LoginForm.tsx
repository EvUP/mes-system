import { Alert, Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginThunk } from '../../../entities';
import { useAppDispatch } from '../../../shared';

export default function LoginForm(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await dispatch(loginThunk({ username, password })).unwrap();
      const { accessToken } = response;

      localStorage.setItem('accessToken', accessToken);
      navigate('/orders');
    } catch {
      setError('Ошибка входа: неверный логин или пароль');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitHandler}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}
    >
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Логин"
        name="username"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Пароль"
        name="password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ backgroundColor: '#334', '&:hover': { backgroundColor: '#115293' } }}
      >
        Войти
      </Button>
    </Box>
  );
}
