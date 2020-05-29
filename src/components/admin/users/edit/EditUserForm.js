import React,{useState, useCallback,useEffect} from 'react';
import { Container, Typography, Grid, TextField,Button} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import fotoReact from '../../../../logo.svg';
import {useDropzone} from 'react-dropzone';
import NoAvatar from '../../../../assets/img/png/NoAvatar.png';

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
    const {user} = props;
    console.log(user)
    const [avatar,setAvatar] = useState(null);
    const [userData,setUserData] = useState({})

    useEffect(() => {
        setUserData({
          nombres: user.nombres,
          apellidos: user.apellidos,
          email: user.email,
          telefono: user.telefono,
          //avatar: user.avatar
        });
      }, [user]);

    

    const updateUser = e => {
        e.preventDefault();
        console.log(userData)
    }

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

    return(
        <form style={style.form}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField 
                        name="nombres"
                        variant="outlined"
                        fullWidth
                        label="Nombre"
                        value={userData.nombres}
                        onChange={e => setUserData({ ...userData, name: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name="apellidos"
                        variant="outlined"
                        fullWidth
                        label="Apellidos"
                        value={userData.apellidos}
                        onChange={e => setUserData({ ...userData, name: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                    name="email"
                    variant="outlined"
                    fullWidth
                    label="E-Mail"
                    value={userData.email}
                    onChange={e => setUserData({ ...userData, name: e.target.value })}
                />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name="telefono"
                        variant="outlined"
                        fullWidth
                        label="Telefono"
                        value={userData.telefono}
                        onChange={e => setUserData({ ...userData, name: e.target.value })}
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
                <Avatar style={style.avatar} src={avatar ? avatar.preview: NoAvatar}   />
            )}

        </div>
    )
}

export default EditUserForm;