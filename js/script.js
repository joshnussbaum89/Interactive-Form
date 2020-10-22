/* ---------------------- */
// Javascript //
/* ---------------------- */

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

// Listener for user t-shirt design selection, change t-shirt color options accordingly
designSelectMenu.addEventListener('change', (e) => {
      const shirtColorSelect = document.querySelector('#color');
      const shirtColorOption = document.querySelectorAll('#color option');
      const eventTargetValue = e.target.value;

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