class Dough
  DEFAULT_HYDRATION = 0.6
  DEFAULT_WEIGHT = 250
  DEFAULT_PIZZAS = 2
  DEFAULT_DRY_YEAST = 0.0005
  FRESH_YEAST_MODIFIER = 3
  DEFAULT_SOURDOUGH = 0.05
  DEFAULT_SALT = 0.02

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
      "The Sourdough Framework" - section 4.3.'
    )
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
