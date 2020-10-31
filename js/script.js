/* ================================= 
            Global variables
==================================== */

// Form and submit button
const form = document.querySelector('form');
const submit = document.querySelector('button[type="submit"]');

// Name input is focused on page load
const nameInput = document.querySelector('#name');
const email = document.querySelector('#mail');
nameInput.focus();

// Hide "other" job title text area on page load
const jobSelect = document.querySelector('#title');
const otherTitle = document.getElementById('other-title');
otherTitle.setAttribute('hidden', true);

// T-shirt design <select> menu
const designSelectMenu = document.querySelector('#design');
designSelectMenu[0].setAttribute('hidden', true);

// Hide shirt colors <div> on page load
const shirtColorDiv = document.querySelector('.shirt-colors');
const shirtColorSelect = document.querySelector('#color');
shirtColorDiv.setAttribute('hidden', true);

// Activities section - create element to hold total cost of activities
const activities = document.querySelector('.activities');
const activityCostSpan = document.createElement('h3');
activities.appendChild(activityCostSpan);
let totalActivityCost = 0;

// Payment section - remove "Select Payment Method" so it doesn't appear on page load
const payment = document.querySelector('#payment');
payment.removeChild(payment.firstElementChild);

// Credit card <div>
const creditCardDiv = document.querySelector('#credit-card');

// Hide paypal <div> on page load
const paypalDiv = document.querySelector('.paypal');
paypalDiv.setAttribute('hidden', true);

// Hide bitcoin <div> on page load
const bitcoinDiv = document.querySelector('.bitcoin');
bitcoinDiv.setAttribute('hidden', true);