import {observable, action, computed} from 'mobx';

const state = observable({
  cells: observable.map(),
  selected: null,
  computedCells: observable.map()
});

const getKey = (rowIndex, cellIndex) => (rowIndex + ',' + cellIndex);

const getIndexFromKey = key => ({
  rowIndex: key.split(',')[0],
  cellIndex: key.split(',')[1]
});

const getCellData = (rowIndex, cellIndex) => state.cells.get(getKey(rowIndex, cellIndex));

const parseData = formula => {
  if (!formula) {
    return '';
  }
  console.log('compute');
  let parsedFormula = formula;
  const regex = /[A-Z]\d+/g;
  const cells = formula.match(regex);
  if (cells) {
    cells.forEach(cell => {
      parsedFormula = parsedFormula.replace(cell, state.computedCells.get(getKey(cell.charCodeAt(0) - 65, cell.substr(1) - 1)).get());
    });
  }
  return eval(parsedFormula);
};

export const changeCell = action(data => {
  state.cells.set(state.selected, data);
  state.computedCells.set(state.selected, computed(() => parseData(data)));
});

export const deleteCell = action((rowIndex, cellIndex) => {
  state.cells.delete(getKey(rowIndex, cellIndex));
  state.computedCells.delete(getKey(rowIndex, cellIndex));
});

export const isCellSelected = (rowIndex, cellIndex) => getKey(rowIndex, cellIndex) === state.selected;

export const selectCell = action((rowIndex, cellIndex) => state.selected = getKey(rowIndex, cellIndex));

export const getSelectedCell = () => {
  if (!state.selected) {
    return '';
  }
  const {rowIndex, cellIndex} = getIndexFromKey(state.selected);
  const cellData = getCellData(rowIndex, cellIndex);
  return cellData ? cellData : '';
};

export const getCell = (rowIndex, cellIndex) => state.computedCells.has(getKey(rowIndex, cellIndex)) ? state.computedCells.get(getKey(rowIndex, cellIndex)).get() : '';

window.state = state;
