import {observable, action} from 'mobx';

const state = observable({
  cells: observable.map(),
  selected: null
});

const getKey = (rowIndex, cellIndex) => (rowIndex + ',' + cellIndex);

const getIndexFromKey = key => ({
  rowIndex: key.split(',')[0],
  cellIndex: key.split(',')[1]
});

export const getCell = (rowIndex, cellIndex) => state.cells.get(getKey(rowIndex, cellIndex));

export const changeCell = action(data => state.cells.set(state.selected, data));

export const deleteCell = action((rowIndex, cellIndex) => state.cells.delete(getKey(rowIndex, cellIndex)));

export const isCellSelected = (rowIndex, cellIndex) => getKey(rowIndex, cellIndex) === state.selected;

export const selectCell = action((rowIndex, cellIndex) => state.selected = getKey(rowIndex, cellIndex));

export const getSelectedCell = () => {
  if (!state.selected) {
    return '';
  }
  const {rowIndex, cellIndex} = getIndexFromKey(state.selected);
  return getCell(rowIndex, cellIndex);
};

window.state = state;
