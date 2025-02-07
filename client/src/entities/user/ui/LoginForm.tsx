import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useAppDispatch } from '../../../shared/lib/hooks';
import { loginThunk } from '../model/authThunks';

export default function LoginForm(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username); 
    formData.append('password', password);

    try {
      await dispatch(loginThunk(formData)).unwrap();
    } catch (err: unknown) {
      setError('Ошибка входа: неверный логин или пароль');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitHandler}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}
    >
      <Typography variant="h5" align="center">
        Вход в систему
      </Typography>

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

      <Button type="submit" variant="contained" color="primary">
        Войти
      </Button>
    </Box>
  );
}
