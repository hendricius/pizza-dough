export const defaultOptions = () => {
  const dryYeast = 0.0005;
  const freshYeast = dryYeast * 3;
  return {
    weight: 250,
    count: 2,
    water: 0.6,
    salt: 0.02,
    sourdoughPercent: 0.2,
    sourdoughHydration: 1,
    dryYeastPercent: dryYeast,
    freshYeastPercent: freshYeast,
  };
};

const buildBaseIngredients = ({ water, salt }) => {
  return [
    {
      name: "Flour",
      percentage: 1,
    },
    {
      name: "Water",
      percentage: water,
    },
    {
      name: "Salt",
      percentage: salt,
    },
  ];
};

export const ingredientsListYeast = (options) => {
  const { weight, salt, water, dryYeastPercent, freshYeastPercent } = options;

  const totalPercent = buildBaseIngredients(options)
    .map(({ percentage }, i) => percentage)
    .reduce((a, b) => a + b, 0);
  const flourPerPizza = weight / totalPercent;
  const saltPerPizza = flourPerPizza * salt;
  const finalWaterPerPizza = flourPerPizza * water;
  const yeastPerPizza = flourPerPizza * dryYeastPercent;
  const freshYeastPerPizza = flourPerPizza * freshYeastPercent;

  const ingredients = [
    {
      name: "Flour",
      absolute: flourPerPizza,
      percentage: 1,
      round: true,
    },
    {
      name: "Water",
      absolute: finalWaterPerPizza,
      percentage: options.water,
      round: true,
    },
    {
      name: "Salt",
      absolute: saltPerPizza,
      percentage: salt,
      round: true
    },
    {
      name: "Dry Yeast",
      absolute: yeastPerPizza,
      percentage: dryYeastPercent,
    },
    {
      name: "...or Fresh Yeast",
      absolute: freshYeastPerPizza,
      percentage: freshYeastPercent,
    },
  ];

  return ingredients;
};

export const ingredientsListSourdough = (options) => {
  const { weight, salt, water, sourdoughPercent, sourdoughHydration } = options;

  const totalPercent = buildBaseIngredients(options)
    .map(({ percentage }, i) => percentage)
    .reduce((a, b) => a + b, 0);
  const flourPerPizza = weight / totalPercent;
  const saltPerPizza = flourPerPizza * salt;
  const finalWaterPerPizza = flourPerPizza * water;
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
      description:
        "The overall flour including the flour coming from the sourdough. This value is used as a basis for the calculation. The percentages of water, salt and sourdough are derived from this value. This value is just here for reference to visualize the calculation.",
      intro: true,
      round: true
    },
    {
      name: "Required flour",
      absolute: addedFlourPerPizza,
      percentage: null,
      description:
        "Some flour is already added from the sourdough to the dough. This reduces the additional flour needed. This value represents the additional flour that you need besides your sourdough flour.",
      round: true
    },
    {
      name: "Sourdough",
      absolute: sourdoughMassPerPizza,
      percentage: sourdoughPercent,
      round: true,
      breakdown: [
        {
          name: "... Water",
          percentage: sourdoughPercent * (sourdoughHydration / 2),
          absolute: sourdoughWater,
          round: true,
        },
        {
          name: "... Flour",
          percentage: sourdoughPercent * (sourdoughHydration / 2),
          absolute: sourdoughFlour,
          round: true,
        },
      ],
    },
    {
      name: "Water",
      absolute: addedWaterPerPizza,
      percentage: water,
      round: true,
    },
    {
      name: "Salt",
      absolute: saltPerPizza,
      percentage: salt,
      round: true
    },
  ];
  return ingredients;
};
