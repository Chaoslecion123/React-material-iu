import React,{useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Button,Avatar} from '@material-ui/core';

import { Route, Switch,Link,Redirect } from "react-router-dom";
import fotoUsuarioTemp from '../logo.svg';
import {MenuDerecha} from './bar/MenuDerecha';

import useAuth from '../hooks/useAuth';
import Login from '../layout/seguridad/Login';
import Register from '../layout/seguridad/Register';
import {logout} from '../api/auth';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const stylesBarSessionRight = makeStyles((theme) => ({
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex"
      }
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    },
    grow: {
      flexGrow: 1
    },
    avatarSize: {
      width: 40,
      height: 40
    },
    listItemText: {
      fontSize: "14px",
      fontWeight: 600,
      paddingLeft: "15px",
      color: "#212121"
    },
    list: {
      width: 250
    }
  }));

export default function LayoutAdmin2(props) {
  const classes = useStyles();
  const classes_ = stylesBarSessionRight();
  const { routes } = props;
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { user, isLoading } = useAuth();
  console.log(props);

  const [openDrawerDerecha,setDrawerDerecha] = useState({
      right:false
  })

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = (side, open) => () => {
    setDrawerDerecha({
      [side]: open
    });
  };

  const salirSesionApp = () => {
    logout();
    window.location.reload();
  }

  if (!user && !isLoading) {
    return (
      <>
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </>
    ); 
  }
  if (user && !isLoading) {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Persistent drawer
            </Typography>

            <div className={classes_.grow}></div>
            <div className={classes_.sectionDesktop}>
              <IconButton color="inherit" component={Link} to="">
                <i className="material-icons">mail_outline</i>
              </IconButton>
              <Button color="inherit" onClick={salirSesionApp}>
                Salir
              </Button>
                <Button color="inherit">{user.nombres} {user.apellidos}</Button>
              <Avatar
                src={fotoUsuarioTemp}
              ></Avatar>
            </div>
            <div className={classes_.sectionMobile}>
              <IconButton
                color="inherit"
                onClick={toggleDrawer("right", true)}
              >
                <i className="material-icons">more_vert</i>
              </IconButton>
            </div>

          </Toolbar>
        </AppBar>
          <Drawer
            open={openDrawerDerecha.right}
            onClose={toggleDrawer("right", false)}
            anchor="right"
          >
            <div
              role="button"
              onClick={toggleDrawer("right", false)}
              onKeyDown={toggleDrawer("right", false)}
            >
              <MenuDerecha
                classes={classes_}
                usuario="luis fernando"
                textoUsuario="luis fernando sovero pisco"
                fotoUsuario={fotoUsuarioTemp}
                salirSesion={salirSesionApp}
              />
            </div>
          </Drawer>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
              <ListItem component={Link} button to="/perfil-user">
                  <i className="material-icons">account_box</i>
                  <ListItemText classes={{primary: classes_.listItemText}} primary="Perfil" />
              </ListItem>
          </List>
          <Divider />
          <List>
              <ListItem component={Link} button to="/inmueble/nuevo">
                  <i className="material-icons">add_box</i>
                  <ListItemText classes={{primary: classes_.listItemText}} primary="Nuevo Inmueble" />
              </ListItem>
              <ListItem component={Link} button to="">
                  <i className="material-icons">business</i>
                  <ListItemText classes={{primary: classes_.listItemText}} primary="Inmuebles" />
              </ListItem>
              <ListItem component={Link} button to="/users">
                  <i className="material-icons">group</i>
                  <ListItemText classes={{primary: classes_.listItemText}} primary="Usuarios" />
              </ListItem>
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
              <LoadRoutes routes={routes} />
        </main>
      </div>
    );
  }
  return null;
}

function LoadRoutes({ routes }) {
    return (
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Switch>
    );
  }