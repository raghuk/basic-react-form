import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  colorSwitchBase: {
    color: green[300],
    '&$colorChecked': {
      color: green[500],
      '& + $colorBar': {
        backgroundColor: green[500],
      },
    },
  },
  colorBar: {},
  colorChecked: {}
});

class Toggle extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isChecked: props.checked
    };
  }

  onChange() {
    this.setState(function(prevState) {
      return { isChecked: !prevState.isChecked };
    }, function() {
      this.props.onChange(this.state.isChecked);
    });
  }

  render() {
    const { classes, value, leftLable, rightLable } = this.props;

    return (
      <div>
        {leftLable ? <span>{leftLable}</span> : null }
        <Switch
          checked={this.state.isChecked}
          value={value}
          onChange={this.onChange.bind(this)}
          classes={{
            switchBase: classes.colorSwitchBase,
            checked: classes.colorChecked,
            bar: classes.colorBar,
          }}
        />
        {rightLable ? <span>{rightLable}</span> : null }
      </div>
    )}
}


Toggle.propTypes = {
  checked: PropTypes.bool,
  classes: PropTypes.object,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  leftLable: PropTypes.string,
  rightLable: PropTypes.string
};

Toggle.defaultProps = {
  checked: false,
  color: 'secondary',
  disabled: false,
  onChange: (event, checked) => {},
  value: 'yes',
  leftLable: '',
  rightLable: ''

}

export default withStyles(styles)(Toggle);
