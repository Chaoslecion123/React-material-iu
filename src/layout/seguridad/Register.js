import React, { useState } from 'react';
import {Container, Avatar, Typography, Grid, TextField, Button} from '@material-ui/core';
import LockOutLineIcon from '@material-ui/icons/LockOutlined';
import {register} from '../../api/user';
import { useSnackbar } from 'notistack';
import { Redirect } from "react-router-dom";
import {getAccessTokenApi } from '../../api/auth';

const style = {
    paper:{
        marginTop:8,
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    avatar:{
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

const Register = () => {
    const [form,setForm] = useState({})
    const { enqueueSnackbar } = useSnackbar();

    const handleInput = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e =>{
        e.preventDefault();
        const password = form.password;
        const repeatPassword = form.repeatPassword;
        const email = form.email;
        const nombres = form.nombres;
        const apellidos = form.apellidos;
        const telefono = form.telefono;

        if(!password || !repeatPassword || !email || !nombres || !apellidos || !telefono){
            enqueueSnackbar("todos los campos son obligatorios",{variant:'warning',anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
            },});
        }else{
            if (password !== repeatPassword) {
                enqueueSnackbar("las contraseñas no coinciden",{variant:'warning',anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },});
            }else {
                const result = await register(form);
                if(result.ok){
                    enqueueSnackbar(result.message,{variant:'success',anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    },});
/*                     setForm({
                        nombres:"",
                        apellidos:"",
                        email:"",
                        password:"",
                        repeatPassword:"",
                        telefono:""
                    }) */
        
                }else{
                    enqueueSnackbar(result.message,{variant:'error',anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    },});
        
                }

            }        
        }
    }
 
    if (getAccessTokenApi()) {
        return <Redirect to="/" />;
    }
    return(
        <Container maxWidth="md">
            <div style={style.paper}>
                <Avatar style={style.avatar}>
                    <LockOutLineIcon />
                </Avatar>
                <Typography component="h1" variant="h6">
                    Registre su Cuenta
                </Typography>
                <form style={style.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                            <TextField 
                                name="nombres"
                                fullWidth
                                label="Ingrese su nombre"
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField 
                                name="apellidos"
                                fullWidth
                                label="Ingrese su apellido"
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField 
                                name="password"
                                fullWidth
                                type="password"
                                label="Ingrese su password"
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField 
                                name="repeatPassword"
                                fullWidth
                                type="password"
                                label="repite su password"
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField 
                                name="email"
                                fullWidth
                                type="email"
                                label="ingrese su E-mail"
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField 
                                name="telefono"
                                fullWidth
                                label="ingrese su telefono"
                                onChange={handleInput}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item md={6} xs={12}>
                            <Button type="submit" variant="contained" fullWidth size="large" color="primary" style={style.submit}>
                                Registrar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                               
                           
            </div>             
        </Container>
        
    )
}

export default Register