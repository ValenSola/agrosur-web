document.addEventListener('DOMContentLoaded', () => {
    const newsList = document.getElementById('newsList');

    // Ejemplo de datos de noticias
    const noticias = [
        {
            title: 'La serie del campo',
            image: '../media/Carrusel maquinaria campo_5.jpg',
            summary: '10 historias del agro argentino que inspiran y que llegan con la segunda temporada.',
            content: 'Contenido completo de la noticia 1.'
        },
        {
            title: 'Fin de la caída del trigo, maíz en espera y soja en carrera',
            image: './media/noticia_3.jpg',
            summary: 'El cultivo de invierno tendrá pérdidas, pero menores a las esperadas; la campaña gruesa está en marcha y la humedad acelera los tiempos.',
            content: 'Contenido completo de la noticia 2.'
        },
        {
            title: 'Aplicaron un novedoso fertilizante al maíz y comparten los resultados',
            image: './media/noticia_1.jpg',
            summary: 'lograron hasta 14.409 kg/ha vs. 9000 del testigo.',
            content: 'Contenido completo de la noticia 3.'
        },
        {
            title: 'La práctica agrícola con múltiples beneficios que aplica solo uno de cada 10 productores',
            image: './media/noticia_2.jpg',
            summary: 'ayuda a tener mejores rindes.',
            content: 'Contenido completo de la noticia 3.'
        },
        {
            title: 'Cuánto cuesta una hectárea tecnológica?',
            image: './media/Carrusel maquinaria campo_3.jpg',
            summary: 'Para la nueva campaña.',
            content: 'Contenido completo de la noticia 3.'
        },
        {
            title: 'Contra las malezas',
            image: './media/Carrusel maquinaria campo_4.jpg',
            summary: 'El usuario selecciona los componentes deseados en un proceso de diferentes etapas y obtiene información del orden correcto de carga de los productos en el tanque.',
            content: 'Contenido completo de la noticia 3.'
        },
        {
            title: 'Récord.',
            image: './media/noticia_7.png',
            summary: 'Las importaciones de soja de septiembre marcaron un registro histórico para ese mes.',
            content: 'Contenido completo de la noticia 3.'
        },
        {
            title: 'Productores de Estados Unidos cosechan una campaña histórica de soja y maíz',
            image: './media/Carrusel maquinaria campo_1.jpg',
            summary: 'Hay poco almacenamiento y se niegan a vender por los bajos precios.',
            content: 'Contenido completo de la noticia 3.'
        },
        {
            title: 'En el campo',
            image: './media/Carrusel maquinaria campo_2.jpg',
            summary: 'La fórmula para tener una renta del 40% en dólares en 6 meses.',
            content: 'Contenido completo de la noticia 3.'
        }
    ];

    // Cargar noticias
    noticias.forEach((noticia) => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        newsItem.innerHTML = `
            <img src="${noticia.image}" alt="${noticia.title}" class="news-image">
            <h2>${noticia.title}</h2>
            <p>${noticia.summary}</p>
            <a href="../news.html" class="read-more" data-content="${noticia.content}">Leer más</a>
        `;

        newsList.appendChild(newsItem);
    });

    // Evento para el botón "Leer más"
    newsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('read-more')) {
            const content = event.target.dataset.content;
            alert(content); // Mostrar el contenido completo (puedes cambiarlo a una ventana modal o a otra página)
        }
    });
});
