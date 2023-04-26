import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface AlertProps {
  open: boolean;
  close: () => void;
  msg: string;
  feedback: 'error' | 'success';
}

const AlertFeedback: React.FC<AlertProps> = ({ open, close, msg, feedback }) => {
  return (
    <Snackbar open={open} onClose={close} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert severity={feedback} variant="filled">
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default AlertFeedback;
