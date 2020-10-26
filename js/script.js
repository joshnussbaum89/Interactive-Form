/* ================================= 
            Global variables
==================================== */


// Name input is focused on page load
const nameInput = document.querySelector('#name');
nameInput.focus();

// Hide "other" job title text area on page load
const otherTitle = document.getElementById('other-title');
otherTitle.setAttribute('hidden', true);

// T-shirt design <select> menu
const designSelectMenu = document.querySelector('#design');
designSelectMenu[0].textContent = 'Please select a T-shirt theme';

// Hide shirt colors <div> on page load
const shirtColorDiv = document.querySelector('.shirt-colors');
shirtColorDiv.setAttribute('hidden', true);

// Activities section - create element to hold total cost of activities
const activities = document.querySelector('.activities');
const activityCostSpan = document.createElement('h3');
activities.appendChild(activityCostSpan);
let totalActivityCost = 0;

// Payment section - disable "Select Payment Method" so it doesn't appear when menu opens
const payment = document.querySelector('#payment');
payment.firstElementChild.setAttribute('hidden', true);

// Hide paypal <div> on page load
const paypalDiv = document.querySelector('.paypal');
paypalDiv.setAttribute('hidden', true);

// Hide bitcoin <div> on page load
const bitcoinDiv = document.querySelector('.bitcoin');
bitcoinDiv.setAttribute('hidden', true);


/* ================================= 
            Event Listeners
==================================== */


// Listener for user t-shirt design selection, change t-shirt color options accordingly
designSelectMenu.addEventListener('change', (e) => {
      const eventTargetValue = e.target.value;
      const shirtColorSelect = document.querySelector('#color');
      const shirtColorOption = document.querySelectorAll('#color option');

      for (let i = 0; i < shirtColorOption.length; i++) {
            shirtColorDiv.removeAttribute('hidden');
            if (eventTargetValue === 'js puns') {
                  shirtColorSelect.innerHTML = `
                        <option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
                        <option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>
                        <option value="gold">Gold (JS Puns shirt only)</option>`;
            } else if (eventTargetValue === 'heart js') {
                  shirtColorSelect.innerHTML = `
                        <option value="tomato">Tomato (I &#9829; JS shirt only)</option>
                        <option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>
                        <option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>`;
            } else {
                  shirtColorSelect.innerHTML = `
                        <option value="placeholder"> - - </option>`;
            }
      }
});

// Listen for activity selection
// Calculate cost of total activities
// Disable conflicting activities based on schedule
activities.addEventListener('change', (e) => {
      const clicked = e.target;
      const dataCost = clicked.getAttribute('data-cost');
      const dayAndTime = clicked.getAttribute('data-day-and-time');
      const checkboxes = document.querySelectorAll('input[type=checkbox]');

      if (clicked.checked) {
            totalActivityCost += +dataCost;
      } else {
            totalActivityCost -= +dataCost;
      }
      if (totalActivityCost === 0) {
            activityCostSpan.innerText = 'Which activies would you like to attend? 💻';
      } else {
            activityCostSpan.innerText = `Total: $${totalActivityCost}`;
      }

      for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].getAttribute('data-day-and-time') === dayAndTime && clicked !== checkboxes[i]) {
                  if (clicked.checked) {
                        checkboxes[i].setAttribute('disabled', true);
                  } else {
                        checkboxes[i].removeAttribute('disabled');
                  }
            }
      }
});

// Listen for payment selection
payment.addEventListener('change', (e) => {
      const clickedValue = e.target.value;
      const creditCardDiv = document.querySelector('.credit-card');

      if (clickedValue === "credit card") {
            creditCardDiv.removeAttribute('hidden');
            paypalDiv.setAttribute('hidden', true);
            bitcoinDiv.setAttribute('hidden', true);
      } else if (clickedValue === "paypal") {
            paypalDiv.removeAttribute('hidden');
            creditCardDiv.setAttribute('hidden', true);
            bitcoinDiv.setAttribute('hidden', true);
      } else if (clickedValue === "bitcoin") {
            bitcoinDiv.removeAttribute('hidden');
            creditCardDiv.setAttribute('hidden', true);
            paypalDiv.setAttribute('hidden', true);
      }

});