import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import {getUsersApi,getUsersActiveApi} from '../../api/user';
import {getAccessTokenApi} from '../../api/auth';
import ListUser from '../../components/admin/ListUser';

const Users = () => {
    const [usersActive,setUserActive] = useState([]);
    const [usersInactive,setUsersInactive] = useState([]);

    const [state,setState] = useState({
        columns: [
            {title:'Nombres',field: 'nombres'},
            {title:'Apellidos',field: 'apellidos'},
            {title:'Email',field: 'email'},
            {title:'Telefono',field: 'telefono'},
        ],
    })

    const [users,setUsers] = useState([])

    const token = getAccessTokenApi();
    
    useEffect( () =>{
        /* let users =  getUsersApi(token);
        users
            .then(result=>{
                setUsers(result.users)
            })
            .catch(err=>{
                console.log(err)
            }) */
        getUsersActiveApi(token,true).then(response =>{
            setUserActive(response)
        })

        getUsersActiveApi(token,false).then(response =>{
            setUsersInactive(response)
        })
    },[token])

    return(
        <div>
            <ListUser usersActive={usersActive} usersInactive={usersInactive} />
        </div>
    )
}

export default Users;