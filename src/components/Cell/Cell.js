import React, {Component} from 'react';
import PropTypes from 'prop-types';
import s from './Cell.scss';
import {computed} from 'mobx';
import {observer} from 'mobx-react';
import {getCell, isCellSelected, selectCell} from '../Store/Store';

class Cell extends Component {

  constructor(props) {
    super(props);

    const {rowIndex, cellIndex} = this.props;

    this.selected = computed(() => isCellSelected(rowIndex, cellIndex));
    // this.value = computed(() => getCell(rowIndex, cellIndex));
  }

  select() {
    const {rowIndex, cellIndex} = this.props;
    selectCell(rowIndex, cellIndex);
  }

  render() {
    const {rowIndex, cellIndex} = this.props;
    return (
      <td className={s.cell} style={{backgroundColor: this.selected.get() ? 'green' : 'white'}} onClick={() => this.select()}>
        {getCell(rowIndex, cellIndex)}
      </td>
    );
  }
}

Cell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  cellIndex: PropTypes.number.isRequired
};

export default observer(Cell);
