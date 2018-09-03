import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { data } from './data';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  }
});

class Sidenav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data
    };
  }

  renderList() {
    const { data } = this.state;

    return (
      data.map((item, index) => (
        <ListItem key={`lt-${index}`} button onClick={this.props.toggleDrawer}>
          <ListItemIcon>
            <FontAwesomeIcon icon={item.icon} />
          </ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      ))
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !this.props.open && classes.drawerPaperClose),
        }}
        open={this.props.open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={this.props.toggleDrawer}><ChevronLeftIcon /></IconButton>
        </div>
        <List>{this.renderList()}</List>
      </Drawer>
    );
  }
}

Sidenav.propTypes = {
  data: PropTypes.array,
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

Sidenav.defaultProps = {
  data: data || [],
  open: false,
  toggleDrawer: () => {}
};

export default withStyles(styles, { withTheme: true })(Sidenav);
