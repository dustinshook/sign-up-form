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

const handleBlur = ({ target }) => {
    if (target.validity.valid || target.value === '') {
        target.classList.remove('invalid');
        hideCustomError(target);
    }
};

const handleInput = ({ target }) => {
    if (!target.validity.typeMismatch && !target.validity.patternMismatch) {
        target.classList.remove('invalid');
        hideCustomError(target);
        target.setCustomValidity('');
    } else {
        target.classList.add('invalid');
        target.setCustomValidity(`* please enter a valid ${target.id}`);
        displayCustomError(target);
    }
};

const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('input');
    const password = document.getElementById('password');

    inputs.forEach(input => {
        if (!input.id.includes('confirm')) {
            if (input.validity.valid) {
                input.classList.remove('invalid');
                hideCustomError(input);
            } else {
                input.classList.add('invalid');
                displayCustomError(input);
            }
        } else {
            if (input.value === password.value && input.value !== '') {
                input.classList.remove('invalid');
                input.setCustomValidity('');
                hideCustomError(input);
            } else {
                input.classList.add('invalid');
                input.setCustomValidity('Passwords do not match');
                displayCustomError(input);
            }
        }
    });

    if (form.checkValidity()) {
        window.alert('Success! Your quote is on its way!');
    } else {
        window.alert('Error! Please check the form and try again');
    }
};
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    const password = document.getElementById('password');
    const submitForm = document.getElementById('submit');

    inputs.forEach(input => {
        if (!input.id.includes('confirm')) {
            input.addEventListener('input', handleInput);
            input.addEventListener('blur', handleBlur);
        } else {
            input.addEventListener('input', () => {
                if (input.value === password.value) {
                    input.classList.remove('invalid');
                    input.setCustomValidity('');
                    hideCustomError(input);
                } else {
                    input.classList.add('invalid');
                    input.setCustomValidity('Passwords do not match');
                    displayCustomError(input);
                }
            });

            input.addEventListener('blur', () => {
                if (input.value === password.value) {
                    input.classList.remove('invalid');
                    hideCustomError(input);
                }
            });

        }
    });

    submitForm.addEventListener('click', handleFormSubmit);

});