const $otherTitle = $('#other-title');
const $title = $('#title');
const $design = $('#design')
const $firstColor = $('option[value="cornflowerblue"]');
const $colorOption = $('#color option');
const $activities = $('.activities');
const $totalCost = $("<p></p>").text("Total: ");
let $totalCostNumber = 0;




// Puts the name input in focus on page load
$('#name').focus();


// Hides the Other Input Box, until "Other" is selected from the Job Role Dropdown
$otherTitle.hide();
$title.on('change', function() {
  $title.val() === "other" ? $otherTitle.show() : $otherTitle.hide();
});

// Hides the first design option from selection
$('#design option:first').attr('disabled', true).attr('hidden', true);

/**
* showColors(start, end)
* @attr start - The first color to display
* @attr end   - The last color to display
*  showColors is to be used with the code below to loop through the shirts
*  and only show the intended ones, while hiding the others
*/
const showColors = (start, end) => {
  for(let i = start; i < end; i++){
    $colorOption.eq(i).show().attr('selected', false);
  }
}

/**
  First hides the color selections until the user selects a design.
  After the user selects a design, it runs showColors() to have the correct
  shirts displayed. Then it 'selects' the first shirt
*/
$colorOption.hide();
$firstColor.text('Select a Color');
$design.on('change', function() {
  $colorOption.hide();
  $firstColor.text('Cornflower Blue (JS Puns shirt only)');
  if ($design.val() === "js puns"){
    showColors(0,3);
    $colorOption.eq(0).attr('selected', true);
  } else {
    showColors(3, 6);
    $colorOption.eq(3).attr('selected', true);
  }
});


// Adds the "Total: " text to the bottom of the activites section
$activities.append($totalCost);

/**
  When the user clicks a checkbox,
*/
$activities.on('change', function(e){
  const $checkbox = $(e.target);
  let $itemCost = ($checkbox.data("cost"));
  $itemCost = $itemCost.replace(/\D/, "")
  $itemCost = parseInt($itemCost);
  $checkbox.prop('checked') ? $totalCostNumber += $itemCost : $totalCostNumber-= $itemCost;
  $totalCost.text('Total: $' + $totalCostNumber);
});
