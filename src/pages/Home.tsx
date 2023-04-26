import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container/Container';
import TitlePage from '../components/TitlePage';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AlertFeedback from '../components/AlertFeedback';
import { selectById, updateRegister } from '../store/modules/registerSlice';
import ListErrands from '../components/ListErrands';
import { selectAll } from '../store/modules/errandsSlice';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const registerRedux = useAppSelector(state => selectById(state, id || ''));
  const userLoggedRedux = useAppSelector(state => state.userLogged);
  const errandsRedux = useAppSelector(selectAll);

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');
  const [feedBack, setFeedback] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (!userLoggedRedux.email) {
      setFeedback('error');
      setMsg('Nenhum usuário logado!');
      setOpenAlert(true);

      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  }, [userLoggedRedux]);

  useEffect(() => {
    if (id) {
      if (userLoggedRedux.email) {
        dispatch(updateRegister({ id, changes: { errands: errandsRedux } }));
      }
    }
  }, [errandsRedux]);

  return (
    <>
      <Container sx={{ marginBottom: '20px', marginTop: '20px' }}>
        <TitlePage title={'Lista de recados'} />

        <Grid item xs={12} sx={{ marginBottom: '20px', marginTop: '20px' }}>
          <ListErrands data={registerRedux ? registerRedux.errands : []} />
        </Grid>
      </Container>
      <AlertFeedback open={openAlert} close={() => setOpenAlert(false)} feedback={feedBack} msg={msg} />
    </>
  );
};

export default Home;
