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
      <tr>
        <td>{this.props.name}</td>
        <td className="text-right">
          {this.formatPercentage(this.props.percentage)}
        </td>
        <td className="text-right">
          {this.formatTotalOfIngredient(
            this.props.percentage,
            this.props.totalFlour
          )}
        </td>
      </tr>
    );
  }
}
