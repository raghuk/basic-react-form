import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";

import ClearIcon from '@material-ui/icons/Clear';

import Toggle from '../Toggle';
import { data } from './data';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '25%',
    border: '1px solid',
    padding: '10px',
    marginLeft: '30px',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  textField: {
  },
  submit: {
    width: 150,
    alignSelf: 'flex-end',
    color: '#ffffff',
    backgroundColor: '#00BCD4',
    '&:hover': {
      backgroundColor: '#0097A7'
    }
  },
});

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      vdn:'',
      override_reason:'',
      notes:''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClear  = this.handleClear.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]:event.target.value})
  }

  handleSubmit() {
    var obj={
        vdn: this.state.vdn,
        overRideReason: this.state.override_reason,
        // returnValue: "OPL",
        notes: this.state.notes
    };

    this.props.onFormSubmit(obj);
  }

  handleClear() {
    this.setState({ open:true });
  }

  renderFormField(item, index) {
    const { classes } = this.props;

    switch (item.type) {
      case 'select':
        return (
          <FormControl key={`fc-${index}`} fullWidth className={classes.formControl}>
            <InputLabel htmlFor={`${item.label}`}>{item.label}</InputLabel>
            <Select
              value={item.value}
              name={item.name}
              onChange={this.handleChange}
            >
              {item.options.map((option, index) => {
                return <MenuItem key={index} value={option}>{option}</MenuItem>
              })}
            </Select>
          </FormControl>
        );
      case 'toggle':
        return (
          <FormControl key={`fc-${index}`} fullWidth className={classes.formControl}>
            <Toggle leftLable={item.leftLable} rightLable={item.rightLable} checked={item.checked} />
          </FormControl>
        );
      default:
        return (
          <FormControl key={`fc-${index}`} fullWidth className={classes.formControl}>
            <TextField
              id={item.label}
              label={item.label}
              value={item.value}
              fullWidth
              margin="normal"
              className={classes.textField}
              name={item.name}
              onChange={this.handleChange}
            />
          </FormControl>
        );
    }
  }

  render () {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <ClearIcon onClick={this.handleClear} />
        {data.map((item, index) => this.renderFormField(item, index))}
        <FormControl fullWidth className={classes.formControl}>
          <Button variant="contained" color="primary" className={classes.submit} onClick={this.handleSubmit}>SUBMIT</Button>
        </FormControl>
      </form>
    );
  }
}

Form.propTypes = {
  data: PropTypes.array
};

Form.defaultProps = {
  data: data || []
};

export default withStyles(styles)(Form);
