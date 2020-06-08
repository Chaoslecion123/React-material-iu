import React,{useState, useCallback,useEffect} from 'react';
import { Container, Typography, Grid, TextField,Button} from '@material-ui/core';
import {deleteUserApi} from '../../../../api/user';
import {getAccessTokenApi} from '../../../../api/auth';
import { useSnackbar } from 'notistack';

const style = {
    form: {
      width: "100%",
      marginTop: 20
    },
    submit: {
        marginTop: 15,
        marginBottom: 20,      
    }, 
};


const DeleteUserForm = (props) => {
    const {setIsVisibleModal,user, setReloadUsers} = props;
    const { enqueueSnackbar } = useSnackbar();


    const handleCancelar = (e) => {
        e.preventDefault();
        setIsVisibleModal(false);
    }

    const handleEliminar = (e) => {
        e.preventDefault();
        const accesToken = getAccessTokenApi();
        deleteUserApi(accesToken, user._id)
          .then(response => {
            enqueueSnackbar(response,{variant:'success',anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
            },});
            setIsVisibleModal(false);
            setReloadUsers(true);
          })
          .catch(err => {
            setIsVisibleModal(false);
            enqueueSnackbar(err,{variant:'error',anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
            },});
          });


    }

    return(
        <form>
            <Typography>
                ¿Deseas eliminar a {user.email}?
            </Typography>
            <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        color="dark"
                        style={style.submit}
                        onClick={handleCancelar}
                    >
                        Cancelar
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        color="primary"
                        style={style.submit}
                        onClick={handleEliminar}
                    >
                        Eliminar
                    </Button>
                </Grid>

            </Grid>
        </form>
    )
}

export default DeleteUserForm;