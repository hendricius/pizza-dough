import React from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo.svg";
import calculator from "../images/calculator.svg";
import Input from "../components/Input";

class Calculator extends React.Component {
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
      <div>
        <header className="header">
          <h1 className="logo">
            <img src={logo} alt="Pizza Dough" />
          </h1>
          <h2 className="logo">
            <img src={calculator} alt="Calculator" />
          </h2>
        </header>
        <main className="main">
          <form onSubmit={this.calculate}>
            <Input
              id="count"
              onChange={this.handlePizzaCountChange}
              label="Number of pizzas"
            />

            <Input
              id="weight"
              onChange={this.handlePizzaWeightChange}
              label="Weight per pizza (grams)"
            >
              <small className="text-muted">
                Typically between 200 and 250 grams. For a home oven 200 grams
                is recommended.
              </small>
            </Input>

            <button type="submit" className="submit">
              Calculate
            </button>
          </form>
          <div className="link">
            <Link to="/info">
              More info{" "}
              <span role="img" aria-label="">
                ℹ️
              </span>
            </Link>
          </div>
          <div className="text-muted pwa" id="pwa">
            Add to homescreen
          </div>
        </main>
      </div>
    );
  }
}

export default Calculator;
