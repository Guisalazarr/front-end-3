import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography
} from '@mui/material';
import React from 'react';

interface DialogConfirmProps {
  title: string;
  subtile: string;
  description: string;
  openDialog: boolean;
  actionCancel: () => void;
  actionConfirm: () => void;
}

const DialogConfirm: React.FC<DialogConfirmProps> = ({
  title,
  openDialog,
  subtile,
  description,
  actionCancel,
  actionConfirm
}) => {
  return (
    <Grid container>
      <Dialog
        open={openDialog}
        onClose={actionCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Grid item xs={12}>
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        </Grid>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <>
              <Grid item xs={12}>
                <Typography variant="h4">{subtile}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">{description}</Typography>
              </Grid>
            </>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Grid item xs={6}>
            <Button variant="outlined" onClick={actionCancel} color="secondary">
              Cancelar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" onClick={actionConfirm} autoFocus>
              Confirmar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default DialogConfirm;
