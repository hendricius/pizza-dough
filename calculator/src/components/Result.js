import React from "react";
import * as qs from "query-string";
import { Link } from "react-router-dom";

import Ingredient from "./Ingredient";

const Result = props => {
  const ingredients = [
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
  ];
  const parsed = qs.parse(props.location.search);
  const pizzaWeight = parsed.weight || 200;
  const pizzaCount = parsed.count || 5;
  const totalPercent = ingredients
    .map((ing, i) => {
      return ing.percentage;
    })
    .reduce((a, b) => a + b, 0);
  const flourPerPizza = pizzaWeight / totalPercent;
  const totalFlour = flourPerPizza * pizzaCount;
  return (
    <div className="result">
      <main>
        <Link to="/">Back</Link>
        <h4>
          Required ingredients for {pizzaCount} pizzas x {pizzaWeight}g
        </h4>
        <table className="table table-bordered">
          <tbody>
            {ingredients.map((ing, i) => {
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
      </main>
    </div>
  );
};

export default Result;
