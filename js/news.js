// Array de noticias (mismo que en noticias.js)
const noticias = [
    {
        title: "Nueva línea de productos agrícolas",
        summary: "Descubre nuestra nueva línea de productos agrícolas que ayudarán a mejorar tu cosecha.",
        content: "Estamos emocionados de anunciar el lanzamiento de una nueva línea de productos agrícolas diseñados para maximizar el rendimiento de tus cultivos. Estos productos han sido desarrollados con la última tecnología y están diseñados para ser eficientes y respetuosos con el medio ambiente.",
        date: "2024-11-01",
        id: 1
    },
    {
        title: "Taller sobre técnicas de siembra",
        summary: "Participa en nuestro taller sobre las últimas técnicas de siembra.",
        content: "Únete a nosotros para un taller práctico sobre las últimas técnicas de siembra que te ayudarán a mejorar tus rendimientos. Los expertos de AgroSur compartirán sus conocimientos y responderán a todas tus preguntas.",
        date: "2024-10-25",
        id: 2
    },
    {
        title: "Consejos para el cuidado de cultivos",
        summary: "Aprende los mejores consejos para el cuidado de tus cultivos.",
        content: "El cuidado adecuado de tus cultivos es esencial para asegurar una buena cosecha. En este artículo, compartimos los mejores consejos para mantener tus cultivos saludables y productivos.",
        date: "2024-10-15",
        id: 3
    }
];

// Función para cargar la noticia específica
function loadNews() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));

    const news = noticias.find(n => n.id === id);
    if (news) {
        const newsContent = document.getElementById('newsContent');
        newsContent.innerHTML = `
            <h2>${news.title}</h2>
            <p><strong>Fecha:</strong> ${news.date}</p>
            <p>${news.content}</p>
            <a href="noticias.html" class="read-more">Volver a Noticias</a>
        `;
    } else {
        document.getElementById('newsContent').innerHTML = '<p>Noticia no encontrada.</p>';
    }
}

// Llamada a la función para cargar la noticia
loadNews();
