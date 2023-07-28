/* DOM LOADED */

const displayCustomError = ({ id, validationMessage }) => {
    const span = document.querySelector(`#${id} + span.error`);
    span.textContent = validationMessage;
    span.classList.add('active');
};

const hideCustomError = ({ id }) => {
    const span = document.querySelector(`#${id} + span.error`);
    span.textContent = '';
    span.classList.remove('active');
};

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    const password = document.getElementById('password');

    inputs.forEach(input => {
        if (!input.id.includes('confirm')) {
            input.addEventListener('input', () => {
                if (input.validity.valid) {
                    input.classList.remove('invalid');
                    hideCustomError(input);
                } else {
                    input.classList.add('invalid');
                    input.setCustomValidity('* please enter a valid email');
                    displayCustomError(input);
                }
            });

            input.addEventListener('blur', () => {
                if (input.validity.valid || input.value === '') {
                    input.classList.remove('invalid');
                    hideCustomError(input);
                }
            });
        } else {
            input.addEventListener('input', () => {
                if (input.value === password.value) {
                    input.classList.remove('invalid');
                } else {
                    input.classList.add('invalid');
                    input.setCustomValidity('Passwords do not match');
                }
            });

            input.addEventListener('blur', () => {
                if (input.value === password.value) {
                    input.classList.remove('invalid');
                }
            });

        }
    });
});