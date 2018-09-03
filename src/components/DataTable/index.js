import React from "react";
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import EditIcon from "@material-ui/icons/Edit";

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

  // setting correct index on edit
  handleEdit(index) {
    this.setState({ editRowIndex: index });
  }

  // reset the index for edit
  handleCancel() {
    this.setState({ editRowIndex: -1 });
  }

  // on inline form submit, we save edited values in state
  handleSave(index, item) {
    this.setState(state => ({
      data: state.data.map((row, j) => (j === index ? item : row))
    }), function() {
      this.props.handleSave(index);
    });

    this.handleCancel();
  }

  // based on delete index, we update the state
  handleDelete(index, item) {
    this.setState(state => ({
      data: state.data.filter((row, j) => (j === index ? item : row))
    }), function() {
      this.props.handleDelete(index);
    });

    this.handleCancel();
  }

  // renders the header based on header prop values
  renderHeader() {
    const { header } = this.state;
    return (
      <TableRow>
        {header.map((item, index) => (
          <TableCell key={`thc-${index}`} numeric={item.prop === 'actions'}>{item.name}</TableCell>
        ))}
      </TableRow>
    );
  }

  // renders the each row based on data prop values
  // based on edit selected index, display's edit form
  renderRow(item, index) {
    const { header } = this.state;
    const currentlyEditing = (this.state.editRowIndex === index);

    return (
      currentlyEditing ? (
        <InlineForm key={`if-${index}`} header={header} item={item} index={index} handleDelete={this.handleDelete.bind(this, index)} handleCancel={this.handleCancel.bind(this)} handleSave={this.handleSave.bind(this)} />
      ) : (
        <TableRow key={`tr-${index}`} selected={false}>
          {header.map((y, i) => {
            if (y.prop === 'actions') {
              return <TableCell key={`trc-${i}`} numeric={true} style={{padding:'0px !important'}}><EditIcon onClick={() => this.handleEdit(index)} /></TableCell>
            } else {
              return <TableCell key={`trc-${i}`} style={{padding:'0px !important'}}>{item[y.prop]}</TableCell>
            }
          })}
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
  handleSave: PropTypes.func,
  handleDelete: PropTypes.func
};

DataTable.defaultProps = {
  header: header || [],
  data: data || [],
  handleSave: (index) => {},
  handleDelete: (index) => {}
};

export default DataTable;
