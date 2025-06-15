// script.js
document.addEventListener('DOMContentLoaded', function() {

  const products = [
    {
      id: 1,
      title: "Pink Linen Dress",
      price: 89.99,
      category: "dresses",
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "Blush Blazer",
      price: 129.99,
      category: "jackets",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      title: "Rose Sweater",
      price: 65.99,
      category: "sweaters",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      title: "Pastel Pink Trousers",
      price: 59.99,
      category: "pants",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 5,
      title: "Salmon Shirt",
      price: 45.99,
      category: "shirts",
      image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 6,
      title: "Dusty Pink Coat",
      price: 159.99,
      category: "outerwear",
      image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  function renderProducts() {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = products.map(product => `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `).join('');
  }

  renderProducts();

  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
      const productId = e.target.getAttribute('data-id');
      const product = products.find(p => p.id == productId);
      alert(`Added ${product.title} to your cart!`);
      //add to a cart array or send to backend
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
});