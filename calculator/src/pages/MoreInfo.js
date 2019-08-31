import React from "react";

import Close from "../components/Close";

const MoreInfo = () => {
  return (
    <main className="main">
      <div className="view-header">
        <h1>More info</h1>
        <Close color="black" />
      </div>
      <p>A typical Neapolitan pizza consists of only 4 basic ingredients: flour, water, salt and yeast.</p>

      <p>
        The key is to have the ingredients in the exact quantity. To calculate
        how much of each ingredient is used "Bakers Math" is applied. This means
        the ingredients are calculated based on the amount of flour that you are
        using. So lets say the ingredient would say 60%, that would mean per
        every 100 grams of flour you need to add 60 grams of water.
      </p>
      <a href="https://github.com/hendricius/pizza-dough">See full recipe 🍽</a>
    </main>
  );
};

export default MoreInfo;
