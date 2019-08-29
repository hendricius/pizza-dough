import React, { Component } from "react";
import Close from "../components/Close";
import Ingredient from "../components/Ingredient";

export default class IngredientList extends Component {
  render() {
    return (
      <div className="result">
        <main className="main">
          <div className="view-header">
            <div className="result-header">
              <h2>
                Required ingredients for: {this.props.pizzaCount}{" "}
                {this.props.pizzaCount > 1 ? "pizzas" : "pizza"}
              </h2>
              <h3>
                Desired final weight per pizza: {this.props.pizzaWeight} g
              </h3>
            </div>
            <Close color="white" />
          </div>
          {this.props.ingredients.map((ing, i) => {
            return (
              <Ingredient
                name={ing.name}
                percentage={ing.percentage}
                absolute={ing.absolute}
                breakdown={ing.breakdown ? ing.breakdown : []}
                description={ing.description}
                count={this.props.pizzaCount}
                key={i}
                intro={ing.intro}
              />
            );
          })}
        </main>
      </div>
    );
  }
}
