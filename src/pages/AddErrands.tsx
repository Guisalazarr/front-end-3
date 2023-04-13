import { Alert, Button, Grid, Snackbar, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import generateId from '../utils/generateId';
import ErrandsType from '../types/ErrandsType';
import TitlePage from '../components/TitlePage';
import { useAppDispatch } from '../store/hooks';
import { addErrands } from '../store/modules/errandsSlice';

const AddErrands: React.FC = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);

  const [description, setDescription] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (title.length) {
      if (title.length < 3) {
        setTitleError(true);
        setValid(true);
      } else {
        setTitleError(false);
      }
    } else {
      setTitleError(false);
      setValid(false);
    }
  }, [title]);

  useEffect(() => {
    if (description.length) {
      if (description.length < 5) {
        setDescriptionError(true);
      } else {
        setDescriptionError(false);
      }
    } else {
      setDescriptionError(false);
    }
  }, [description]);

  const handleAdd = () => {
    const errands: ErrandsType = { id: generateId(), description, title };

    dispatch(addErrands(errands));
    setOpen(true);

    handleClear();
  };

  const handleClear = () => {
    setTitle('');
    setDescription('');
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={4}>
        <TitlePage title="Adicione um novo recado" />
        <Grid item xs={12}>
          <TextField
            value={title}
            error={titleError}
            helperText={titleError ? 'Digite um título válido, no mínimo 3 caracteres.' : ''}
            onChange={event => setTitle(event.target.value)}
            fullWidth
            id="title"
            label="Digite um título"
            variant="outlined"
            color="secondary"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={description}
            error={descriptionError}
            helperText={descriptionError ? 'Digite uma descrição válida, no mínimo 5 caracteres.' : ''}
            onChange={event => setDescription(event.target.value)}
            fullWidth
            id="description"
            label="Digite uma descrição"
            variant="outlined"
            color="secondary"
          />
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth onClick={handleClear} variant="outlined" sx={{ height: '50px' }}>
            Limpar
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={handleAdd}
            disabled={titleError || descriptionError || !valid}
            fullWidth
            variant="contained"
            sx={{ height: '50px' }}
          >
            Cadastrar
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" variant="filled">
          Recado cadastrado com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddErrands;
