document.addEventListener('DOMContentLoaded', () => {
    // Buscador en Productos
    const productSearch = document.getElementById('productSearch');
    const productFilter = document.getElementById('productFilter');
    const productList = document.getElementById('productList');

    productSearch.addEventListener('input', searchProducts);
    productFilter.addEventListener('change', filterProducts);

    // Función de búsqueda
    function searchProducts() {
        const query = productSearch.value.toLowerCase();
        // Filtrar productos de acuerdo con la base de datos y `query`
    }

    // Función de filtro
    function filterProducts() {
        const category = productFilter.value;
        // Filtrar productos de acuerdo con la categoría
    }

    // Enviar mensaje a WhatsApp
    productList.addEventListener('click', (e) => {
        if (e.target.classList.contains('consultBtn')) {
            const productType = e.target.dataset.type; // maquinaria o básico
            const whatsappNumber = productType === 'maquinaria' ? 'NUMERO_MAQUINARIA' : 'NUMERO_EMPRESA';
            const productName = e.target.dataset.name;
            window.open(`https://wa.me/${whatsappNumber}?text=Consulta sobre el producto: ${productName}`);
        }
    });

    // Cargar noticias automáticamente
    function loadNews() {
        fetch('URL_NOTICIAS_API') // Endpoint para obtener noticias diariamente
            .then(response => response.json())
            .then(data => {
                const newsList = document.getElementById('newsList');
                data.forEach(newsItem => {
                    const newsElement = document.createElement('div');
                    newsElement.className = 'news-item';
                    newsElement.innerHTML = `<h3>${newsItem.title}</h3><p>${newsItem.description}</p>`;
                    newsList.appendChild(newsElement);
                });
            })
            .catch(error => console.error('Error cargando noticias:', error));
    }

    loadNews();

    // Enviar formulario de contacto por email
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        fetch('API_ENDPOINT_EMAIL', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => alert('Mensaje enviado correctamente'))
        .catch(error => console.error('Error al enviar el mensaje:', error));
    });
});
