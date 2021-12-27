import React from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo.svg";
import calculator from "../images/calculator.svg";
import Input from "../components/Input";
import { defaultOptions } from "../utils";

class Calculator extends React.Component {
  state = defaultOptions();

  handlePizzaChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  buildParameters() {
    const opts = {
      ...defaultOptions(),
      ...this.state,
    };
    return `weight=${opts.weight}&count=${opts.count}&water=${
      opts.water
    }&salt=${opts.salt}&sourdoughPercent=${
      opts.sourdoughPercent
    }&sourdoughHydration=${opts.sourdoughHydration}&dryYeastPercent=${
      opts.dryYeastPercent
    }`;
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
              onChange={this.handlePizzaChange}
              label="Number of pizzas"
              value={this.state.count}
              step="1"
            />

            <Input
              id="weight"
              onChange={this.handlePizzaChange}
              label="Weight per pizza (grams)"
              value={this.state.weight}
              step="1"
            />

            <Input
              id="water"
              onChange={this.handlePizzaChange}
              label="Hydration (Water % - optional)"
              value={this.state.water}
              step="0.1"
              min="0"
              max="1"
            >
              <small className="text-muted">
                <p>
                  1) Pick the amount of pizzas you want to bake and your desired
                  final dough weight. The weight depends on the size of your oven.</p>
                <p>
                  2) You can optionally select the hydration of your dough or use
                  the default 60%. This value depends on your flour.
                </p>
                <p>
                  3) Choose between a yeast based dough or sourdough based dough.
                </p>
              </small>
            </Input>

            <div className="calculate-buttons">
              <Link to={`result?yeast=true&${this.buildParameters()}`}>
                Yeast
              </Link>
              <span>- or -</span>
              <Link to={`result?sourdough=true&${this.buildParameters()}`}>
                Sourdough
              </Link>
            </div>
          </form>
          <div className="more-info">
            <h1>Background</h1>
            <p>
              Typically the pizza dough weighs between 200 and 280 grams. For a
              home oven 250 grams is a recommended size. Change this value
              depending on the size of your oven.
            </p>
            <p>
              A real Neapolitan pizza consists of only flour water and salt.
              Traditionally sourdough has been used. Sourdough requires more
              advanced dough handling. Thus for beginners the yeast based dough
              is recommended.
            </p>
            <p>
              The key is to have all the ingredients in the exact quantity. To
              calculate how much of each ingredient is used "Baker's Math" is
              applied. This means the ingredients are calculated based on the
              amount of flour that you are using. So lets say the ingredient
              would say 60%, that would mean per every 100 grams of flour you
              need to add 60 grams of water. This way you can easily scale up
              the amount of pizzas that you want to bake.
            </p>
            <div className="more-info-links">
              <a href="https://github.com/hendricius/pizza-dough">
                <span role="img" aria-label="Book">
                  📚
                </span>{" "}
                See full recipe
              </a>
              <a href="https://www.youtube.com/watch?v=-60DxtcJ9Fo">YouTube</a>
              <a href="https://thbrco.io/discord">Discord</a>
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
