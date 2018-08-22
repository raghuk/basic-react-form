import React from "react";
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import InlineForm from './form';
import { header, data } from './data';


class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      header: props.header,
      data: props.data,
      editRowIndex: -1
    };
  }

  handleEdit(index) {
    this.setState({ editRowIndex: index });
  }

  handleCancel() {
    this.setState({ editRowIndex: -1 });
  }

  handleSave(index, item) {
    this.setState(state => ({
      data: state.data.map((row, j) => (j === index ? item : row))
    }), function() {
      this.props.handleSave(index);
    });

    this.handleCancel();
  }

  handleDelete(index) {
    this.setState(state => ({
      data: state.data.filter((row, j) => j !== index)
    }), function() {
      this.props.handleDelete(index);
    });

    this.handleCancel();
  }

  renderHeader(x, i) {
    const { header } = this.state;

    return (
      <TableRow>
        {header.map((item, index) => (
          <TableCell key={`thc-${index}`}>{item.name}</TableCell>
        ))}
        <TableCell />
      </TableRow>
    );
  }

  renderRow(item, index) {
    const { header } = this.state;
    const currentlyEditing = (this.state.editRowIndex === index);

    return (
      currentlyEditing ? (
        <InlineForm key={`if-${index}`} header={header} item={item} index={index} handleCancel={this.handleCancel.bind(this)} handleSave={this.handleSave.bind(this)} />
      ) : (
        <TableRow key={`tr-${index}`} selected={false}>
          {header.map((y, i) => (
            <TableCell key={`trc-${i}`}>{item[y.prop]}</TableCell>
          ))}
          <TableCell>
            { this.props.enableEdit ? <EditIcon onClick={() => this.handleEdit(index)} /> : null }
            { this.props.enableDelete ? <DeleteIcon onClick={() => this.handleDelete(index)} /> : null }
          </TableCell>
        </TableRow>
      )
    );
  }

  render () {
    const { data } = this.state;

    return (
      <Table>
        <TableHead>
          {this.renderHeader()}
        </TableHead>
        <TableBody>
          {data.map((item, index) => this.renderRow(item, index))}
        </TableBody>
      </Table>
    );
  }
}

DataTable.propTypes = {
  header: PropTypes.array,
  data: PropTypes.array,
  enableEdit: PropTypes.bool,
  enableDelete: PropTypes.bool,
  handleSave: PropTypes.func,
  handleDelete: PropTypes.func
};

DataTable.defaultProps = {
  header: header || [],
  data: data || [],
  enableEdit: true,
  enableDelete: false,
  handleSave: (index) => {},
  handleDelete: (index) => {}
};

export default DataTable;
