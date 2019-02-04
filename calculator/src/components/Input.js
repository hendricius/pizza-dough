import React from "react";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  render() {
    return (
      <div className="form-group">
        <input
          type="number"
          id={this.props.id}
          className="form-input"
          min="1"
          max="1000"
          step={this.props.step}
          value={this.state.value}
          onChange={event => {
            this.setState({ value: event.target.value });
            this.props.onChange(event);
          }}
          required
        />
        <label className="form-label" htmlFor={this.props.id}>
          {this.props.label}
        </label>
        {this.props.children}
      </div>
    );
  }
}

export default Input;
