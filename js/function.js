/* ================================= 
            Event Listeners
==================================== */

// Listen for email <input> errors and display in real time
email.addEventListener('keyup', () => {
    emailValidator();
});

// If user selects 'other' in job select menu, show text field to enter other job role
jobSelect.addEventListener('change', e => {
    if (e.target.value === 'other') {
        otherTitle.removeAttribute('hidden');
    } else {
        otherTitle.setAttribute('hidden', true);
    }
});

// Listener for user t-shirt design selection, change t-shirt color options accordingly
designSelectMenu.addEventListener('change', (e) => {
    const eventTargetValue = e.target.value;
    const shirtColorOption = document.querySelectorAll('#color option');

    for (let i = 0; i < shirtColorOption.length; i++) {
        shirtColorDiv.removeAttribute('hidden');
        if (eventTargetValue === 'js puns') {
            shirtColorSelect.innerHTML = `
                      <option hidden>Please select a T-shirt theme</option>
                      <option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
                      <option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>
                      <option value="gold">Gold (JS Puns shirt only)</option>`;
        } else if (eventTargetValue === 'heart js') {
            shirtColorSelect.innerHTML = `
                      <option hidden>Please select a T-shirt theme</option>
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


/* =================================
       Validation Functions
==================================== */

// Validate name <input>
function nameValidator() {
    if (nameInput.value.length > 0) {
        nameInput.style.borderColor = "green";
        return true;
    } else {
        nameInput.style.borderColor = "red";
        return false;
    }
}

// Validate email <input>
// Change error based on user input
function emailValidator() {
    const emailValue = email.value;
    const indexOfAtSign = emailValue.indexOf('@');
    const indexOfPeriod = emailValue.lastIndexOf('.');

    if (indexOfAtSign > 1 && indexOfPeriod > indexOfAtSign && indexOfPeriod > 1) {
        email.style.borderColor = "green";
        email.previousElementSibling.innerText = "Email:";
        return true;
    } else if (indexOfAtSign > indexOfPeriod) {
        email.style.borderColor = "red";
        email.previousElementSibling.innerText = "Email must include '@' and '.'";
        return false;
    } else if (indexOfPeriod === 0) {
        email.style.borderColor = "red";
        email.previousElementSibling.innerText = "Email doesn't start with '.'";
        return false;
    } else {
        email.style.borderColor = "red";
        email.previousElementSibling.innerText = "Please enter valid Email";
        return false;
    }
}

// Validate activity selection
function activityValidator() {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    const activitiesTitle = activities.firstElementChild;

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            activitiesTitle.style.color = "inherit";
            return true;
        }
    }

    activitiesTitle.style.color = "red";
    return false;
}

// Validate credit card number
function creditCardValidator() {
    // only validated if the payment method is “credit card”)
    const ccNum = document.querySelector('#cc-num');
    const ccNumLabel = ccNum.previousElementSibling;
    const ccNumValue = ccNum.value;
    const ccNumLength = ccNumValue.length;

    if (!isNaN(ccNumValue) && ccNumLength >= 13 && ccNumLength <= 16) {
        changeBorderColorAndStyle(ccNum, ccNumLabel, 'green');
        return true;
    } else {
        changeBorderColorAndStyle(ccNum, ccNumLabel, 'red');
        return false;
    }
}

// Validate zip code
function zipCodeValidator() {
    // only validated if the payment method is “credit card”)
    const zipCode = document.querySelector('#zip');
    const zipCodeLabel = zipCode.previousElementSibling;
    const zipCodeValue = zipCode.value;
    const zipCodeLength = zipCodeValue.length;

    if (!isNaN(zipCodeValue) && zipCodeLength === 5) {
        changeBorderColorAndStyle(zipCode, zipCodeLabel, 'green');
        return true;
    } else {
        changeBorderColorAndStyle(zipCode, zipCodeLabel, 'red');
        return false;
    }
}

// Validate CVV 
function cvvValidator() {
    // only validated if the payment method is “credit card”)
    const cvvCode = document.querySelector('#cvv');
    const cvvCodeLabel = cvvCode.previousElementSibling;
    const cvvCodeValue = cvvCode.value;
    const cvvCodeLength = cvvCodeValue.length;

    if (!isNaN(cvvCodeValue) && cvvCodeLength === 3) {
        changeBorderColorAndStyle(cvvCode, cvvCodeLabel, 'green');
        return true;
    } else {
        changeBorderColorAndStyle(cvvCode, cvvCodeLabel, 'red');
        return false;
    }
}

// Call all other validation functions
function validateForm() {

    const creditDivAttribute = creditCardDiv.getAttribute('hidden');

    // store returned value of each validation function
    if (!creditDivAttribute) {
        const validateAll = [nameValidator(), emailValidator(), activityValidator(), creditCardValidator(), zipCodeValidator(), cvvValidator()];
        return validateAll;
    } else if (creditDivAttribute) {
        const validateAllMinusCC = [nameValidator(), emailValidator(), activityValidator()];
        return validateAllMinusCC;
    }
}

// Indicate error in particular <input>
const changeBorderColorAndStyle = (input, label, color) => {
    input.style.border = `2px solid ${color}`;
    label.style.color = `${color}`;
};

// Submit form
form.addEventListener('submit', (e) => {
    const h3Error = document.querySelector('.error');

    if (h3Error) {
        h3Error.setAttribute('hidden', true);
    }

    for (let i = 0; i < validateForm().length; i++) {
        if (validateForm().includes(false)) {
            e.preventDefault();
            validateForm();
            form.insertAdjacentHTML('afterbegin', '<h3 class="error" style="color: red;">*** Please fill out required fields ***</h3>');
            console.log('validator prevented submission');
            break;
        }
        else {
            // e.preventDefault();
            validateForm();
            form.insertAdjacentHTML('afterbegin', '<h3 style="color: green;">*** Form successfully submitted! ***</h3>');
            break;
        }

    }

});