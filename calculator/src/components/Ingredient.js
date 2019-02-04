import React, { Component } from "react";

export default class Ingredient extends Component {
  formatPercentage(percent) {
    return (percent * 100).toFixed(2) + "%";
  }

  formatTotalOfIngredient(percent, totalFlour) {
    return (totalFlour * percent).toFixed(2);
  }

  render() {
    return (
      <div className="ingredient">
        <div className="ingredient-element">{this.props.name}</div>
        <div className="ingredient-element number">
          {this.formatPercentage(this.props.percentage)}
        </div>
        <div className="ingredient-element number">
          <p className="ingredient-amount">
            {Math.round(
              this.formatTotalOfIngredient(
                this.props.percentage,
                this.props.totalFlour
              )
            )}
          </p>
          <p>&nbsp;g</p>
        </div>
      </div>
    );
  }
}
