import { Button, Grid, IconButton, Link, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TitlePage from '../components/TitlePage';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectAll } from '../store/modules/registerSlice';
import AlertFeedback from '../components/AlertFeedback';
import { createUserLogged } from '../store/modules/userLoggedSlice';
import { setAllErrands } from '../store/modules/errandsSlice';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');
  const [feedBack, setFeedback] = useState<'success' | 'error'>('success');

  const [valid, setValid] = useState<boolean>(false);
  const registerRedux = useAppSelector(selectAll);

  useEffect(() => {
    if (email.length < 4 || password.length < 4) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [email, password]);

  const goHome = () => {
    const findUser = registerRedux.find(item => {
      return item.email === email && item.password === password;
    });
    if (findUser) {
      dispatch(createUserLogged({ name: findUser.name, email: findUser.email }));
      dispatch(setAllErrands(findUser ? findUser.errands : []));
      navigate(`/home/${findUser.email}`);
    } else {
      setFeedback('error');
      setMsg('Usuário ou senha inválida!');
      setOpenAlert(true);
    }
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
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="email"
          id="email-login"
          label="Digite seu e-mail"
          variant="outlined"
          color="secondary"
          onChange={event => setEmail(event.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="password"
          id="password"
          label="Digite sua senha"
          variant="outlined"
          color="secondary"
          onChange={event => setPassword(event.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          size="large"
          sx={{ paddingX: '80px' }}
          color="primary"
          disabled={valid}
          onClick={goHome}
        >
          Entrar
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Link href="#" variant="body1" color="secondary">
          Esqueceu sua senha?
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" size="small" color="secondary" onClick={() => navigate('/register')}>
          Criar Conta
        </Button>
      </Grid>
      <AlertFeedback open={openAlert} close={() => setOpenAlert(false)} msg={msg} feedback={feedBack} />
    </Grid>
  );
};

export default Login;
