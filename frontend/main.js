import './style.scss';
import displayHomepage from './scripts/homepage';
import initializeLoginHandler from './scripts/popupForm';
import { displayCart } from './scripts/cartManager';

const headerTitle = document.querySelector('h1');
const cartIcon = document.getElementById('user-cart');

headerTitle.addEventListener('click', displayHomepage);
cartIcon.addEventListener('click', displayCart);

initializeLoginHandler();
displayHomepage();
