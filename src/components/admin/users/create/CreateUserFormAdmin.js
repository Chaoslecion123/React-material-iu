import React, { useState } from 'react';
import { Container, Typography, Avatar, Grid, TextField, Button } from '@material-ui/core';
import LockOutLineIcon from '@material-ui/icons/LockOutlined';
import {signUpAdminApi} from '../../../../api/user';
import {getAccessTokenApi} from '../../../../api/auth';
import { useSnackbar } from 'notistack';


const style = {
    paper: {
        display:"flex",
        flexDirection:"column",
        marginTop:8,
        alignItems:"center"
    },
    avatar: {
        margin:8,
        backgroundColor: "#e53935"
    },
    form: {
        width: "100%",
        marginTop: 10
    },
    submit:{
        marginTop: 15,
        marginBottom: 20
    }
}


const CreateUserFormAdmin = (props) => {
    const {setIsVisibleModal,setReloadUsers} = props;
    const [form,setForm] = useState({});
    const { enqueueSnackbar } = useSnackbar();


    const handleCancel = e => {
        e.preventDefault();
        setIsVisibleModal(false)
    }

    const handleInput = e => {
        setForm({
            ...form,
            [e.target.name]:e.target.value

        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(
            !form.nombres ||
            !form.apellidos ||
            !form.email ||
            !form.password 
        ){
            enqueueSnackbar("todos los campos son obligatorios",{variant:'error',anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
            },});
        }else {
            const accesToken = getAccessTokenApi();
            signUpAdminApi(accesToken,form)
                .then(response => {
                    enqueueSnackbar(response,{variant:'success',anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    },});
                    setIsVisibleModal(false);
                    setReloadUsers(true);
                    setForm({});
                })
                .catch(err => {
                    enqueueSnackbar(err,{variant:'error',anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    },}); 
                })
        }
    }

    return(
        <Container maxWidth="md">
            <div style={style.paper}>
               <Avatar style={style.avatar}>
                   <LockOutLineIcon />
               </Avatar>
               <Typography component="h1" variant="h6">
                   Crea un nuevo usuario
               </Typography>
               <form style={style.form} onSubmit={handleSubmit}>
                   <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                            <TextField
                                name="nombres"
                                label="Ingrese sus nombres"
                                fullWidth
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                name="apellidos"
                                label="Ingrese sus apellidos"
                                fullWidth
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                name="email"
                                type="email"
                                label="Ingrese su Email"
                                fullWidth
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                name="password"
                                type="password"
                                label="Ingrese su Contraseña"
                                fullWidth
                                onChange={handleInput}
                            />
                        </Grid>
                   </Grid>
                   <Grid container justify="center" spacing={2}>
                        <Grid item md={6} xs={12}>
                            <Button
                                color="blue"
                                variant="contained"
                                size="large"
                                fullWidth
                                style={style.submit}
                                onClick={handleCancel}
                            >
                                Cancelar
                            </Button>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Button
                                color="primary"
                                variant="contained"
                                size="large"
                                fullWidth
                                type="submit"
                                style={style.submit}
                            >
                                Crear
                            </Button>
                        </Grid>
                                    
                   </Grid>
               </form>
            </div>
        </Container>
    )
};

export default CreateUserFormAdmin;