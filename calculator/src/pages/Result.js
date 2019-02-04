import React from "react";
import * as qs from "query-string";

import Ingredient from "../components/Ingredient";
import Close from "../components/Close";

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
  const pizzaCount = parsed.count || 2;
  const totalPercent = ingredients
    .map((ing, i) => {
      return ing.percentage;
    })
    .reduce((a, b) => a + b, 0);
  const flourPerPizza = pizzaWeight / totalPercent;
  const totalFlour = flourPerPizza * pizzaCount;
  return (
    <div className="result">
      <main className="main">
        <div className="view-header">
          <div className="result-header">
            <h2>Required ingredients for {pizzaCount} pizzas</h2>
            <h3>
              ({pizzaWeight}
              g)
            </h3>
          </div>
          <Close color="white" />
        </div>
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
      </main>
    </div>
  );
};

export default Result;
