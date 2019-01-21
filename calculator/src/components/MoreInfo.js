import React from "react";

const MoreInfo = () => {
  return (
    <div>
      <p>A typical Neapoliotan pizza consists of only flour water and salt.</p>

      <p>
        The key is to have the ingredients in the exact quantity. To calculate
        how much of each ingredient is used "Bakers Math" is applied. This means
        the ingredients are calculated based on the amount of flour that you are
        using. So lets say the ingredient would say 60%, that would mean per
        every 100 grams of flour you need to add 60 grams of water.
      </p>
      <a className="mt-3" href="https://github.com/hendricius/pizza-dough">
        Please see the recipe for detailed instructions on how to prepare the
        dough.
      </a>
    </div>
  );
};

export default MoreInfo;
