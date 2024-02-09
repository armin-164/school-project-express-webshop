function getOrders() {
  const user = {
    user: localStorage.getItem('user'),
    token: '1234key1234',
  };
  fetch('http://localhost:3000/api/orders/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

export default getOrders;
