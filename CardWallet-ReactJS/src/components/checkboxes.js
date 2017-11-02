import React from 'react';
import PropTypes from 'prop-types';

function Checkbox(props) {
  const { idx, value, handleChange } = props;

  function handler({ target }) {
    props.handleChange(target.value, target.checked)
  }

  return (
    <label htmlFor={"valueSelect-" + idx} >
    <input onChange={handler} value={value} type="checkbox" id={"valueSelect-" + idx} name="valueSelect" />
     {value}
    </label>
  )
}

Checkbox.displayName = 'Checkbox';
Checkbox.defaultProps = {
  handleChange: function () { }
}

Checkbox.propTypes = {
  idx: PropTypes.number,
  value: PropTypes.string,
  handleChange: PropTypes.func,
}

export default function Checkboxes(props) {
  return props.labels.map((label, idx) => {
    return (<Checkbox key={'valueSelect-' + idx} value={label} idx={idx} handleChange={props.handleChange} />);
  })
}

Checkboxes.displayName = 'Checkboxes';
Checkboxes.defaultProps = {
  handleChange: function () { }
}

Checkboxes.propTypes = {
  labels: PropTypes.array,
  handleChange: PropTypes.func,
}