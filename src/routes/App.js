// Seguridad
import Register from '../layout/seguridad/Register';
import LayoutAdmin2 from '../layout/LayoutAdmin2';
import Login from '../layout/seguridad/Login';
import ListInmuebles from '../components/ListInmuebles';
import Error404 from '../layout/seguridad/Error404';
import PerfilUsuario from '../layout/seguridad/PerfilUsuario';
import Users from '../layout/users/Users';

const routes = [
    {
        path:"/",
        component:LayoutAdmin2,
        exact:false,
        routes:[
            {
                path:"/",
                component:ListInmuebles,
                exact:true
            },
            {
                path:"/users",
                component:Users,
                exact:true
            },
            {
                path:"/perfil-user",
                component:PerfilUsuario,
                exact:true
            },
            {
                path:"/register",
                component:Register,
                exact:true
            },
            {
                path:"/login",
                component:Login,
                exact:true
            },
            
            {
                component:Error404
            }
        ]
    }
]

export default routes;