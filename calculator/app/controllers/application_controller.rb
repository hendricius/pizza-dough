class ApplicationController < ActionController::Base

  def meta_title
    @meta_title || "The Ultimate Pizza Dough Calculator (perfect pizza)"
  end
  helper_method :meta_title

  def meta_description
    @meta_description || "With this pizza dough calculator you will make the perfect pizza every time. Hit calculate and make your superb yeast or sourdough based dough."
  end
  helper_method :meta_description
end
