function validateInputField(regex, element, msg) {
  const inputIsValid = regex.test(element.value);

  if (!inputIsValid) {
    element.setCustomValidity(msg);
    element.reportValidity();
    return false;
  }

  element.setCustomValidity('');
  return true;
}

function formIsValid(str) {
  const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^[a-zA-Z0-9!]+$/;
  const swedishAddressRegex = /^[a-zA-Z0-9åäöÅÄÖ]+$/;
  const phoneNumberRegex = /^07\d{8}$/;

  if (str === 'login') {
    const userEmail = document.querySelector('.user-email');
    const userPassword = document.querySelector('.user-password');

    const emailValid = validateInputField(
      emailRegex,
      userEmail,
      'Write a correct email',
    );

    const passwordValid = validateInputField(
      passwordRegex,
      userPassword,
      'Avoid use of symbols beside "!"...I need to update the regex',
    );
    return emailValid && passwordValid;
  }

  if (str === 'signup') {
    const userName = document.querySelector('.user-name');
    const userEmail = document.querySelector('.user-email');
    const userPassword = document.querySelector('.user-password');

    const nameValid = validateInputField(
      nameRegex,
      userName,
      'Please avoid using any numbers/symbols',
    );

    const emailValid = validateInputField(
      emailRegex,
      userEmail,
      'Write a correct email',
    );

    const passwordValid = validateInputField(
      passwordRegex,
      userPassword,
      'Avoid use of symbols beside "!"...I need to update the regex',
    );

    return nameValid && emailValid && passwordValid;
  }

  if (str === 'order') {
    const orderName = document.querySelector('.order-name');
    const orderEmail = document.querySelector('.order-email');
    const orderAddress = document.querySelector('.order-address');
    const orderPhone = document.querySelector('.order-phone');

    const orderNameValid = validateInputField(
      nameRegex,
      orderName,
      'Please avoid using any numbers/symbols',
    );

    const orderEmailValid = validateInputField(
      emailRegex,
      orderEmail,
      'Write a correct email',
    );

    const orderAddressValid = validateInputField(
      swedishAddressRegex,
      orderAddress,
      'Write a correctly formatted address, avoid symbols',
    );

    const orderPhoneValid = validateInputField(
      phoneNumberRegex,
      orderPhone,
      'Write 10-digit phone number',
    );

    return (
      orderNameValid && orderEmailValid && orderAddressValid && orderPhoneValid
    );
  }
}

export default formIsValid;
