import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from './routes/App';
import theme from "./theme/theme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { SnackbarProvider } from 'notistack';
import AuthProvider from "./providers/AuthProvider";

function App() {

  return (
    <AuthProvider>
      <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <Router>
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
      </SnackbarProvider>
    </MuiThemeProvider>
    </AuthProvider>
    
    
  );
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component routes={route.routes} {...props} />}
    />
  );
}

export default App;
