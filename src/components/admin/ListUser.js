import React, { useState } from 'react';
import { Switch,Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import MaterialTable from 'material-table';
import Avatar from '@material-ui/core/Avatar';
import fotoReact from '../../logo.svg';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete'
import FormDialog from '../modal/Modal';
import EditUserForm from './users/edit/EditUserForm';

const ListUser = (props) => { 
  const {usersActive,usersInactive} = props;
  const [viewUserActives,setViewUsersActives] = useState(true)
  const [isVisibleModal,setIsVisibleModal] = useState(false);
  const [modalTitle,setModalTitle] = useState("")
  const [modalContent,setModalContent] = useState(null);
  return(
        <div>
            <div>
                <Switch
                    defaultChecked
                    onChange={()=>setViewUsersActives(!viewUserActives)}
                />
                <span>
                    {viewUserActives ? "Usuarios activos" : "Usuarios inactivos" }
                </span>
            </div>
            {viewUserActives ? 
              <UsersActive usersActive={usersActive}
                setIsVisibleModal={setIsVisibleModal} 
                setModalTitle={setModalTitle}
                setModalContent={setModalContent}
              /> : 
              <UsersInactive 
                usersInactive={usersInactive} 
                setIsVisibleModal={setIsVisibleModal} 
                setModalTitle={setModalTitle}
                setModalContent={setModalContent}
              />
            }

            <FormDialog
              modalTitle={modalTitle}
              isVisibleModal={isVisibleModal}
              setIsVisibleModal={setIsVisibleModal}
              modalContent={modalContent}
            />       
            
        </div>
    );
}

function UsersActive(props){ 

    const {usersActive,setIsVisibleModal,setModalTitle,setModalContent} = props;

    const editUser = user => {
      setIsVisibleModal(true);
      setModalTitle(`Editar ${user.nombres} ${user.apellidos}`);
      setModalContent(<EditUserForm user={user} />) 
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
          { usersActive.users ? usersActive.users.map((row) =>(
            <TableRow key={row._id}>                  
              <TableCell align="left"><Avatar alt={row.nomres} src={fotoReact} /></TableCell>
              <TableCell align="left">{row.nombres}</TableCell>
              <TableCell align="left">{row.apellidos}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.telefono}</TableCell>
              <TableCell align="center">
                <Button onClick={() => {editUser(row)}}><EditIcon/></Button>
{/*                 <Button onClick={editUser(row)}><DeleteIcon/></Button> 
 */}                
              </TableCell>
            </TableRow>
          )): null} 
        </TableBody>
      </Table>

    </TableContainer>
    )
}

function UsersInactive(props){
    const {usersInactive,setIsVisibleModal,setModalTitle,setModalContent} = props;
    const imagePopap = () => {
        console.log('click aqui')
    }

    const editUser = user => {
      setIsVisibleModal(true);
      setModalTitle(`Editar ${user.nombres} ${user.apellidos}`);
      setModalContent("formulario para editar un usuario")
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
            {usersInactive.users.map((row) =>(
              <TableRow key={row._id}>                  
                <TableCell align="left"><Avatar alt={row.nomres} src={fotoReact} /></TableCell>
                <TableCell align="left">{row.nombres}</TableCell>
                <TableCell align="left">{row.apellidos}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.telefono}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => {editUser(row)}}><EditIcon/></Button>
{/*                   <Button onClick={editUser(row)}><DeleteIcon/></Button>
 */}                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>
        
    )
}

export default ListUser;