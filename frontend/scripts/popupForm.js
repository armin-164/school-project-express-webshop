import createUser from './userRegistration';
import getOrders from './ordersManager';

function validateLogin() {
  const userEmail = document.querySelector('.user-email').value;
  const userPassword = document.querySelector('.user-password').value;
  const message = document.querySelector('.popup-message');

  const user = {
    email: userEmail,
    password: userPassword,
  };

  fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.userId) {
        localStorage.setItem('user', data.userId);
        const popupDiv = document.querySelector('.login-popup');
        popupDiv.appendChild(renderLoggedInOptions());
      } else if (!message && !data.userId) {
        const inputContainer = document.querySelector('.input-container');
        const newMessage = document.createElement('span');
        newMessage.classList.add('popup-message');
        newMessage.innerText = data.message;
        inputContainer.insertBefore(newMessage, inputContainer.firstChild);
      }
    });
}

function createForm(str) {
  const overlayDiv = document.querySelector('.overlay');

  const popupDiv = document.querySelector('.login-popup');
  popupDiv.innerHTML = '';

  const formContainer = document.createElement('div');
  formContainer.classList.add('form-container');

  const closeNavButton = document.createElement('span');
  closeNavButton.classList.add('material-symbols-outlined');
  closeNavButton.innerText = 'close';
  closeNavButton.addEventListener('click', () => {
    popupDiv.classList.toggle('visible');
    overlayDiv.classList.toggle('block');
  });

  const title = document.createElement('h2');

  const inputContainer = document.createElement('div');
  inputContainer.classList.add('input-container');

  const inputEmail = document.createElement('input');
  inputEmail.classList.add('user-email');
  inputEmail.placeholder = 'Email';
  inputEmail.type = 'email';

  const inputPassword = document.createElement('input');
  inputPassword.classList.add('user-password');
  inputPassword.placeholder = 'Password';

  inputContainer.append(inputEmail, inputPassword);

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  if (str === 'login') {
    title.innerText = 'Log In';

    const loginBtn = document.createElement('button');
    loginBtn.innerText = 'Login';
    loginBtn.addEventListener('click', validateLogin);

    const createAccountBtn = document.createElement('button');
    createAccountBtn.innerText = 'Create an account';
    createAccountBtn.addEventListener('click', () => popupDiv.appendChild(createForm('signup')));

    buttonContainer.append(loginBtn, createAccountBtn);
  } else if (str === 'signup') {
    title.innerText = 'Sign Up';

    const inputName = document.createElement('input');
    inputName.placeholder = 'Name';
    inputName.classList.add('user-name');

    const signupBtn = document.createElement('button');
    signupBtn.innerText = 'Sign Up';
    signupBtn.addEventListener('click', () => {
      createUser();
      popupDiv.appendChild(createForm('login'));
    });

    inputContainer.insertBefore(inputName, inputContainer.firstChild);
    buttonContainer.appendChild(signupBtn);
  }

  formContainer.append(closeNavButton, title, inputContainer, buttonContainer);

  return formContainer;
}

function renderLoggedInOptions() {
  const overlayDiv = document.querySelector('.overlay');
  const popupDiv = document.querySelector('.login-popup');
  popupDiv.innerHTML = '';

  const closeNavButton = document.createElement('span');
  closeNavButton.classList.add('material-symbols-outlined');
  closeNavButton.innerText = 'close';
  closeNavButton.addEventListener('click', () => {
    popupDiv.classList.toggle('visible');
    overlayDiv.classList.toggle('block');
  });

  const optionsContainer = document.createElement('div');
  optionsContainer.classList.add('user-options-container');

  const logoutButton = document.createElement('button');
  logoutButton.innerText = 'Logout';
  logoutButton.classList.add('logout-button');
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('user');
    popupDiv.appendChild(createForm('login'));
  });

  const myOrdersBtn = document.createElement('button');
  myOrdersBtn.innerText = 'My Orders';
  myOrdersBtn.classList.add('my-orders-btn');
  myOrdersBtn.addEventListener('click', getOrders);

  const goToCartBtn = document.createElement('button');
  goToCartBtn.innerText = 'Go to Cart';
  goToCartBtn.classList.add('go-to-cart-btn');

  optionsContainer.append(
    closeNavButton,
    logoutButton,
    myOrdersBtn,
    goToCartBtn,
  );

  return optionsContainer;
}

function initializeLoginHandler() {
  const overlayDiv = document.querySelector('.overlay');
  const userProfile = document.getElementById('user-profile');
  const user = localStorage.getItem('user');

  const popupDiv = document.createElement('div');
  popupDiv.classList.add('login-popup');
  document.body.appendChild(popupDiv);

  if (!user) {
    popupDiv.appendChild(createForm('login'));
  } else {
    popupDiv.appendChild(renderLoggedInOptions());
  }

  userProfile.addEventListener('click', () => {
    popupDiv.classList.toggle('visible');
    overlayDiv.classList.toggle('block');
  });
}

export default initializeLoginHandler;
