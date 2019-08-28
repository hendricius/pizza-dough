import React from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo.svg";
import calculator from "../images/calculator.svg";
import Input from "../components/Input";

const defaultOptions = () => ({
    weight: 200,
    count: 2,
    water: 0.65,
    salt: 0.02,
    sourdoughPercent: 0.2,
    sourdoughHydration: 1,
    yeastPercent: 0.0005
});

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultOptions();
  }

  handlePizzaWeightChange = e => {
    this.setState({ weight: e.target.value });
  };

  handlePizzaCountChange = e => {
    this.setState({ count: e.target.value });
  };

  buildParameters() {
    const opts = {
      ...defaultOptions(),
      weight: this.state.weight,
      count: this.state.count,
    };
    return `weight=${opts.weight}&count=${opts.count}&water=${opts.water}&salt=${opts.salt}&sourdoughPercent=${opts.sourdoughPercent}&sourdoughHydration=${opts.sourdoughHydration}&yeastPercent=${opts.yeastPercent}`
  }

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
          <form>
            <Input
              id="count"
              onChange={this.handlePizzaCountChange}
              label="Number of pizzas"
              value={this.state.count}
              step="1"
            />

            <Input
              id="weight"
              onChange={this.handlePizzaWeightChange}
              label="Weight per pizza (grams)"
              value={this.state.weight}
            >
              <small className="text-muted">
                Typically between 200 and 250 grams. For a home oven 200 grams
                is recommended. Choose between a yeast based dough and a sourdough
                based dough.
              </small>
            </Input>

            <div className="calculate-buttons">
              <Link to={`result?${this.buildParameters()}`}>Yeast</Link>
              <span>
                - or -
              </span>
              <Link to={`result-sourdough?${this.buildParameters()}`}>Sourdough</Link>
            </div>
          </form>
          <div className="more-info">
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
