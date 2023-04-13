import { Grid } from '@mui/material';
import React from 'react';
import BoxGrid from '../../../components/BoxGrid';
import GridContainerLogin from './componets/GridContainerLogin';

interface LoginLayoutProps {
  component: React.FC;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ component: Component }) => {
  return (
    <GridContainerLogin container>
      <BoxGrid>
        <Grid item xs={12}>
          <Component />
        </Grid>
      </BoxGrid>
    </GridContainerLogin>
  );
};

export default LoginLayout;
