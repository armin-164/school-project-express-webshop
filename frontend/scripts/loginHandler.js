const overlayDiv = document.querySelector('.overlay');

function validateLogin() {
  const userEmail = document.querySelector('.user-email').value;
  const userPassword = document.querySelector('.user-password').value;

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
    .then((data) => console.log(data.userId));
}

function loginUser() {
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

  const loginTitle = document.createElement('h2');
  loginTitle.innerText = 'Log in';

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

  const loginBtn = document.createElement('button');
  loginBtn.innerText = 'Login';
  loginBtn.addEventListener('click', validateLogin);

  const createUserBtn = document.createElement('button');
  createUserBtn.innerText = 'Create an account';

  buttonContainer.append(loginBtn, createUserBtn);

  formContainer.append(
    closeNavButton,
    loginTitle,
    inputContainer,
    buttonContainer,
  );

  return formContainer;
}

function initializeLoginHandler() {
  const userProfile = document.getElementById('user-profile');
  const user = localStorage.getItem('user');

  const popupDiv = document.createElement('div');
  popupDiv.classList.add('login-popup');
  document.body.appendChild(popupDiv);

  if (!user) {
    popupDiv.appendChild(loginUser());
  }

  userProfile.addEventListener('click', () => {
    popupDiv.classList.toggle('visible');
    overlayDiv.classList.toggle('block');
  });
}

export default initializeLoginHandler;
