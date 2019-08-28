import React, { Component } from "react";

export default class Ingredient extends Component {
  formatPercentage(percent) {
    return (percent * 100).toFixed(2) + "%";
  }

  formatTotalOfIngredient(total) {
    return (total).toFixed(2);
  }

  render() {
    return (
      <div className={'ingredient-wrapper ' + (this.props.intro ? 'ingredient-wrapper--intro' : '')}>
        <div className='ingredient-base'>
          <div className="ingredient-element">{this.props.name}</div>
          <div className="ingredient-element number">
            {this.props.percentage ? this.formatPercentage(this.props.percentage) : ''}
          </div>
          <div className="ingredient-element number">
            <p className="ingredient-amount">
              {this.formatTotalOfIngredient(this.props.absolute * this.props.count)}
            </p>
            <p>&nbsp;g</p>
          </div>
        </div>
        <div className='ingredient-explanation'>
          {this.props.description}
        </div>
        <div className='ingredient-children'>
          {this.props.breakdown.map((ing, i) => {
            return (
              <div key={i} className='ingredient-base ingredient-base--breakdown'>
                <div className="ingredient-element">{ing.name}</div>
                <div className="ingredient-element number">
                  {this.formatPercentage(ing.percentage)}
                </div>
                <div className="ingredient-element number">
                  <p className="ingredient-amount">
                    {this.formatTotalOfIngredient(ing.absolute * this.props.count)}
                  </p>
                  <p>&nbsp;g</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
