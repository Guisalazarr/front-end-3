import React, { useEffect, useMemo, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Alert, IconButton, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ErrandsType from '../types/ErrandsType';
import { useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import DialogConfirm from './DaialogConfirm';
import { removeErrands } from '../store/modules/errandsSlice';

interface ListErrandsProps {
  data: ErrandsType[];
}

const ListErrands: React.FC<ListErrandsProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [dataLocal, setDataLocal] = useState<ErrandsType[]>([]);
  const [idDelete, setIdDelete] = useState<number>(0);

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogItem, setdialogItem] = useState<ErrandsType>();

  useEffect(() => {
    setDataLocal([...data]);
  }, [data]);

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
    setOpenAlert(true);
  };

  const listMemo = useMemo(() => {
    return dataLocal.map((item, index) => {
      return (
        <React.Fragment key={item.id}>
          <ListItem
            sx={{ maxWidth: '100%', bgcolor: 'background.paper', padding: '1rem' }}
            disableGutters
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  sx={{ marginRight: '10px' }}
                  onClick={() => handleEdit(item)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton aria-label="comment" onClick={() => confirmDelete(item)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemAvatar sx={{ display: 'inline' }}>
              <Avatar>{index + 1}</Avatar>
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
  }, [dataLocal]);

  return (
    <>
      <List>{dataLocal.length ? listMemo : <Typography variant="body1">Nenhum recado cadastrado.</Typography>}</List>

      <Snackbar
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled">
          Recado excluído com sucesso!
        </Alert>
      </Snackbar>

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
