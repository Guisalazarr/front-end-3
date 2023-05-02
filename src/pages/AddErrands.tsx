import { Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import generateId from '../utils/generateId';
import TitlePage from '../components/TitlePage';
import { addErrands, updateErrands, selectById } from '../store/modules/errandsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import AlertFeedback from '../components/AlertFeedback';
import { clearAlertSlice, createAlertSlice } from '../store/modules/alertslice';

const AddErrands: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const userLoggedRedux = useAppSelector(state => state.userLogged);
  const errandsRedux = useAppSelector(state => selectById(state, id || ''));

  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);

  const [description, setDescription] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<boolean>(false);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);

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

  useEffect(() => {
    if (errandsRedux) {
      setTitle(errandsRedux.title);
      setDescription(errandsRedux.description);
      setIsEdit(true);
    }
  }, [errandsRedux]);

  useEffect(() => {
    if (title.length) {
      if (isEdit) {
        setValid(true);
      }
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

  const handleClear = () => {
    setTitle('');
    setDescription('');
  };

  const handleEdit = () => {
    if (id) {
      dispatch(updateErrands({ id, changes: { title, description } }));
      handleClear();
      dispatch(createAlertSlice({ open: true, msg: 'Recado editado com sucesso!', feedback: 'success' }));
      setIsEdit(false);
    }
  };

  const handleAdd = () => {
    if (isEdit) {
      handleEdit();
    } else {
      dispatch(addErrands({ id: generateId(), title, description }));
      dispatch(createAlertSlice({ open: true, msg: 'Recado cadastrado com sucesso!', feedback: 'success' }));
    }
    handleClear();
    setTimeout(() => {
      navigate('/home');
    }, 1000);
  };

  const clearAlert = () => {
    dispatch(clearAlertSlice());
  };

  return (
    <>
      <Grid container spacing={1}>
        <TitlePage title={isEdit ? 'Edite o recado' : 'Cadastre um novo recado'} />

        <Grid item xs={12}>
          <TextField
            sx={{ my: '10px' }}
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
            sx={{ my: '10px' }}
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
        <Grid item xs={12}>
          <Button
            onClick={handleAdd}
            disabled={titleError || descriptionError || !valid}
            fullWidth
            variant="contained"
            sx={{ height: '50px' }}
          >
            {isEdit ? 'Editar' : 'Cadastrar'}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth onClick={handleClear} color="secondary" variant="contained" sx={{ height: '50px' }}>
            Limpar
          </Button>
        </Grid>
        <AlertFeedback close={clearAlert} />
      </Grid>
    </>
  );
};

export default AddErrands;
