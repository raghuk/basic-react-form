import React from "react";

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from "@material-ui/core/TextField";

import CancelIcon from '@material-ui/icons/Cancel';
import DoneIcon from '@material-ui/icons/Done';


class InlineForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        ...props.item
      },
      errors: {
        firstName: false,
        lastName: false,
        username: false,
        email: false
      }
    };
  }

  handleEdit = e => {
    const { name, value } = e.target;
    this.setState((prevState, props) => ({
      values: {
        ...prevState.values,
        [name]: value
      }
    }));
  };

  validateForm = () => {
    let isError = false;
    const errors = {
      firstName: false,
      lastName: false,
      username: false,
      email: false
    };

    const { username, email } = this.state.values;

    if (username.length < 5) {
      isError = true;
      errors.username = true;
    }

    if (email.indexOf("@") === -1) {
      isError = true;
      errors.email = true;
    }

    this.setState({errors: errors});

    return isError;
  };

  formSubmit = e => {
    e.preventDefault();
    const err = this.validateForm();
    if (!err) {
      this.props.handleSave(this.props.index, this.state.values);
    }
  };

  render() {
    const { header, item, index } = this.props;

    return (
      <TableRow key={`tr-${index}`} selected={false}>
        {header.map((y, i) => (
          <TableCell key={`trc-${i}`}>
            <TextField
              name={y.prop}
              onChange={this.handleEdit}
              value={this.state.values[y.prop]}
              error={this.state.errors[y.prop]}
            />
          </TableCell>
        ))}
        <TableCell>
          <DoneIcon onClick={this.formSubmit} />
          <CancelIcon onClick={() => this.props.handleCancel()} />
        </TableCell>
      </TableRow>
    );
  }
}

export default InlineForm;
