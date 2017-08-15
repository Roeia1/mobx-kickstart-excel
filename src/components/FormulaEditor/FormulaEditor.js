import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import s from './FormulaEditor.scss';
import {getSelectedCell, changeCell} from '../Store/Store';

class InputWithState extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({value: nextProps.value});
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onChange(this.state.value);
    }
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <input
        type="text"
        className={s.formulaInput}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        value={this.state.value}
        />
    );
  }
}

InputWithState.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

const FormulaEditor = () => (
  <div className={s.formulaEditor}>
        Formula: <InputWithState
          value={getSelectedCell()}
          onChange={value => changeCell(value)}
          />
  </div>

);

export default observer(FormulaEditor);
