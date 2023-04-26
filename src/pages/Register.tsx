import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import TitlePage from '../components/TitlePage';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useNavigate } from 'react-router-dom';
import { addRegister, selectAll } from '../store/modules/registerSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import AlertFeedback from '../components/AlertFeedback';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const registerRedux = useAppSelector(selectAll);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');
  const [feedBack, setFeedback] = useState<'success' | 'error'>('success');

  const [valid, setValid] = useState<boolean>(false);

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

    if (!findUser) {
      if (password === repeatPassword) {
        dispatch(addRegister({ name, email, password, errands: [] }));
        setOpenAlert(true);
        setMsg('Usuário cadastrado com sucesso!');
        setFeedback('success');

        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        setOpenAlert(true);
        setFeedback('error');
        setMsg('Senhas divergentes!');
      }
    } else {
      handleClear();
      setOpenAlert(true);
      setFeedback('error');
      setMsg('Usuário já cadastrado');
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TitlePage title={'Criar Conta'}></TitlePage>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="text"
            id="name"
            label="Nome"
            variant="outlined"
            color="secondary"
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
            onChange={event => setRepeatPassword(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" color="secondary" size="large" onClick={() => navigate('/login')}>
            <KeyboardReturnIcon sx={{ marginRight: '5px' }} /> Login
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" size="large" onClick={handleAdd} disabled={valid}>
            Cadastre-se
          </Button>
        </Grid>
        <AlertFeedback open={openAlert} close={() => setOpenAlert(false)} msg={msg} feedback={feedBack} />
      </Grid>
    </>
  );
};

export default Index;
