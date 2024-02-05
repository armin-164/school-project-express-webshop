function loginUser() {
  const popupDiv = document.querySelector('.login-popup');
  popupDiv.innerHTML = '';

  const formContainer = document.createElement('form');
  formContainer.classList.add('form-container');

  const closeNavButton = document.createElement('span');
  closeNavButton.classList.add('material-symbols-outlined');
  closeNavButton.innerText = 'close';
  closeNavButton.addEventListener('click', () => popupDiv.classList.toggle('visible'));

  const loginTitle = document.createElement('h2');
  loginTitle.innerText = 'Log in';

  const inputEmail = document.createElement('input');
  inputEmail.placeholder = 'Email';
  inputEmail.type = 'email';

  const inputPassword = document.createElement('input');
  inputPassword.placeholder = 'Password';

  const loginBtn = document.createElement('button');
  loginBtn.innerText = 'Login';

  const createUserBtn = document.createElement('button');
  createUserBtn.innerText = 'Create an account';

  formContainer.append(
    closeNavButton,
    loginTitle,
    inputEmail,
    inputPassword,
    loginBtn,
    createUserBtn,
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
  });
}

export default initializeLoginHandler;
