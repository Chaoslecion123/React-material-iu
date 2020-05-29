import React,{useState, useEffect} from 'react';
import { Container, Typography, Grid, TextField,Button} from '@material-ui/core';
import fotoReact from '../../logo.svg';
import useAuth from '../../hooks/useAuth';
import {getAccessTokenApi} from '../../api/auth.js';
import {updateUserApi} from '../../api/user';
import { useSnackbar } from 'notistack';
import Avatar from '@material-ui/core/Avatar';



const style = {
    paper: {
      marginTop: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    form: {
      width: "100%",
      marginTop: 20
    },
    submit: {
      marginTop: 15,
      marginBottom: 20
    }, 
    avatar : {
      margin: 10,
      width : 100,
      height: 100
  
    }
  };

const PerfilUsuario = () => {
    let [estado,cambiarEstado] = useState({
        nombres:"",
        apellidos:"",
        email:"",
        telefono:"",
        id:""
    })

    const {user} = useAuth();
    console.log(user)
    const { enqueueSnackbar } = useSnackbar();

    const cambiarDato = e => {
        const {name, value} = e.target;
        cambiarEstado(prev => ({
            ...prev,
            [name] : value
        }))
    }

    const validarEstadoFormulario = user =>{
        if(user){
          cambiarEstado(user);
        }
       }

    useEffect(()=>{
        if(estado.id === ""){
            validarEstadoFormulario(user);
        }
    });

    const guardarCambios = e => {
        e.preventDefault();
        console.log(estado)
        const token = getAccessTokenApi();
        let userUpdate = estado;

        if(!userUpdate.nombres || !userUpdate.apellidos || !userUpdate.email || !userUpdate.telefono){
            enqueueSnackbar("todos los campos son obligatorios",{variant:'warning',anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
            },});
            return null;
        }

        updateUserApi(token,userUpdate,estado.id).then(result=>{
            enqueueSnackbar(result.message,{variant:'success',anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
            },});
        })
    }

    return(
        <Container maxWidth="md">
            <div style={style.paper}>
                <Avatar style={style.avatar} src={fotoReact} />
                <Typography>
                    Perfil de la cuenta
                </Typography>
                <form style={style.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                name="nombres"
                                variant="outlined"
                                fullWidth
                                label="Nombre"
                                value={estado.nombres || ''}
                                onChange={cambiarDato}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="apellidos"
                                variant="outlined"
                                fullWidth
                                label="Apellidos"
                                value={estado.apellidos || ''}
                                onChange={cambiarDato}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <TextField
                            name="email"
                            variant="outlined"
                            fullWidth
                            label="E-Mail"
                            value={estado.email || ''}
                            onChange={cambiarDato}
                        />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="telefono"
                                variant="outlined"
                                fullWidth
                                label="Telefono"
                                value={estado.telefono  || ''}
                                onChange={cambiarDato}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item xs={12} md={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                color="primary"
                                style={style.submit}
                                onClick={guardarCambios}
                            >
                                Guardar Cambios
                            </Button>
                        </Grid>
                </Grid>
                </form>
            </div>
        </Container>
    )
}

export default PerfilUsuario;