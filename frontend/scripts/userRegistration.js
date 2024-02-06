function createUser() {
  const userName = document.querySelector('.user-name').value;
  const userEmail = document.querySelector('.user-email').value;
  const userPassword = document.querySelector('.user-password').value;

  const user = {
    name: userName,
    email: userEmail,
    password: userPassword,
  };

  fetch('http://localhost:3000/api/users/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      const inputContainer = document.querySelector('.input-container');
      const message = document.createElement('span');
      message.classList.add('popup-message');
      message.innerText = data.message;
      inputContainer.insertBefore(message, inputContainer.firstChild);
    });
}

export default createUser;
