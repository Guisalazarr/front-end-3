import React from 'react';

import Container from '@mui/material/Container/Container';
import TitlePage from '../components/TitlePage';
import ListErrands from '../components/ListErrands';
import { useAppSelector } from '../store/hooks';
import { Grid } from '@mui/material';
import { selectAll } from '../store/modules/errandsSlice';

const Home: React.FC = () => {
  const ErrandsRedux = useAppSelector(selectAll);

  return (
    <>
      <Container sx={{ marginBottom: '20px', marginTop: '20px' }}>
        <TitlePage title={'Lista de recados'} />

        <Grid item xs={12} sx={{ marginBottom: '20px', marginTop: '20px' }}>
          <ListErrands data={ErrandsRedux} />
        </Grid>
      </Container>
    </>
  );
};

export default Home;
