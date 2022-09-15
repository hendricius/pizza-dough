class ApplicationController < ActionController::Base

  def meta_title
    @meta_title || "The Ultimate Pizza Dough Calculator"
  end
  helper_method :meta_title

  def meta_description
    @meta_description || "With this pizza calculator you will make the perfect pizza dough. You have an overview of the exact ingredients for both a yeast and sourdough based pizza."
  end
  helper_method :meta_description
end
