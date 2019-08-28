import React from "react";
import * as qs from "query-string";

import IngredientList from "../components/IngredientList";

const Result = props => {
  const parseNum = (value, defaultValue) => parseFloat(value) || defaultValue;
  const parsed = qs.parse(props.location.search);
  const pizzaWeight = parseNum(parsed.weight, 200);
  const pizzaCount = parseNum(parsed.count, 2);
  const water = parseNum(parsed.water, 0.65);
  const salt = parseNum(parsed.salt, 0.02);
  const yeastPercent = parseNum(parsed.dryYeastPercent, 0.0005);
  const freshYeastPercent = parseNum(parsed.freshYeastPercent, yeastPercent * 3);

  const baseIngredients = [
    {
      name: "Flour",
      percentage: 1
    },
    {
      name: "Water",
      percentage: water
    },
    {
      name: "Salt",
      percentage: salt
    },
  ];

  const totalPercent = baseIngredients
    .map(({ percentage }, i) => percentage)
    .reduce((a, b) => a + b, 0);
  const flourPerPizza = pizzaWeight / totalPercent ;
  const saltPerPizza = flourPerPizza * salt;
  const finalWaterPerPizza =  flourPerPizza * water;
  const yeastPerPizza = flourPerPizza * yeastPercent;
  const freshYeastPerPizza = flourPerPizza * freshYeastPercent;

  const ingredients = [
    {
      name: "Flour",
      absolute: flourPerPizza,
      percentage: 1,
    },
    {
      name: "Water",
      absolute: finalWaterPerPizza,
      percentage: water,
    },
    {
      name: "Salt",
      absolute: saltPerPizza,
      percentage: salt,
    },
    {
      name: "Dry Yeast",
      absolute: yeastPerPizza,
      percentage: yeastPercent,
    },
    {
      name: "...or Fresh Yeast",
      absolute: freshYeastPerPizza,
      percentage: freshYeastPercent,
    },
  ]

  return (
    <IngredientList
      pizzaCount={pizzaCount}
      pizzaWeight={pizzaWeight}
      ingredients={ingredients}
    />
  );
};

export default Result;

