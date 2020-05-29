import React, { Component } from "react";
import {
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Avatar
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";

const styles = theme => ({
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
      color: "red"
    },
    list: {
      width: 250
    }
  });


const BarSession = () => {
    return(
        <div>
            hola
        </div>
    )
}

export default BarSession;