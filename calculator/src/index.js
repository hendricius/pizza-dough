import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import Ingredient from "./components/Ingredient";
import MoreInfo from "./components/MoreInfo";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pizzaWeight: "",
      pizzaCount: "",
      ingredients: [
        {
          name: "Flour",
          percentage: 1
        },
        {
          name: "Water",
          percentage: 0.65
        },
        {
          name: "Salt",
          percentage: 0.02
        },
        {
          name: "Yeast",
          percentage: 0.0005
        }
      ]
    };
  }

  handlePizzaWeightChange = e => {
    this.setState({ pizzaWeight: e.target.value });
  };

  handlePizzaCountChange = e => {
    this.setState({ pizzaCount: e.target.value });
  };

  render() {
    const totalPercent = this.state.ingredients
      .map((ing, i) => {
        return ing.percentage;
      })
      .reduce((a, b) => a + b, 0);
    const flourPerPizza = this.state.pizzaWeight / totalPercent;
    const totalFlour = flourPerPizza * this.state.pizzaCount;

    return (
      <div className="container">
        <h1>
          <img src="/logo.svg" style={{ color: "white" }} alt="Pizza Dough" />
        </h1>
        <h2>
          <img src="/calculator.svg" alt="Calculator" />
        </h2>
        <MoreInfo />
        <p>
          This calculator helps in calculating the total amount of ingredients
          needed to make X amount of pizzas.
        </p>

        <div className="form-group">
          <label>How many pizzas do you want to make?</label>
          <input
            type="number"
            className="form-control"
            placeholder="i.e. 5"
            value={this.state.pizzaCount}
            onChange={this.handlePizzaCountChange}
          />
        </div>
        <div className="form-group">
          <label>Desired weight per pizza in grams</label>
          <input
            type="number"
            className="form-control"
            placeholder="i.e. 200"
            value={this.state.pizzaWeight}
            onChange={this.handlePizzaWeightChange}
          />
          <small className="form-text text-muted">
            Typically between 200 and 250 grams. For a home oven 200 grams is
            recommended.
          </small>
        </div>
        <h4>Required Ingredients</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th className="text-right">Percent</th>
              <th className="text-right">Total in grams</th>
            </tr>
          </thead>
          <tbody>
            {this.state.ingredients.map((ing, i) => {
              return (
                <Ingredient
                  key={i}
                  name={ing.name}
                  percentage={ing.percentage}
                  totalFlour={totalFlour}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Calculator />, document.getElementById("root"));
