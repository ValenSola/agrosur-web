// Obtiene los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const marca = urlParams.get('marca'); // Obtener la marca desde el parámetro de la URL
const productosContainer = document.getElementById('productos-container');

// URL base, cambia según el entorno
 // Cambiar a https://www.agrosur.com.ar en producción http://localhost:5000

 // Función para cargar los productos desde el backend
 function fetchProducts() {
   if (!marca) {
     productosContainer.innerHTML = '<p>No se especificó una marca en la URL.</p>';
     return;
   }
 
   fetch(`http://localhost:5000/productos/${marca}`)
     .then((response) => {
       if (!response.ok) {
         throw new Error('Error al cargar los productos');
       }
       return response.json();
     })
     .then((data) => {
       if (Array.isArray(data) && data.length > 0) {
         displayProducts(data);
       } else {
         productosContainer.innerHTML = '<p>No se encontraron productos para esta marca.</p>';
       }
     })
     .catch((error) => {
       console.error('Error al cargar los productos:', error);
       productosContainer.innerHTML = '<p>Error al cargar los productos. Intente más tarde.</p>';
     });
 }
 
 function displayProducts(productos) {
   productosContainer.innerHTML = ''; // Limpia el contenedor
   if (productos.length === 0) {
     productosContainer.innerHTML = '<p>No se encontraron productos para esta marca.</p>';
     return;
   }

  productos.forEach((producto) => {
    const imageUrl = `/media/${producto.imagen}`;

    const productCard = `
      <div class="col-md-4">
        <div class="card mb-4">
          <img src="${imageUrl}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text">$${producto.precio}</p>
            <p class="card-text"><small class="text-muted">${producto.categoria}</small></p>
            <button class="btn btn-primary add-to-cart-btn" data-id="${producto._id}">Añadir al carrito</button>
          </div>
        </div>
      </div>
    `;
    productosContainer.innerHTML += productCard;
  });

  // Agregar eventos a los botones
  const cartButtons = document.querySelectorAll('.add-to-cart-btn');
  cartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const productId = event.target.getAttribute('data-id');
      const selectedProduct = productos.find((producto) => producto._id === productId);
      if (selectedProduct) {
        addToCart(selectedProduct);
      }
    });
  });
}


document.addEventListener('DOMContentLoaded', () => {
  // Inicializar el contador del carrito desde localStorage o establecerlo en 0
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  localStorage.removeItem('cart');
  document.getElementById('cart-count').textContent = 0;


  // Cargar los productos disponibles
  fetchProducts();
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cart-count').textContent = cart.length;
}

function addToCart(producto) {
  // Obtener el carrito del localStorage o inicializarlo como un array vacío
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Agregar el producto al carrito
  cart.push(producto);

  // Guardar el carrito actualizado en el localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Actualizar el contador del carrito visualmente
  updateCartCount();
}

