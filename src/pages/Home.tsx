import React, { useEffect } from 'react';
import Container from '@mui/material/Container/Container';
import TitlePage from '../components/TitlePage';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AlertFeedback from '../components/AlertFeedback';
import ListErrands from '../components/ListErrands';
import { clearAlertSlice, createAlertSlice } from '../store/modules/alertslice';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userLoggedRedux = useAppSelector(state => state.userLogged);

  useEffect(() => {
    if (!userLoggedRedux.email) {
      dispatch(createAlertSlice({ open: true, msg: 'Nenhum usuário logado!', feedback: 'error' }));

      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } else {
      clearAlert();
    }
  }, [userLoggedRedux]);

  const clearAlert = () => {
    dispatch(clearAlertSlice());
  };

  return (
    <>
      <Container>
        <Grid item xs={12}>
          <TitlePage title={'Lista de recados'} />
          <ListErrands />
        </Grid>
      </Container>
      <AlertFeedback close={clearAlert} />
    </>
  );
};

export default Home;
