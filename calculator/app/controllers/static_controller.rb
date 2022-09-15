class StaticController < ApplicationController
  def index
  end

  def dough
    @dough = Dough.from_params(allowed_parameters)

    @meta_title = @dough.build_title
    @meta_description = @dough.build_description
  end

  private

  def allowed_parameters
    params.permit(
      :pizzas,
      :weight_per_pizza,
      :hydration,
      :dough_type,
      :hydration,
      :yeast,
      :sourdough,
      :salt,
      # legacy support
      :yeast,
      :weight,
      :count,
      :water,
      :salt,
      :sourdoughPercent,
      :sourdoughHydration,
      :dryYeastPercent
    )
  end
end
