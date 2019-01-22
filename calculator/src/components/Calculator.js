import React from "react";
import { Link } from "react-router-dom";

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pizzaWeight: "",
      pizzaCount: ""
    };
  }

  handlePizzaWeightChange = e => {
    this.setState({ pizzaWeight: e.target.value });
  };

  handlePizzaCountChange = e => {
    this.setState({ pizzaCount: e.target.value });
  };

  render() {
    return (
      <>
        <h1 className="header">
          <img src="/logo.svg" style={{ color: "white" }} alt="Pizza Dough" />
        </h1>
        <h2 className="header">
          <img src="/calculator.svg" alt="Calculator" />
        </h2>
        <Link to="/info">More</Link>

        <div className="form-group">
          <label>How many pizzas do you want to make?</label>
          <input
            type="number"
            className="form-control"
            placeholder="Number of pizzas 🍕"
            value={this.state.pizzaCount}
            onChange={this.handlePizzaCountChange}
          />
        </div>
        <div className="form-group">
          <label>Desired weight per pizza in grams</label>
          <input
            type="number"
            className="form-control"
            placeholder="Weight per pizza (grams)"
            value={this.state.pizzaWeight}
            onChange={this.handlePizzaWeightChange}
          />
          <small className="form-text text-muted">
            Typically between 200 and 250 grams. For a home oven 200 grams is
            recommended.
          </small>
        </div>
        <Link
          to={`/result?weight=${this.state.pizzaWeight}&count=${
            this.state.pizzaCount
          }`}
        >
          Calculate
        </Link>
      </>
    );
  }
}
