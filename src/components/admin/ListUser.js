import React, { useState, useEffect } from 'react';
import { Switch,Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import fotoReact from '../../logo.svg';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import FormDialog from '../modal/Modal';
import EditUserForm from './users/edit/EditUserForm';
import DeleteUserForm from './users/delete/DeleteUserForm';
import {getAvatarApi,activateUserApi} from '../../api/user';
import {getAccessTokenApi} from '../../api/auth';
import { useSnackbar } from 'notistack';
import CreateUserFormAdmin from './users/create/CreateUserFormAdmin';


const style = {
  option : {
    display:"flex",
    flexDirection:"row",
    alignItems: "center"

  },
  cuadro: {
    width: "90%",
    marginTop: 20
  },
  submit: {
    marginTop: 5,
    marginBottom: 10
  }, 
}

const ListUser = (props) => { 
  const {usersActive,usersInactive,setReloadUsers} = props;
  const [viewUserActives,setViewUsersActives] = useState(true)
  const [isVisibleModal,setIsVisibleModal] = useState(false);
  const [modalTitle,setModalTitle] = useState("")
  const [modalContent,setModalContent] = useState(null);

  const handleNewUsuario = e => {
    e.preventDefault();
    setIsVisibleModal(true);
    setModalTitle('Creando nuevo usuario');
    setModalContent(<CreateUserFormAdmin setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers}/>); 
  }

  return(
        <div>
            <div style={style.option}>
              <div style={style.cuadro}>
                  <Switch
                      defaultChecked
                      onChange={()=>setViewUsersActives(!viewUserActives)}
                  />
                  <span>
                      {viewUserActives ? "Usuarios activos" : "Usuarios inactivos" }
                  </span>
              </div>
              <Button 
                style={style.submit} 
                size="small" 
                color="primary" 
                variant="contained"
                onClick={handleNewUsuario}
              >Nuevo usuario</Button>
            </div>           
            {viewUserActives ? 
              <UsersActive 
                usersActive={usersActive}
                setIsVisibleModal={setIsVisibleModal} 
                setModalTitle={setModalTitle}
                setModalContent={setModalContent}
                setReloadUsers={setReloadUsers}
              /> : 
              <UsersInactive 
                usersInactive={usersInactive}
                setIsVisibleModal={setIsVisibleModal} 
                setModalTitle={setModalTitle}
                setModalContent={setModalContent} 
                setReloadUsers={setReloadUsers}
              />
            }

            <FormDialog
              modalTitle={modalTitle}
              isVisibleModal={isVisibleModal}
              setIsVisibleModal={setIsVisibleModal}
              setReloadUsers={setReloadUsers}
              modalContent={modalContent}
            />       
            
        </div>
    );
}

function UsersActive(props){   

    const {usersActive,setIsVisibleModal,setModalTitle,setModalContent,setReloadUsers} = props;

    const editUser = user => {
      setIsVisibleModal(true);
      setModalTitle(`Editar ${user.nombres} ${user.apellidos}`);
      setModalContent(<EditUserForm user={user} setReloadUsers={setReloadUsers} setIsVisibleModal={setIsVisibleModal} />) 
    }

    const deleteUser = user => {
      setIsVisibleModal(true);
      setModalTitle('eliminando usuario');
      setModalContent(<DeleteUserForm setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} user={user} />)
    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    return(
      <TableContainer component={Paper}>
      <Table arial-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Nombres</TableCell>
            <TableCell>Apellidos</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Telefono</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { usersActive.users ? usersActive.users.map((user) =>(
            <UserActive 
              key={user._id}  
              user={user} 
              editUser={editUser} 
              deleteUser={deleteUser}
              setReloadUsers={setReloadUsers} 
            />
          )): null} 
        </TableBody>
      </Table>
    </TableContainer>
      
    )
}

function UserActive(props) {
  const {user,editUser,deleteUser,setReloadUsers} = props;
  const [avatar,setAvatar] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  // const [open, setOpen] = React.useState(false);


  useEffect(()=>{
    if(user.avatar){
      getAvatarApi(user.avatar).then(response=>{
        setAvatar(response);
      })
    }else {
      setAvatar(null);
    }
  },[user])

  const desactivateUser = () => {
    const accesToken = getAccessTokenApi();

    activateUserApi(accesToken, user._id, false)
      .then(response => {
        enqueueSnackbar(response,{variant:'success',anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },});
        setReloadUsers(true);
      })
      .catch(err => {
        enqueueSnackbar(err,{variant:'error',anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },});
      });
  };


// const deleteUser = () => {
//   const accesToken = getAccessTokenApi();
      
// }

  return(
    <TableRow key={user._id}>                  
      <TableCell align="left"><Avatar alt={user.nombres} src={avatar} /></TableCell>
      <TableCell align="left">{user.nombres}</TableCell>
      <TableCell align="left">{user.apellidos}</TableCell>
      <TableCell align="left">{user.email}</TableCell>
      <TableCell align="left">{user.telefono}</TableCell>
      <TableCell align="center">
        <Button onClick={() => {editUser(user)}}><EditIcon/></Button>
        <Button onClick={desactivateUser}><CancelIcon/></Button> 
        <Button onClick={() => {deleteUser(user)}}><DeleteIcon/></Button> 
      </TableCell>
    </TableRow>
    
    
  )
}

function UsersInactive(props){
    const {usersInactive,setIsVisibleModal,setModalTitle,setModalContent,setReloadUsers} = props;

    return(
      <TableContainer component={Paper}>
      <Table arial-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Nombres</TableCell>
            <TableCell>Apellidos</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Telefono</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { usersInactive.users ? usersInactive.users.map((user) =>(
            <UserInactive 
              key={user._id}  
              user={user} 
              setReloadUsers={setReloadUsers} 
              setIsVisibleModal={setIsVisibleModal}
              setModalTitle={setModalTitle}
              setModalContent={setModalContent}
            />
          )): null} 
        </TableBody>
      </Table>
    </TableContainer>
        
    )
}


function UserInactive(props){
  const {user,setReloadUsers,setIsVisibleModal,setModalTitle,setModalContent} = props;
  const [avatar,setAvatar] = useState(null);
  const { enqueueSnackbar } = useSnackbar();


  useEffect(()=>{
    if(user.avatar){
      getAvatarApi(user.avatar).then(response=>{
        setAvatar(response);
      })
    }else {
      setAvatar(null);
    }
  },[user])

  const deleteUser = user => {
    setIsVisibleModal(true);
    setModalTitle('eliminando usuario');
    setModalContent(<DeleteUserForm setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} user={user} />)
  }

  const activateUser = () => {
    const accesToken = getAccessTokenApi();

    activateUserApi(accesToken, user._id, true)
      .then(response => {
        enqueueSnackbar(response,{variant:'success',anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },});
        setReloadUsers(true);
      })
      .catch(err => {
        enqueueSnackbar(err,{variant:'error',anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },});
      });
  };

  return(
    <TableRow key={user._id}>                  
      <TableCell align="left"><Avatar alt={user.nombres} src={avatar} /></TableCell>
      <TableCell align="left">{user.nombres}</TableCell>
      <TableCell align="left">{user.apellidos}</TableCell>
      <TableCell align="left">{user.email}</TableCell>
      <TableCell align="left">{user.telefono}</TableCell>
      <TableCell align="center">
      <Button onClick={activateUser}><CheckIcon/></Button>   
      <Button onClick={() => {deleteUser(user)}}><DeleteIcon/></Button>               

        {/* <Button onClick={() => {editUser(user)}}><EditIcon/></Button> */}
{/*                 <Button onClick={editUser(row)}><DeleteIcon/></Button> 
*/}                
      </TableCell>
    </TableRow>
  )
}

export default ListUser;