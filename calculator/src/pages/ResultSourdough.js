import React from "react";
import * as qs from "query-string";

import IngredientList from "../components/IngredientList";

const ResultSourdough = props => {
  const parseNum = (value, defaultValue) => parseFloat(value) || defaultValue;
  const parsed = qs.parse(props.location.search);
  const pizzaWeight = parseNum(parsed.weight, 200);
  const pizzaCount = parseNum(parsed.count, 2);
  const water = parseNum(parsed.water, 0.65);
  const salt = parseNum(parsed.salt, 0.02);
  const sourdoughPercent = parseNum(parsed.sourdoughPercent, 0.2);
  const sourdoughHydration = parseNum(parsed.sourdoughHydration, 1);

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
  const sourdoughMassPerPizza = flourPerPizza * sourdoughPercent;
  const sourdoughWater = sourdoughMassPerPizza / (sourdoughHydration * 2);
  const sourdoughFlour = sourdoughMassPerPizza / (sourdoughHydration * 2);
  const addedFlourPerPizza = flourPerPizza - sourdoughFlour;
  const addedWaterPerPizza = finalWaterPerPizza - sourdoughWater;

  const ingredients = [
    {
      name: "Overall flour",
      absolute: flourPerPizza,
      percentage: 1,
      description: 'The overall flour including the flour coming from the sourdough. This value is used as a basis for the calculation. The percentages of water, salt and sourdough are derived from this value. This value is just here for reference to visualize the calculation.',
      intro: true
    },
    {
      name: "Required flour",
      absolute: addedFlourPerPizza,
      percentage: null,
      description: 'Some flour is already added from the sourdough to the dough. This reduces the additional flour needed. This value represents the additional flour that you need besides your sourdough flour.'
    },
    {
      name: "Sourdough",
      absolute: sourdoughMassPerPizza,
      percentage: sourdoughPercent,
      breakdown: [
        {
          name: '... Water',
          percentage: sourdoughPercent * (sourdoughHydration / 2),
          absolute: sourdoughWater,
        },
        {
          name: '... Flour',
          percentage: sourdoughPercent * (sourdoughHydration / 2),
          absolute: sourdoughFlour,
        }
      ],
    },
    {
      name: "Water",
      absolute: addedWaterPerPizza,
      percentage: water,
    },
    {
      name: "Salt",
      absolute: saltPerPizza,
      percentage: salt
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

export default ResultSourdough;
