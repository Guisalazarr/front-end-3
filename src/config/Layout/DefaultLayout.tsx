import { Container, Grid } from '@mui/material';
import React from 'react';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import BoxGrid from '../../components/BoxGrid';

interface DefaultLayoutProps {
  component: React.FC;
}

const alignCenter = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '2rem',
  marginBottom: '20px'
};

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ component: Component }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <ResponsiveAppBar />
      </Grid>

      <Grid item xs={12}>
        <Container sx={{ ...alignCenter }}>
          <BoxGrid>
            <Component />
          </BoxGrid>
        </Container>
      </Grid>
    </Grid>
  );
};

export default DefaultLayout;
