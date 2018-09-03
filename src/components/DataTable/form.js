import React from "react";

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from "@material-ui/core/TextField";

import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Done';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import Toggle from '../Toggle';


class AlertDialog extends React.Component {
  constructor(props){
    super(props);
    this.handleClose=this.handleClose.bind(this);
    this.handleDelete=this.handleDelete.bind(this);
  }

  handleClose(){
    this.props.handleClose()
  };

  handleDelete(){
    this.props.handleDelete()
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete VDN, Override Reason?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">Cancel</Button>
            <Button onClick={this.handleDelete} color="primary" autoFocus>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


class InlineForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: Object.assign({}, props.item),
      open:false,
      errors: {
        vdn: false,
        overRideReason: false,
        returnValue: false,
        notes: false
      }

    };

    this.handleModal = this.handleModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleModal() {
    this.setState({ open:true });
  }

  handleClose() {
    this.setState({ open:false });
  }

  handleEdit(e) {
    const { name, value } = e.target;
    this.setState((prevState, props) => ({
      values: Object.assign({}, prevState.values, { [name]: value })
    }));
  };

  validateForm() {
    let isError = false;
    const errors = {
      vdn: false,
      overRideReason: false,
      returnValue: false,
      notes: false
    };

    const { notes } = this.state.values;

    if (notes.indexOf("") === -1) {
      isError = true;
      errors.notes = true;
    }

    this.setState({ errors: errors });

    return isError;
  };

  formSubmit(e) {
    e.preventDefault();
    const err = this.validateForm();
    if (!err) {
      this.props.handleSave(this.props.index, this.state.values);
    }
  };

  render() {
    const { header, index } = this.props;

    return (
      <TableRow key={`tr-${index}`} selected={false}>
        {header.map((y, i) => {
          if (y.prop === 'actions') {
            return (
              <TableCell key={`trc-${i}`}>
                  <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <div>
                      <DeleteIcon onClick={this.handleModal} />
                      <div>Delete</div>
                    </div>
                    <div>
                      <SaveIcon onClick={this.formSubmit.bind(this)} />
                      <div>Save</div>
                    </div>
                    <div>
                      <Button onClick={() => this.props.handleCancel()}>Cancel</Button>
                    </div>
                  </div>
                 <AlertDialog open={this.state.open} handleClose={this.handleClose} handleDelete={this.props.handleDelete} />
              </TableCell>
            );
          } else {
            switch (y.type) {
              case 'toggle':
                let checked = (y.rightLable === this.state.values[y.prop])
                return (
                  <TableCell key={`trc-${i}`}>
                    <Toggle leftLable={y.leftLable} rightLable={y.rightLable} checked={checked} />
                  </TableCell>
                );
              default:
                return (
                  <TableCell key={`trc-${i}`}>
                    <TextField
                      name={y.prop}
                      onChange={this.handleEdit.bind(this)}
                      value={this.state.values[y.prop]}
                      error={this.state.errors[y.prop]}
                    />
                  </TableCell>
                );
            }
          }
        })}
      </TableRow>
    );
  }
}

export default InlineForm;
