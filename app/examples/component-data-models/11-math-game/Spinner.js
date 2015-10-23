import React, { Component, PropTypes } from 'react';
import './spinner.less';

export default class Spinner extends Component {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func
  }

  static defaultProps = {
    value: 0
  }

  state = {
    value: 0
  }

  componentWillMount() {
    this.setState({value: this.props.value});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
  }

  onValueUp() {
    this.iterate();
  }

  onValueDown() {
    this.iterate(-1);
  }

  iterate(diff=1) {
    const oldValue = this.state.value;
    const newValue = oldValue + diff;
    const { onChange } = this.props;

    this.setState({value: newValue});

    if (onChange) {
      onChange(newValue, oldValue, this);
    }
  }

  render() {
    const { value } = this.state;

    return (
      <div className="spinnerfield">
        <span className="left spincontrol" onClick={::this.onValueDown}> &lt; </span>
        <div className="spinner">
          <span className="value">{value}</span>
        </div>
        <span className="right spincontrol" onClick={::this.onValueUp}> &gt; </span>
      </div>
    );
  }
}
