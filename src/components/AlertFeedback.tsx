import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../store/hooks';

interface AlertFeedbackProps {
  close: () => void;
}

const AlertFeedback: React.FC<AlertFeedbackProps> = ({ close }) => {
  const alertRedux = useAppSelector(state => state.alertSlice);

  return (
    <>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertRedux.open} onClose={close}>
        <Alert variant="filled" severity={alertRedux.feedback}>
          {alertRedux.msg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AlertFeedback;
