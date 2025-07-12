document.addEventListener('DOMContentLoaded', function() {

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartIcon = document.getElementById('cart-icon');
  const cartDropdown = document.getElementById('cart-dropdown');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');


  const products = [
    {
      id: 1,
      title: "Pink Linen Dress",
      price: 89.99,
      category: "dresses",
      image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "Blush Blazer",
      price: 129.99,
      category: "jackets",
      image: "https://plus.unsplash.com/premium_photo-1671638524448-f7e867e4f92d?q=80&w=674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 3,
      title: "Rose Sweater",
      price: 65.99,
      category: "sweaters",
      image: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 107,
      title: "Beige Shirt",
      price: 49.99,
      category: "shirts",
      image: "https://images.unsplash.com/photo-1630643003427-c45e438acbe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 5,
      title: "Salmon Shirt",
      price: 45.99,
      category: "shirts",
      image: "https://images.unsplash.com/photo-1647288890464-27832f37ec7b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 6,
      title: "Dusty Pink Coat",
      price: 159.99,
      category: "jackets",
      image: "https://images.unsplash.com/flagged/photo-1554033750-2137b5cfd7ce?q=80&w=778&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  function init() {
    renderProducts();
    updateCartCount();
    renderCartItems();
    setupEventListeners();
  }


  function renderProducts(filteredProducts = products) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = filteredProducts.map(product => `
      <div class="product-card" data-category="${product.category}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.title}" onerror="this.src='https://via.placeholder.com/500'">
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `).join('');
  }


  function filterProducts(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => 
      btn.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'all') {
      renderProducts(products);
    } else {
      const filtered = products.filter(p => p.category === category);
      renderProducts(filtered);
    }
  }


  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
    localStorage.setItem('cart', JSON.stringify(cart));
  }


  function renderCartItems() {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
      cartTotal.textContent = '$0.00';
      return;
    }

    cartItemsContainer.innerHTML = cart.map(item => {
      const product = products.find(p => p.id === item.id);
      return `
        <div class="cart-item">
          <img src="${product.image}" alt="${product.title}" class="cart-item-img">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${product.title}</h4>
            <p class="cart-item-price">$${product.price.toFixed(2)}</p>
            <div class="cart-item-quantity">
              <button class="quantity-btn minus" data-id="${product.id}">-</button>
              <span>${item.quantity}</span>
              <button class="quantity-btn plus" data-id="${product.id}">+</button>
            </div>
            <button class="remove-item" data-id="${product.id}">Remove</button>
          </div>
        </div>
      `;
    }).join('');

    const total = cart.reduce((sum, item) => {
      const product = products.find(p => p.id === item.id);
      return sum + (product.price * item.quantity);
    }, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
  }


  function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }
    updateCartCount();
    renderCartItems();
    showCartDropdown();
  }


  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCartItems();
  }


  function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        removeFromCart(productId);
      } else {
        updateCartCount();
        renderCartItems();
      }
    }
  }


  function showCartDropdown() {
    cartDropdown.classList.add('show');
    setTimeout(() => {
      if (cartDropdown.classList.contains('show')) {
        cartDropdown.classList.remove('show');
      }
    }, 3000);
  }


  function setupEventListeners() {

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        filterProducts(this.getAttribute('data-category'));
      });
    });


    cartIcon.addEventListener('click', function(e) {
      e.preventDefault();
      cartDropdown.classList.toggle('show');
    });


    document.querySelector('.close-cart').addEventListener('click', function() {
      cartDropdown.classList.remove('show');
    });


    window.addEventListener('click', function(e) {
      if (!e.target.closest('#cart-icon') && !e.target.closest('.cart-dropdown')) {
        cartDropdown.classList.remove('show');
      }
    });


    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('add-to-cart')) {
        addToCart(parseInt(e.target.getAttribute('data-id')));
      }
      if (e.target.classList.contains('minus')) {
        updateQuantity(parseInt(e.target.getAttribute('data-id')), -1);
      }
      if (e.target.classList.contains('plus')) {
        updateQuantity(parseInt(e.target.getAttribute('data-id')), 1);
      }
      if (e.target.classList.contains('remove-item')) {
        removeFromCart(parseInt(e.target.getAttribute('data-id')));
      }
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });


    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.padding = '15px 0';
      } else {
        navbar.style.background = 'var(--light)';
        navbar.style.padding = '20px 0';
      }
    });
  }


  init();
});