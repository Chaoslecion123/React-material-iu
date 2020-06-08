import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import {getUsersApi,getUsersActiveApi} from '../../api/user';
import {getAccessTokenApi} from '../../api/auth';
import ListUser from '../../components/admin/ListUser';

const Users = () => {
    const [usersActive,setUserActive] = useState([]);
    const [usersInactive,setUsersInactive] = useState([]);
    const [reloadUsers,setReloadUsers] = useState(false);
    const token = getAccessTokenApi();
        
    useEffect( () =>{
        getUsersActiveApi(token,true).then(response =>{
            setUserActive(response)
        });

        getUsersActiveApi(token,false).then(response =>{
            setUsersInactive(response)
        });
        setReloadUsers(false);

    },[token,reloadUsers])

    return(
        <div>
            <ListUser usersActive={usersActive} setReloadUsers={setReloadUsers} usersInactive={usersInactive} />
        </div>
    )
}

export default Users;