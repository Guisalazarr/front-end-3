import React from 'react';
import { Button, Grid, TextField } from '@mui/material';
import TitlePage from '../components/TitlePage';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();

  const linkToLogin = () => {
    navigate('/login');
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TitlePage title={'Criar Conta'}></TitlePage>
        </Grid>
        <Grid item xs={12} color="secondary">
          <TextField fullWidth type="email" id="email-login" label="E-mail" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth type="password" id="password" label="Senha" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth type="password" id="repeat-password" label="Repita a senha" variant="outlined" />
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" color="secondary" size="large" onClick={linkToLogin}>
            <KeyboardReturnIcon sx={{ marginRight: '5px' }} /> Login
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" size="large">
            Cadastre-se
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Index;
