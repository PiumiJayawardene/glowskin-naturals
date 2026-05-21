/* GlowSkin Naturals — main.js */

function trackEvent(eventName, eventLocation) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, {
      event_category: 'button_click',
      event_label: eventLocation,
      value: 1
    });

    console.log('[GA4] Event tracked:', eventName, '| Location:', eventLocation);
  }
}

/* NAVBAR */

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    this.textContent = navLinks.classList.contains('open') ? '×' : '☰';
  });
}

function closeMenu() {
  if (!navLinks || !navToggle) return;
  navLinks.classList.remove('open');
  navToggle.textContent = '☰';
}

window.addEventListener('scroll', function () {
  if (!navbar) return;

  if (window.scrollY > 60) {
    navbar.style.boxShadow = '0 4px 24px rgba(150,80,60,.12)';
  } else {
    navbar.style.boxShadow = '0 2px 16px rgba(150,80,60,.06)';
  }
});

document.addEventListener('click', function (e) {
  if (navbar && !navbar.contains(e.target)) {
    closeMenu();
  }
});

/* CART STORAGE */

let cart = JSON.parse(localStorage.getItem('glowskinCart')) || [];

function saveCart() {
  localStorage.setItem('glowskinCart', JSON.stringify(cart));
}

function getCartQuantity(productName) {
  const item = cart.find(item => item.name === productName);
  return item ? item.quantity : 0;
}

function addToCart(productName, price) {
  const existingItem = cart.find(item => item.name === productName);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: productName,
      price: Number(price),
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  updateProductButtons();

  trackEvent('add_to_cart', productName);

  if (typeof fbq !== 'undefined') {
    fbq('track', 'AddToCart', {
      content_name: productName,
      value: Number(price),
      currency: 'LKR'
    });
  }
}

function increaseQty(productName) {
  const item = cart.find(item => item.name === productName);

  if (item) {
    item.quantity += 1;
    saveCart();
    updateCartUI();
    updateProductButtons();
  }
}

function decreaseQty(productName) {
  const item = cart.find(item => item.name === productName);

  if (!item) return;

  item.quantity -= 1;

  if (item.quantity <= 0) {
    cart = cart.filter(cartItem => cartItem.name !== productName);
  }

  saveCart();
  updateCartUI();
  updateProductButtons();
}

function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  saveCart();
  updateCartUI();
  updateProductButtons();
}

/* CART PAGE UI */

function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartCount) {
    cartCount.textContent = totalItems;
  }

  if (cartTotal) {
    cartTotal.textContent = 'LKR ' + totalPrice.toLocaleString();
  }

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty. Add a product to get started.</p>';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">LKR ${item.price.toLocaleString()} each</div>
      </div>

      <div class="cart-qty">
        <button class="qty-btn" onclick="decreaseQty('${item.name}')">−</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" onclick="increaseQty('${item.name}')">+</button>
      </div>

      <button class="remove-btn" onclick="removeFromCart('${item.name}')">
        Remove
      </button>
    </div>
  `).join('');
}

/* PRODUCT BUTTON CHANGES TO − 1 + */

function setupProductButtons() {
  document.querySelectorAll('.add-cart-btn').forEach(button => {
    button.addEventListener('click', function () {
      const productName = button.dataset.name;
      const productPrice = button.dataset.price;

      addToCart(productName, productPrice);
    });
  });

  updateProductButtons();
}

function updateProductButtons() {
  document.querySelectorAll('.add-cart-btn').forEach(button => {
    const productName = button.dataset.name;
    const productPrice = button.dataset.price;
    const quantity = getCartQuantity(productName);

    if (quantity > 0) {
      button.outerHTML = `
        <div class="product-qty-control" data-name="${productName}" data-price="${productPrice}">
          <button type="button" onclick="decreaseQty('${productName}')">−</button>
          <span>${quantity}</span>
          <button type="button" onclick="increaseQty('${productName}')">+</button>
        </div>
      `;
    }
  });

  document.querySelectorAll('.product-qty-control').forEach(control => {
    const productName = control.dataset.name;
    const productPrice = control.dataset.price;
    const quantity = getCartQuantity(productName);

    if (quantity === 0) {
      control.outerHTML = `
        <button class="btn btn-primary btn-sm add-cart-btn"
                data-name="${productName}"
                data-price="${productPrice}">
          <i class="fa-solid fa-bag-shopping"></i>
          Add to Cart
        </button>
      `;

      setupProductButtons();
    } else {
      const span = control.querySelector('span');
      if (span) span.textContent = quantity;
    }
  });
}

/* CHECKOUT */

function checkoutCart() {
  if (cart.length === 0) {
    alert('Your cart is empty. Please add a product first.');
    return;
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  trackEvent('checkout_click', 'cart');

  if (typeof fbq !== 'undefined') {
    fbq('track', 'InitiateCheckout', {
      value: totalPrice,
      currency: 'LKR'
    });
  }

  alert('Checkout feature is ready. Next, connect this to PayHere or an order form.');
}

/* ANIMATIONS */

function setupAnimations() {
  const animateElements = document.querySelectorAll(
    '.product-card, .review-card, .social-card, .contact-card, .value-item'
  );

  if (!animateElements.length) return;

  animateElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity .5s ease ${i * 0.06}s, transform .5s ease ${i * 0.06}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animateElements.forEach(el => observer.observe(el));
}

/* RATING BAR ANIMATION */

function setupRatingBars() {
  const ratingSection = document.querySelector('.rating-summary');

  if (!ratingSection) return;

  const barObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.rbar-fill').forEach(bar => {
        const target = bar.style.width;
        bar.style.width = '0%';

        setTimeout(() => {
          bar.style.width = target;
        }, 100);
      });

      barObserver.disconnect();
    }
  }, { threshold: 0.3 });

  barObserver.observe(ratingSection);
}

/* INITIAL LOAD */

document.addEventListener('DOMContentLoaded', function () {
  updateCartUI();
  setupProductButtons();
  setupAnimations();
  setupRatingBars();
});

console.log('[GlowSkin] Cart system loaded successfully.');