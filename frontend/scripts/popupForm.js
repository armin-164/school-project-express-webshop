import { validateLogin } from './loginHandler';

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

    const createUserBtn = document.createElement('button');
    createUserBtn.innerText = 'Create an account';
    createUserBtn.addEventListener('click', () => popupDiv.appendChild(createForm('signup')));

    buttonContainer.append(loginBtn, createUserBtn);
  } else if (str === 'signup') {
    title.innerText = 'Sign Up';

    const inputName = document.createElement('input');
    inputName.placeholder = 'Name';
    inputName.classList.add('user-name');

    const signupBtn = document.createElement('button');
    signupBtn.innerText = 'Sign Up';
    signupBtn.addEventListener('click', () => {
      popupDiv.appendChild(createForm('login'));
    });

    inputContainer.insertBefore(inputName, inputContainer.firstChild);
    buttonContainer.appendChild(signupBtn);
  }

  formContainer.append(closeNavButton, title, inputContainer, buttonContainer);

  return formContainer;
}

function initializeLoginHandler() {
  const overlayDiv = document.querySelector('.overlay');
  const userProfile = document.getElementById('user-profile');
  const user = localStorage.getItem('user');

  const popupDiv = document.createElement('div');
  popupDiv.classList.add('login-popup');
  document.body.appendChild(popupDiv);

  if (!user) {
    popupDiv.appendChild(createForm('signup'));
  }

  userProfile.addEventListener('click', () => {
    popupDiv.classList.toggle('visible');
    overlayDiv.classList.toggle('block');
  });
}

export default initializeLoginHandler;
