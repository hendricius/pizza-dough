import React from "react";
import * as qs from "query-string";

import IngredientList from "../components/IngredientList";
import { defaultOptions, ingredientsListYeast, ingredientsListSourdough } from "../utils";

const parseNum = (value) => value ? parseFloat(value) : undefined;
const optionsFromQueryString = (parsedOptions) => ({
    weight: parseNum(parsedOptions.weight),
    count: parseNum(parsedOptions.count),
    salt: parseNum(parsedOptions.salt),
    water: parseNum(parsedOptions.water),
    dryYeastPercent: parseNum(parsedOptions.dryYeastPercent),
    sourdoughPercent: parseNum(parsedOptions.sourdoughPercent),
    sourdoughHydration: parseNum(parsedOptions.sourdoughHydration),
})

const Result = props => {
  const parsed = qs.parse(props.location.search);
  const base = {
    ...defaultOptions(),
    ...optionsFromQueryString(parsed)
  };

  const options = {
    ...base,
    freshYeastPercent: (base.freshYeastPercent > 0 ? base.freshYeastPercent : base.dryYeastPercent * 3),
  }

  const ingredients = parsed.yeast ? ingredientsListYeast(options) : ingredientsListSourdough(options);

  return (
    <IngredientList
      pizzaCount={options.count}
      pizzaWeight={options.weight}
      ingredients={ingredients}
    />
  );
};

export default Result;

