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

  calculate = e => {
    e.preventDefault();
    this.props.history.push(
      `/result?weight=${this.state.pizzaWeight}&count=${this.state.pizzaCount}`
    );
  };

  render() {
    return (
      <>
        <header>
          <h1 className="header">
            <img src="/logo.svg" alt="Pizza Dough" />
          </h1>
          <h2 className="header">
            <img src="/calculator.svg" alt="Calculator" />
          </h2>
        </header>
        <main>
          <form onSubmit={this.calculate}>
            <div className="form-group">
              <input
                type="number"
                id="count"
                className="form-input"
                onChange={this.handlePizzaCountChange}
                required
              />
              <label htmlFor="count" className="form-label">
                Number of pizzas{" "}
                <span role="img" aria-label="">
                  🍕
                </span>
              </label>
            </div>
            <div className="form-group">
              <input
                type="number"
                id="name"
                className="form-input"
                onChange={this.handlePizzaWeightChange}
                required
              />
              <label className="form-label" htmlFor="name">
                Weight per pizza (grams)
              </label>
              <small className="form-text text-muted">
                Typically between 200 and 250 grams. For a home oven 200 grams
                is recommended.
              </small>
            </div>
            <button type="submit" className="submit">
              Calculate
            </button>
          </form>
          <Link to="/info">More</Link>
        </main>
      </>
    );
  }
}
