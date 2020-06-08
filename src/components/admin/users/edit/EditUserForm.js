import React,{useState, useCallback,useEffect} from 'react';
import { Container, Typography, Grid, TextField,Button} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import fotoReact from '../../../../logo.svg';
import {useDropzone} from 'react-dropzone';
import NoAvatar from '../../../../assets/img/png/NoAvatar.png';
import {getAvatarApi,updateUserApi,uploadAvatarApi} from '../../../../api/user';
import {getAccessTokenApi} from '../../../../api/auth';
import { useSnackbar } from 'notistack';



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


const EditUserForm = (props) => {
    const {user,setIsVisibleModal,setReloadUsers} = props;
    const [avatar,setAvatar] = useState(null);
    const [userData,setUserData] = useState({})
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        setUserData({
            id:user._id,
            nombres: user.nombres,
            apellidos: user.apellidos,
            email: user.email,
            telefono: user.telefono,
            avatar: user.avatar
        });
      }, [user]);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
            setAvatar(response);
            });
        } else {
            setAvatar(null);
        }
    }, [user]);

    useEffect(() => {
        if (avatar) {
          setUserData({ ...userData, avatar: avatar.file });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [avatar]);

    
    const updateUser = e => {
        e.preventDefault();
        const token = getAccessTokenApi();
        const userUpdate = userData;

        
        if (userUpdate.password || userUpdate.repeatPassword) {
            if (userUpdate.password !== userUpdate.repeatPassword) {
                enqueueSnackbar("Las contraseñas tienen que ser iguales",{variant:'error',anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },});
              return;
            } else {
              delete userUpdate.repeatPassword;
            }
          }
      
        if (!userUpdate.nombres || !userUpdate.apellidos || !userUpdate.email || !userUpdate.telefono) {
            enqueueSnackbar( "El nombre, apellidos, telefono y email son obligatorios.",{variant:'error',anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
            },});
            return;
        }
        if (typeof userUpdate.avatar === "object") {
            uploadAvatarApi(token, userUpdate.avatar, user._id).then(response => {
              userUpdate.avatar = response.avatarName;
              updateUserApi(token, userUpdate, user._id).then(result => {
                enqueueSnackbar( result.message ,{variant:'success',anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },});
                setIsVisibleModal(false);
                setReloadUsers(true);
              });
            });
          } else {
            updateUserApi(token, userUpdate, user._id).then(result => {
                enqueueSnackbar( result.message ,{variant:'success',anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },});
                setIsVisibleModal(false);
                setReloadUsers(true);
            });
          }
    };
    

    return(
        <div>
            <Container maxWidth="md">
            <div style={style.paper}>
                <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
                <Typography>
                    Perfil de la cuenta
                </Typography>
                <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser} />
            </div>
        </Container>

        </div>    
    );
}


function EditForm(props) {
    const {userData,setUserData,updateUser} = props;
    console.log(props)

    const cambiarDato = e => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    return(
        <form style={style.form} onSubmit={updateUser}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        name="nombres"
                        variant="outlined"
                        fullWidth
                        label="Nombre"
                        value={userData.nombres}
                        onChange={cambiarDato}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name="apellidos"
                        variant="outlined"
                        fullWidth
                        label="Apellidos"
                        value={userData.apellidos}
                        onChange={cambiarDato}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                    name="email"
                    variant="outlined"
                    fullWidth
                    label="E-Mail"
                    value={userData.email}
                    onChange={cambiarDato}
                />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name="telefono"
                        variant="outlined"
                        fullWidth
                        label="Telefono"
                        value={userData.telefono}
                        onChange={cambiarDato}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField 
                        name="password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        label="Ingrese su password"
                        onChange={cambiarDato}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField 
                        name="repeatPassword"
                        variant="outlined"
                        fullWidth
                        type="password"
                        label="repite su password"
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
                        //onClick={guardarCambios}
                    >
                        Guardar Cambios
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
    
}

function UploadAvatar(props) {
    const { avatar, setAvatar } = props;
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        if (avatar) {
            if (avatar.preview) {
                setAvatarUrl(avatar.preview);
            } else {
                setAvatarUrl(avatar);
            }
        } else {
        setAvatarUrl(null);
        }
    }, [avatar]);
    
    const onDrop = useCallback(
        acceptedFiles => {
          const file = acceptedFiles[0];
          setAvatar({ file, preview: URL.createObjectURL(file) });
        },
        [setAvatar]
      );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
      });

    return (
        <div  {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Avatar style={style.avatar} src={NoAvatar} />
            ):(
                <Avatar  style={style.avatar} size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
            )}

        </div>
    )
}

export default EditUserForm;