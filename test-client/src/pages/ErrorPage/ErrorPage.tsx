import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './Style.module.css';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box className={styles.container}>
      <img src="/error-illustration.svg" alt="Ошибка 404" className={styles.image} />

      <Typography variant="h4" className={styles.title}>
        Ой! Страница не найдена
      </Typography>
      <Typography variant="body1" className={styles.text}>
        Кажется, вы перешли по неверному адресу. Попробуйте вернуться назад или перейти на главную.
      </Typography>
      <Button
        variant="contained"
        className={styles.button}
        sx={{ mt: 3, backgroundColor: '#334' }}
        onClick={() => navigate('/login')}
      >
        Вернуться на главную
      </Button>
    </Box>
  );
};

export default ErrorPage;
