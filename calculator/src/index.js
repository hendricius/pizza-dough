import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

class Ingredient extends React.Component {
  render() {
    return (
      <tr>
        <td>{ this.props.name }</td>
        <td class="text-right">{ this.formatPercentage(this.props.percentage) }</td>
        <td class="text-right">{ this.formatTotalOfIngredient(this.props.percentage, this.props.totalFlour) }</td>
      </tr>
    )
  }

  formatPercentage(percent) {
    return (percent * 100).toFixed(2) + '%';
  }

  formatTotalOfIngredient(percent, totalFlour) {
    return (totalFlour * percent).toFixed(2);
  }
 }

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pizzaWeight: 200,
      pizzaCount: 5,
      ingredients: [
        {
          name: "Flour",
          percentage: 1
        },
        {
          name: "Water",
          percentage: 0.65,
        },
        {
          name: "Salt",
          percentage: 0.02,
        },
        {
          name: "Yeast",
          percentage: 0.0005
        }
      ]
    }
  }

  handlePizzaWeightChange = (e) => {
    this.setState({pizzaWeight: e.target.value});
  }

  handlePizzaCountChange = (e) => {
    this.setState({pizzaCount: e.target.value});
  }

  render() {
    const totalPercent = this.state.ingredients.map((ing, i) => { return ing.percentage }).reduce((a,b) => a + b, 0);
    const flourPerPizza = this.state.pizzaWeight / totalPercent;
    const totalFlour = flourPerPizza * this.state.pizzaCount;

    return (
      <div class="container">
        <h2 class="mt-3">Pizza Dough Calculator</h2>
        <p>A typical Neapolitan pizza consists of only flour
        water and salt.</p>

        <p>The key is to have the ingredients in the exact quantity.
        To calculate how much of each ingredient is used "Bakers Math" is applied.
        This means the ingredients are calculated based on the amount of flour that you are using.
        So lets say the ingredient would say 60%, that would mean per every 100 grams of flour
        you need to add 60 grams of water.
        </p>

        <p>This calculator helps in calculating the total amount of ingredients
        needed to make X amount of pizzas.</p>

        <div class="form-group">
          <label>How many pizzas do you want to make?</label>
          <input
            type="number"
            class="form-control"
            placeholder="i.e. 5"
            value={ this.state.pizzaCount }
            onChange={ this.handlePizzaCountChange }
          />
        </div>
        <div class="form-group">
          <label>Desired weight per pizza in grams</label>
          <input
            type="number"
            class="form-control"
            placeholder="i.e. 200"
            value={ this.state.pizzaWeight }
            onChange={ this.handlePizzaWeightChange }
            />
          <small class="form-text text-muted">Typically between 200 and 250 grams. For a home oven 200 grams is recommended.</small>
        </div>
        <h4>Required Ingredients</h4>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th class="text-right">Percent</th>
              <th class="text-right">Total in grams</th>
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
                />)
            })}
          </tbody>

        </table>
        <a class="mt-3" href="https://github.com/hendricius/pizza-dough">Please see the recipe for detailed instructions on how to prepare the dough.</a>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
