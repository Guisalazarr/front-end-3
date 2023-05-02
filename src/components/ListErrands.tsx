import React, { useEffect, useMemo, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ErrandsType from '../types/ErrandsType';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import DialogConfirm from './DaialogConfirm';
import { removeErrands, selectAll } from '../store/modules/errandsSlice';
import { selectAllRegister, updateRegister } from '../store/modules/registerSlice';
import { clearAlertSlice, createAlertSlice } from '../store/modules/alertslice';
import AlertFeedback from './AlertFeedback';

const ListErrands: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const errandsRedux = useAppSelector(selectAll);
  const registerRedux = useAppSelector(selectAllRegister);
  const userLoggedRedux = useAppSelector(state => state.userLogged);

  const findid = registerRedux.find(item => {
    return item.email === userLoggedRedux.email;
  });

  const [idDelete, setIdDelete] = useState<number>(0);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogItem, setdialogItem] = useState<ErrandsType>();

  useEffect(() => {
    const findid = registerRedux.find(item => {
      return item.email === userLoggedRedux.email;
    });
    const id = findid?.email;
    if (id) {
      dispatch(updateRegister({ id, changes: { errands: errandsRedux } }));
    }
  }, [errandsRedux]);

  const confirmDelete = (itemDelete: ErrandsType) => {
    setIdDelete(itemDelete.id);
    setOpenDialog(true);
    setdialogItem(itemDelete);
  };

  const handleEdit = (itemEdit: ErrandsType) => {
    navigate(`/edit-errands/${itemEdit.id}`);
  };

  const handleDelete = () => {
    dispatch(removeErrands(idDelete));
    setOpenDialog(false);
    dispatch(createAlertSlice({ open: true, msg: 'Recado deletado com sucesso!', feedback: 'success' }));
  };

  const clearAlert = () => {
    dispatch(clearAlertSlice());
  };

  const listMemo = useMemo(() => {
    return findid?.errands.map((item, index) => {
      return (
        <React.Fragment key={item.id}>
          <ListItem
            sx={{ maxWidth: '100%', padding: '1rem', borderRadius: '5px' }}
            disableGutters
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  sx={{ marginRight: '10px' }}
                  onClick={() => handleEdit(item)}
                >
                  <EditIcon color="secondary" />
                </IconButton>

                <IconButton aria-label="comment" onClick={() => confirmDelete(item)}>
                  <DeleteIcon color="primary" />
                </IconButton>
              </>
            }
          >
            <ListItemAvatar sx={{ display: 'inline' }}>
              <Avatar sx={{ bgcolor: '#044040', color: '#c4cbb7' }}>{index + 1}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Typography variant="h5">{item.title}</Typography>
                  <Typography variant="body2">{item.description}</Typography>
                </>
              }
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      );
    });
  }, [findid?.errands]);

  return (
    <>
      <List>{errandsRedux.length ? listMemo : <Typography variant="body1">Nenhum recado cadastrado.</Typography>}</List>

      <AlertFeedback close={() => clearAlert} />

      <DialogConfirm
        actionConfirm={handleDelete}
        actionCancel={() => setOpenDialog(false)}
        title="Deseja excluir este recado?"
        openDialog={openDialog}
        subtile={dialogItem ? dialogItem.title : ''}
        description={dialogItem ? dialogItem.description : ''}
      />
    </>
  );
};

export default ListErrands;
