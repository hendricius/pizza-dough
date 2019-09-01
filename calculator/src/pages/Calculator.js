import React from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo.svg";
import calculator from "../images/calculator.svg";
import Input from "../components/Input";
import { defaultOptions } from "../utils";

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
    return `weight=${opts.weight}&count=${opts.count}&water=${opts.water}&salt=${opts.salt}&sourdoughPercent=${opts.sourdoughPercent}&sourdoughHydration=${opts.sourdoughHydration}&dryYeastPercent=${opts.dryYeastPercent}`
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
                1) Pick the amount of pizzas you want to bake and your desired final dough weight.<br />
                2) Choose between a yeast based dough or sourdough based dough.
              </small>
            </Input>

            <div className="calculate-buttons">
              <Link to={`result?yeast=true&${this.buildParameters()}`}>Yeast</Link>
              <span>
                - or -
              </span>
              <Link to={`result?sourdough=true&${this.buildParameters()}`}>Sourdough</Link>
            </div>
          </form>
          <div className="more-info">
            <h1>Background</h1>
            <p>
                Typically the pizza dough weighs between 200 and 250 grams. For a home oven 200 grams
                is a recommended size. Change this value depending on the size of your oven.
            </p>
            <p>A real Neapolitan pizza consists of only flour water and salt. Traditionally sourdough has been used. Sourdough requires
              more advanced dough handling. Thus for beginners the yeast based dough is recommended.
            </p>
            <p>
              The key is to have all the ingredients in the exact quantity. To calculate
              how much of each ingredient is used "Baker's Math" is applied. This means
              the ingredients are calculated based on the amount of flour that you are
              using. So lets say the ingredient would say 60%, that would mean per
              every 100 grams of flour you need to add 60 grams of water. This way you
              can easily scale up the amount of pizzas that you want to bake.
            </p>
            <div className="more-info-links">
              <a href="https://github.com/hendricius/pizza-dough">📚 See full recipe</a>
              <a href="https://www.reddit.com/user/the_bread_code">Reddit</a>
              <a href="https://instagram.com/the_bread_code/">Instagram</a>
            </div>
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
