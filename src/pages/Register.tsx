import React, { useEffect, useState } from 'react';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import TitlePage from '../components/TitlePage';
import { useNavigate } from 'react-router-dom';
import { addRegister, selectAllRegister } from '../store/modules/registerSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import AlertFeedback from '../components/AlertFeedback';
import { clearAlertSlice, createAlertSlice } from '../store/modules/alertslice';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const registerRedux = useAppSelector(selectAllRegister);
  const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    clearAlert();
  }, []);

  useEffect(() => {
    if (name.length < 3 || email.length < 4 || password.length < 4 || repeatPassword.length < 4) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [name, email, password, repeatPassword]);

  const handleClear = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRepeatPassword('');
  };

  const handleAdd = () => {
    const findUser = registerRedux.find(item => {
      return item.email === email;
    });

    if (!email || !email.match(validEmail)) {
      dispatch(createAlertSlice({ open: true, msg: 'Formato do e-mail inválido!', feedback: 'error' }));
    } else {
      if (!findUser) {
        if (password === repeatPassword) {
          dispatch(addRegister({ name, email, password, errands: [] }));
          dispatch(createAlertSlice({ open: true, msg: 'Usuário cadastrado com sucesso!', feedback: 'success' }));

          setTimeout(() => {
            navigate('/login');
          }, 1000);
        } else {
          dispatch(createAlertSlice({ open: true, msg: 'Senhas divergentes!', feedback: 'error' }));
        }
      } else {
        dispatch(createAlertSlice({ open: true, msg: 'Usuário já cadastrado!', feedback: 'error' }));
      }
    }
    handleClear();
  };

  const clearAlert = () => {
    dispatch(clearAlertSlice());
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TitlePage title={'CRIAR CONTA'}></TitlePage>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="text"
            id="name"
            label="Nome"
            variant="outlined"
            color="secondary"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="email"
            id="email-login"
            label="E-mail"
            variant="outlined"
            color="secondary"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="password"
            id="password"
            label="Senha"
            variant="outlined"
            color="secondary"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="password"
            id="repeat-password"
            label="Repita a senha"
            variant="outlined"
            color="secondary"
            value={repeatPassword}
            onChange={event => setRepeatPassword(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" size="large" onClick={handleAdd} disabled={valid}>
            Cadastre-se
          </Button>
          <Grid item xs={12} sx={{ marginTop: '10px' }}>
            <Link color="secondary" style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>
              <Typography variant="body2" color="black">
                JÁ TENHO CONTA
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <AlertFeedback close={clearAlert} />
      </Grid>
    </>
  );
};

export default Index;
