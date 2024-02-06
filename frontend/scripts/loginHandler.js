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

export default validateLogin;
