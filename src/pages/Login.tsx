import { Button, Grid, IconButton, Link, TextField } from '@mui/material';
import React from 'react';
import TitlePage from '../components/TitlePage';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const linkToRegister = () => {
    navigate('/register');
  };

  const linkToHome = () => {
    navigate('/home');
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TitlePage title={'Login'}></TitlePage>
      </Grid>
      <Grid item xs={4}>
        <IconButton aria-label="delete" size="large">
          <GoogleIcon fontSize="large" color="secondary" />
        </IconButton>
      </Grid>
      <Grid item xs={4}>
        <IconButton aria-label="delete" size="large">
          <FacebookIcon fontSize="large" color="secondary" />
        </IconButton>
      </Grid>
      <Grid item xs={4}>
        <IconButton aria-label="delete" size="large">
          <TwitterIcon fontSize="large" color="secondary" />
        </IconButton>
      </Grid>
      <Grid item xs={12} color="secondary">
        <TextField
          fullWidth
          type="email"
          id="email-login"
          label="Digite seu e-mail"
          variant="outlined"
          color="primary"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="password"
          id="password"
          label="Digite sua senha"
          variant="outlined"
          color="primary"
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" size="large" sx={{ paddingX: '80px' }} color="primary" onClick={linkToHome}>
          Entrar
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Link href="#" variant="body1" color="secondary">
          Esqueceu sua senha?
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" size="small" color="secondary" onClick={linkToRegister}>
          Criar Conta
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
