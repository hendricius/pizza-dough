class Dough
  DEFAULT_HYDRATION = 0.6
  DEFAULT_WEIGHT = 250
  DEFAULT_PIZZAS = 2
  DEFAULT_DRY_YEAST = 0.0005
  FRESH_YEAST_MODIFIER = 3
  DEFAULT_SOURDOUGH = 0.05
  DEFAULT_SALT = 0.02

  # Toppings scaling anchors (weight in grams → amount per pizza)
  MOZZ_ANCHOR = [[250.0, 80.0], [280.0, 100.0]]
  SAUCE_ANCHOR = [[250.0, 60.0], [280.0, 80.0]]
  OIL_ANCHOR = [[250.0, 6.0], [280.0, 8.0]]
  BASIL_ANCHOR = [[250.0, 16.0], [280.0, 20.0]]
  BASIL_LEAVES_PER_POT_DEFAULT = 80

  def initialize(hydration:, pizzas:, weight:, dough_type:, salt:, yeast:, sourdough:)
    @hydration = hydration
    @pizzas = pizzas
    @weight = weight
    @dough_type = dough_type
    @salt = salt
    @yeast = yeast
    @sourdough = sourdough
  end
  attr_reader :hydration, :pizzas, :weight, :dough_type, :salt, :yeast, :sourdough

  def self.from_params(params)
    params = map_legacy_params(params)
    hydration = (params[:hydration] || DEFAULT_HYDRATION).to_f
    pizzas = params[:pizzas] || DEFAULT_PIZZAS
    weight = params[:weight_per_pizza] || DEFAULT_WEIGHT
    dough_type = params[:dough_type] || "yeast"
    yeast = params[:yeast] || DEFAULT_DRY_YEAST
    sourdough = params[:sourdough] || DEFAULT_SOURDOUGH
    salt = params[:salt] || DEFAULT_SALT
    new(
      hydration: hydration > 1 ? hydration / 100 : hydration,
      pizzas: pizzas.to_i,
      weight: weight.to_f,
      dough_type: dough_type,
      yeast: yeast.to_f,
      sourdough: sourdough.to_f,
      salt: salt.to_f
    )
  end

  # From the previous app the parameters had a different format.
  def self.map_legacy_params(params)
    is_yeast = params[:yeast] ? "yeast" : nil
    is_sourdough = params[:sourdough] ? "sourdough" : nil
    legacy = {
      dough_type: params[:dough_type] ? params[:dough_type] : is_yeast || is_sourdough,
      pizzas: params[:count],
      hydration: params[:water],
      weight_per_pizza: params[:weight],
      sourdough: params[:sourdoughPercent],
      yeast: params[:dryYeastPercent],
    }.reject {|_, v| v.nil? }
    params.merge(legacy)
  end

  def ingredients
    is_yeast? ? ingredients_yeast : ingredients_sourdough
  end

  def build_title
    if is_yeast?
      "Yeast Pizza Dough Recipe for #{quantity_pluralised_singularised}"
    else
      "Sourdough Pizza Dough Recipe for #{quantity_pluralised_singularised}"
    end
  end

  def build_description
    if is_yeast?
      "This is a yeast based pizza dough recipe that yields a total of #{quantity_pluralised_singularised}."
    else
      "This is a sourdough based pizza dough recipe that yields a total of #{quantity_pluralised_singularised}."
    end
  end

  def dough_type_human
    is_yeast? ? "Yeast" : "Sourdough"
  end

  def quantity_pluralised_singularised
    if pizzas > 1
      "#{pizzas}" + " pizzas"
    else
      "#{pizzas}" + " pizza"
    end
  end

  def extract_dough_parameters
    {
      hydration: hydration,
      pizzas: pizzas,
      weight: weight,
      dough_type: dough_type,
      yeast: yeast,
      sourdough: sourdough,
      salt: salt
    }
  end

  # Toppings per pizza (scaled linearly by weight)
  def mozzarella_per_pizza
    interpolate(*MOZZ_ANCHOR[0], *MOZZ_ANCHOR[1], weight).round
  end

  def sauce_per_pizza
    interpolate(*SAUCE_ANCHOR[0], *SAUCE_ANCHOR[1], weight).round
  end

  def oil_per_pizza
    interpolate(*OIL_ANCHOR[0], *OIL_ANCHOR[1], weight).round
  end

  def basil_leaves_per_pizza
    interpolate(*BASIL_ANCHOR[0], *BASIL_ANCHOR[1], weight).round
  end

  # Toppings totals
  def mozzarella_total
    mozzarella_per_pizza * pizzas
  end

  def sauce_total
    sauce_per_pizza * pizzas
  end

  def oil_total
    oil_per_pizza * pizzas
  end

  def basil_leaves_total
    basil_leaves_per_pizza * pizzas
  end

  def basil_pots_estimate(leaves_per_pot = BASIL_LEAVES_PER_POT_DEFAULT)
    (basil_leaves_total.to_f / leaves_per_pot).ceil
  end

  def selected_if_yeast
    is_yeast? ? 'selected="selected"' : ""
  end

  def selected_if_sourdough
    !is_yeast? ? 'selected="selected"' : ""
  end

  private

  def ingredients_yeast
    [
      calculate_flour,
      calculate_water,
      calculate_salt,
      calculate_yeast,
      calculate_fresh_yeast,
    ]
  end

  def ingredients_sourdough
    [
      calculate_flour,
      calculate_water,
      calculate_sourdough,
      calculate_salt
    ]
  end

  def calculate_flour
    Ingredient.new(
      name: "Flour",
      quantity_grams: flour_quantity,
      percentage: 1
    )
  end

  # WEIGHT = 1X + percent_water*x + percent_salt*x + percent_yeast*x
  def flour_quantity
    weight / (1 + percentages_except_flour) * pizzas
  end

  def percentages_except_flour
    if is_yeast?
      [hydration, salt, yeast].inject(:+)
    else
      [hydration, salt, sourdough].inject(:+)
    end
  end

  def is_yeast?
    dough_type == "yeast"
  end

  def is_sourdough?
    !!is_yeast?
  end

  def calculate_water
    Ingredient.new(
      name: "Water",
      quantity_grams: flour_quantity * hydration,
      percentage: hydration
    )
  end

  def calculate_salt
    Ingredient.new(
      name: "Salt",
      quantity_grams: flour_quantity * salt,
      percentage: salt
    )
  end

  def calculate_yeast
    Ingredient.new(
      name: "Dry yeast",
      quantity_grams: flour_quantity * yeast,
      percentage: yeast,
      precision: 2,
      description: "This amount is good if your room temperature is around 22°C (70°F). If it is warmer use slightly less. If it is colder use more. The fermentation process should be slow to create a superb dough. By adjusting the amount of yeast or the ambient temperature you can adjust the speed."
    )
  end

  def calculate_fresh_yeast
    Ingredient.new(
      name: "Or: Fresh yeast",
      quantity_grams: flour_quantity * yeast * FRESH_YEAST_MODIFIER,
      percentage: yeast * FRESH_YEAST_MODIFIER,
      precision: 2
    )
  end

  def calculate_sourdough
    Ingredient.new(
      name: "Sourdough starter",
      quantity_grams: flour_quantity * sourdough,
      percentage: sourdough,
      description: 'Ideally use a stiff sourdough starter at a hydration of 60%. This helps to boost yeast fermentation while reducing the bacterial fermentation at the same time. By doing so your dough will become fluffier and less sour. You can read more about the topic of stiff starters in my free book <a href="https://breadco.de/book">
      "The Sourdough Framework" - section 4.3.</a>'
    )
  end

  # Linear interpolation between 2 anchor points (x1,y1) and (x2,y2)
  def interpolate(x1, y1, x2, y2, x)
    y1 + (y2 - y1) * (x - x1) / (x2 - x1)
  end

  class Ingredient
    def initialize(name:, quantity_grams:, percentage:, precision: 0, description: nil)
      @name = name
      @quantity_grams = quantity_grams
      @percentage = percentage
      @precision = precision
      @description = description
    end
    attr_reader :name, :quantity_grams, :percentage, :precision, :description
  end
end
