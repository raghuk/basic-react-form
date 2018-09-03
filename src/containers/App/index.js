import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";

import DataTable from '../../components/DataTable';
import Form from '../../components/Form';
import Sidenav from '../../components/Sidenav';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '98vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  button: {
    color: '#ffffff',
    alignSelf: 'flex-end',
    backgroundColor: '#00BCD4',
    marginTop: 30,
    '&:hover': {
      backgroundColor: '#0097A7'
    }
  },
});


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showForm: false
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.hanleFormDisplay = this.hanleFormDisplay.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  toggleDrawer() {
    this.setState(function(prevState, props) {
      return { open: !prevState.open };
    });
  }

  hanleFormDisplay() {
    this.setState({ showForm: true });
  }

  onFormSubmit(obj) {
    this.setState({ showForm: false });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.toggleDrawer}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>Client App</Typography>
          </Toolbar>
        </AppBar>

        <Sidenav open={this.state.open} toggleDrawer={this.toggleDrawer} />

        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Typography noWrap>Welcome to  Contact Routing Tool</Typography>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.hanleFormDisplay}>ADD VDN OVERRIDE</Button>

          <div style={{display:'flex',  margin:'30px'}}>
              <DataTable />
              {this.state.showForm ?
                  <Form showForm={this.state.showForm} onFormSubmit={this.onFormSubmit} />
              : null}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
