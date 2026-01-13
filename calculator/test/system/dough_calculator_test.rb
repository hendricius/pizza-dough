require "application_system_test_case"

class DoughCalculatorTest < ApplicationSystemTestCase
  test "homepage loads with default values" do
    visit root_path

    assert_selector "h1.logo"
    assert_selector "form"
    assert_field "pizzas", with: "2"
    assert_field "weight_per_pizza", with: "250"
    assert_field "hydration", with: "60"
    assert_select "dough_type", selected: "Yeast"
    assert_button "Calculate"
  end

  test "calculate default yeast dough recipe" do
    visit root_path
    click_button "Calculate"

    # Should navigate to dough results page
    assert_current_path "/dough", ignore_query: true

    # Verify basic info displayed
    assert_text "Your pizza dough"
    assert_text "Total pizzas:"
    assert_text "2"
    assert_text "Weight per pizza:"
    assert_text "250g"
    assert_text "Total dough weight:"
    assert_text "500g"
    assert_text "Dough type:"
    assert_text "Yeast"

    # Verify ingredients section exists
    assert_text "Dough ingredients"
    assert_text "Flour"
    assert_text "Water"
    assert_text "Salt"
    assert_text "Dry yeast"

    # Verify toppings guide exists
    assert_text "Toppings guide"
    assert_text "Mozzarella total:"
    assert_text "160g"
    assert_text "Tomato sauce total:"
    assert_text "120g"
    assert_text "Olive oil total:"
    assert_text "12g"
    assert_text "Basil leaves total:"
    assert_text "32"
  end

  test "calculate sourdough recipe with custom values" do
    visit root_path

    fill_in "pizzas", with: "4"
    fill_in "weight_per_pizza", with: "280"
    fill_in "hydration", with: "65"
    select "Sourdough", from: "dough_type"

    click_button "Calculate"

    assert_current_path "/dough", ignore_query: true

    # Verify custom values displayed
    assert_text "Total pizzas:"
    assert_text "4"
    assert_text "Weight per pizza:"
    assert_text "280g"
    assert_text "Total dough weight:"
    assert_text "1,120g"
    assert_text "Dough type:"
    assert_text "Sourdough"

    # Verify sourdough-specific ingredients
    assert_text "Sourdough starter"
    assert_no_text "Dry yeast"

    # Verify scaled toppings (280g pizza = 100g mozzarella per pizza)
    assert_text "Mozzarella total:"
    assert_text "400g"
    assert_text "Tomato sauce total:"
    assert_text "320g"
  end

  test "parameter persistence when navigating back" do
    visit root_path

    fill_in "pizzas", with: "3"
    fill_in "weight_per_pizza", with: "270"
    fill_in "hydration", with: "62"

    click_button "Calculate"
    assert_current_path "/dough", ignore_query: true

    # Click the back/close button
    find("a.close").click

    # Verify we're back on home page with preserved values
    assert_current_path root_path, ignore_query: true
    assert_field "pizzas", with: "3"
    assert_field "weight_per_pizza", with: "270"
    assert_field "hydration", with: "62"
  end

  test "single pizza calculation" do
    visit root_path

    fill_in "pizzas", with: "1"
    click_button "Calculate"

    assert_text "Total pizzas:"
    assert_text "1"
    assert_text "Weight per pizza:"
    assert_text "250g"
    assert_text "Total dough weight:"
    assert_text "250g"

    # Toppings for single pizza
    assert_text "Mozzarella total:"
    assert_text "80g"
    assert_text "Tomato sauce total:"
    assert_text "60g"
  end

  test "large batch calculation" do
    visit root_path

    fill_in "pizzas", with: "10"
    fill_in "weight_per_pizza", with: "280"
    click_button "Calculate"

    assert_text "Total pizzas:"
    assert_text "10"
    assert_text "Total dough weight:"
    assert_text "2,800g"

    # Toppings for 10 pizzas at 280g (toppings don't use number formatting)
    assert_text "Mozzarella total:"
    assert_text "1000g"
  end

  test "high hydration dough" do
    visit root_path

    fill_in "hydration", with: "75"
    click_button "Calculate"

    assert_text "Dough ingredients"
    assert_text "Flour"
    assert_text "Water"
    # With 75% hydration, water percentage should show 75.00%
    assert_text "75.00%"
  end

  test "low hydration dough" do
    visit root_path

    fill_in "hydration", with: "50"
    click_button "Calculate"

    assert_text "Dough ingredients"
    # With 50% hydration, water percentage should show 50.00%
    assert_text "50.00%"
  end

  test "legacy URL parameters are supported" do
    # Legacy format used count, weight, water, yeast params
    visit "/dough?count=3&weight=260&water=65&yeast=0.0005"

    assert_text "Total pizzas:"
    assert_text "3"
    assert_text "Weight per pizza:"
    assert_text "260g"
    assert_text "Total dough weight:"
    assert_text "780g"
    assert_text "Dough type:"
    assert_text "Yeast"
  end

  test "legacy sourdough URL parameters" do
    visit "/dough?count=2&weight=250&water=60&sourdough=0.05"

    assert_text "Total pizzas:"
    assert_text "2"
    assert_text "Dough type:"
    assert_text "Sourdough"
    assert_text "Sourdough starter"
  end

  test "share button is present and clickable" do
    visit root_path
    click_button "Calculate"

    share_button = find("a.share")
    assert share_button
    assert_text "Share dough"

    # The href should contain the current URL with parameters
    href = share_button[:href]
    assert_includes href, "/dough"
  end

  test "print button is present" do
    visit root_path
    click_button "Calculate"

    assert_selector "a.print"
    assert_text "Print recipe"
  end

  test "page title updates for yeast dough" do
    visit "/dough?pizzas=2&weight_per_pizza=250&hydration=60&dough_type=yeast"

    assert_title "Yeast Pizza Dough Recipe for 2 pizzas"
  end

  test "page title updates for sourdough" do
    visit "/dough?pizzas=3&weight_per_pizza=250&hydration=60&dough_type=sourdough"

    assert_title "Sourdough Pizza Dough Recipe for 3 pizzas"
  end

  test "page title for single pizza is singular" do
    visit "/dough?pizzas=1&weight_per_pizza=250&hydration=60&dough_type=yeast"

    assert_title "Yeast Pizza Dough Recipe for 1 pizza"
  end

  test "ingredient percentages are displayed correctly" do
    visit "/dough?pizzas=2&weight_per_pizza=250&hydration=60&dough_type=yeast"

    # Flour is always 100%
    assert_text "100.00%"
    # Hydration 60%
    assert_text "60.00%"
    # Salt 2%
    assert_text "2.00%"
    # Dry yeast 0.05%
    assert_text "0.05%"
  end

  test "sourdough percentage is displayed" do
    visit "/dough?pizzas=2&weight_per_pizza=250&hydration=60&dough_type=sourdough"

    # Sourdough starter 5%
    assert_text "5.00%"
  end

  test "yeast temperature note is displayed" do
    visit "/dough?pizzas=2&weight_per_pizza=250&hydration=60&dough_type=yeast"

    assert_text "room temperature"
    assert_text "22°C"
  end

  test "sourdough starter note is displayed" do
    visit "/dough?pizzas=2&weight_per_pizza=250&hydration=60&dough_type=sourdough"

    assert_text "stiff sourdough starter"
    assert_text "60%"
  end

  test "call to action links are present on results page" do
    visit root_path
    click_button "Calculate"

    assert_link "Read the full recipe"
    assert_link "Watch the video"
    assert_link "Support & Buy me flour"
    assert_link "Support & Buy my book"
  end

  test "fresh yeast option shown for yeast dough" do
    visit "/dough?pizzas=2&weight_per_pizza=250&hydration=60&dough_type=yeast"

    assert_text "Or: Fresh yeast"
  end

  test "form has proper input constraints" do
    visit root_path

    # Check hydration field has min/max
    hydration_field = find_field("hydration")
    assert_equal "1", hydration_field[:min]
    assert_equal "99", hydration_field[:max]
  end
end
