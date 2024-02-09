import './style.scss';
import displayHomepage from './scripts/homepage';
import initializeLoginHandler from './scripts/popupForm';
import { displayCart } from './scripts/cartManager';
import sendOrder from './scripts/ordersManager';

const headerTitle = document.querySelector('h1');
const cartIcon = document.getElementById('user-cart');

headerTitle.addEventListener('click', displayHomepage);
cartIcon.addEventListener('click', () => {
  // I have added a promise to ensure that submitBtn exists
  // after completing displayCart before retrieving it
  new Promise((res, rej) => {
    displayCart();
    res();
  }).then(() => {
    const submitBtn = document.querySelector('.submit-order');
    submitBtn.addEventListener('click', sendOrder);
  });
});

initializeLoginHandler();
displayHomepage();
