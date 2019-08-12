const $otherTitle = $('#other-title');
const $title = $('#title');
const $design = $('#design')
const $firstColor = $('option[value="cornflowerblue"]');
const $colorOption = $('#color option');
const $activities = $('.activities');
const $totalCost = $("<p></p>").text("Total: ");
const $payment = $('#payment');
const $paymentOption = $('#payment option');
const $nameInput = $('#name');
const $emailInput = $('#mail');
const $ccInput = $('#cc-num');
const $zipInput = $('#zip');
const $cvvInput = $('#cvv');
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
  When the user clicks a checkbox, it will find the data-cost attribute of the
  checkbox. Then it will remove the dollar sign and convert the string to an int
  Finally, it will check if the checkbox was checked or unchecked and adjust the price
  accordingly
*/
$activities.on('change', function(e){
  const $checkbox = $(e.target); // The current selected checkbox
  const $dateTime = ($checkbox.data("day-and-time")); // The date and time of selected checkbox
  const $activityInput = $('.activities input'); // All of the checkboxes
  let $itemCost = ($checkbox.data("cost")); // The cost of the selected checkbox
  $itemCost = $itemCost.replace(/\D/, "");
  $itemCost = parseInt($itemCost);
  $checkbox.prop('checked') ? $totalCostNumber += $itemCost : $totalCostNumber-= $itemCost;
  $totalCost.text('Total: $' + $totalCostNumber);

  /**
    For each checkbox, get it's current date and time and check if it's the same as the selected
    Also check to ensure that it isn't the current selected one. Then disable and conflicts
  */
  for (let i = 1; i < $activityInput.length; i++){
    const $tempDateTime = $($activityInput[i]);
      if ($tempDateTime.data("day-and-time") === $dateTime &&
          $tempDateTime.attr('name') !== $checkbox.attr('name')){
        if ($tempDateTime.attr('disabled')) {
          $tempDateTime.attr('disabled', false);
          $tempDateTime.parent().css("text-decoration", "none");
        } else {
          $tempDateTime.attr('disabled', true);
          $tempDateTime.parent().css("text-decoration", "line-through");
        }
      }
  }
});

// Hides the first payment option from selection
$('#payment option:first').attr('disabled', true).attr('hidden', true);

// When the payment dropdown is changed, it will hide/show the relevant information
$payment.on('change', function(){
  if ($payment.val() === "credit card"){
    $('.credit-card').show();
    $('.paypal').hide();
    $('.bitcoin').hide();
  } else if ($payment.val() === "paypal"){
    $('.credit-card').hide();
    $('.paypal').show();
    $('.bitcoin').hide();
  } else {
    $('.credit-card').hide();
    $('.paypal').hide();
    $('.bitcoin').show();
  }
});

// Shows credit card option by default
$paymentOption.eq(1).attr('selected', true);
$('.paypal').hide();
$('.bitcoin').hide();






const isValidName = () => {
  const name = $nameInput.val();
  if (/^([a-z]+) ?([a-z]+)$/i.test(name)){
    $nameInput.css("border-color", "#6F9DDC");
    return true;
  } else {
    $nameInput.css("border-color", "red");
    return false;
  }
}

const isValidEmail = () => {
  const email = $emailInput.val();
  if(/^\S+\@\S+\.(com|net|org)$/i.test(email)){
    $emailInput.css("border-color", "#6F9DDC");
    return true;
  } else {
    $emailInput.css("border-color", "red");
    return false;
  }
}

const validActivity = () => {
  if ($('.activities input:checkbox:checked').length > 0) {
    $activities.css("border", "none");
    return true;
  } else {
    $activities.css("border", "2px solid red");
    return false;
  }
}

const isValidZip = () => {
  const zip = $zipInput.val();
  if ($payment.val() === "credit card"){
    if(/^(\d{5})$/.test(zip)){
      $zipInput.css("border-color", "#6F9DDC");
      return true;
    } else {
      $zipInput.css("border-color", "red");
      return false;
    }
  } else {
    return true;
  }
}

const isValidCard = () => {
  const card = $ccInput.val();
  if ($payment.val() === "credit card") {
    if (/^(\d{13,16})/.test(card)){
      $ccInput.css("border-color", "#6F9DDC");
      return true;
    } else {
      $ccInput.css("border-color", "red");
      return false;
    }
  } else {
    return true;
  }
}

const isValidCode = () => {
  const code = $cvvInput.val();
  if ($payment.val() === "credit card"){
    if (/^(\d{3})/.test(code)){
      $cvvInput.css("border-color", "#6F9DDC");
      return true;
    } else {
      $cvvInput.css("border-color", "red");
      return false;
    }
  } else {
    return true;
  }
}

$('form').submit(function() {
  isValidName();
  isValidEmail();
  validActivity();
  isValidZip();
  isValidCard();
  isValidCode();
  if (isValidName() &&
      isValidEmail() &&
      validActivity() &&
      isValidZip() &&
      isValidCard() &&
      isValidCode()){
        return true;
  } else {
    return false;
  }
})
