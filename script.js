
let cart = [];


document.addEventListener('DOMContentLoaded', () => {
  
 
  const cartIcon = document.getElementById('cart-icon');
  const cartCount = document.getElementById('cart-count');
  const cartModal = document.getElementById('cart-modal');
  const closeCartButton = document.getElementById('close-cart');
  const cartItemsContainer = document.getElementById('cart-items');
  
  
  document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
      const productCard = event.target.closest('.product-card, .Doggo-card');
      const productName = productCard.querySelector('.product-name, .dog-name').textContent.trim();
      const productPrice = productCard.querySelector('.product-price, .dog-price').textContent.trim();
      addToCart(productName, productPrice);
      animateButton(event.target);
      showNotification(productName);
    }
  });

 
  cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'flex';
    displayCartItems();
  });

 
  closeCartButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });
});


function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1; 
  } else {
    cart.push({ name, price, quantity: 1 }); 
  }
  updateCartCount();
}


function updateCartCount() {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = totalItems;
  cartCount.classList.add('cart-pop');
  setTimeout(() => cartCount.classList.remove('cart-pop'), 300);
}


function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = ''; 
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<li>Your cart is empty!</li>';
  } else {
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} x${item.quantity} - ${item.price}`;
      cartItemsContainer.appendChild(li);
    });
  }
}


function animateButton(button) {
  button.classList.add('clicked');
  setTimeout(() => button.classList.remove('clicked'), 200);
}


function showNotification(productName) {
  const notification = document.createElement('div');
  notification.classList.add('cart-notification');
  notification.textContent = `${productName} added to cart!`;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 2000);
}
