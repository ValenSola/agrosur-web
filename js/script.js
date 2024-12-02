document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggle-button');
    const cardContainer = document.getElementById('card-container');
    const closeButton = document.getElementById('close-button');

    // Muestra u oculta el contenedor al hacer clic en la flecha
    toggleButton.addEventListener('click', function() {
        if (cardContainer.style.display === 'none' || cardContainer.style.display === '') {
            cardContainer.style.display = 'block'; // Muestra el contenedor
        } else {
            cardContainer.style.display = 'none'; // Oculta el contenedor
        }
    });

    // Cierra el contenedor al hacer clic en el botón de cerrar
    closeButton.addEventListener('click', function() {
        cardContainer.style.display = 'none'; // Oculta el contenedor
    });
});
window.addEventListener('resize', function() {
    // Adjust layout based on window size
    const cards = document.querySelectorAll('.card');
    if (window.innerWidth < 600) {
        cards.forEach(card => {
            card.style.marginBottom = '10px'; // Adjust margin for smaller screens
        });
    } else {
        cards.forEach(card => {
            card.style.marginBottom = '20px'; // Reset margin for larger screens
        });
    }
});

// Seleccionamos el navbar
const navbar = document.querySelector('.navbar');
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
  const currentScrollPosition = window.pageYOffset;
  
  if (currentScrollPosition > lastScrollPosition) {
    // Desplazando hacia abajo - ocultar el navbar
    navbar.classList.add('hide');
  } else {
    // Desplazando hacia arriba - mostrar el navbar
    navbar.classList.remove('hide');
  }
  
  // Actualizar la última posición de scroll
  lastScrollPosition = currentScrollPosition;
});

// Variables de usuario y tokens para MATBA-ROFEX
const user = "Valen23112003";
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxMDczMzQ4LCJpYXQiOjE3MzA5ODY5NDgsImp0aSI6IjJjYTZlZjk5MjMxMjQ2YzdhMWYyY2UzNTU0MzY2MGU4IiwidXNlcl9pZCI6MjQ5fQ.iMayj4LYCcl0V9SV2UksDyy1034tQXFamtRs1CKPq4w";
const refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczMTMzMjU0OCwiaWF0IjoxNzMwOTg2OTQ4LCJqdGkiOiIyY2ViM2IxZDIwMjQ0ZDRiYWQ4MzY2MjUwZDFkODc0OCIsInVzZXJfaWQiOjI0OX0.Ir8pl7KviLg3GvlPRBemZnsDdqj3Ee1EDAYGyUgi1Bs";

// Función para obtener el token de acceso actualizado usando el refresh token
async function refrescarToken() {
    try {
        const response = await fetch("https://api.matbarofex.com.ar/v2/token/refresh/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ refresh: refreshToken })
        });

        if (response.ok) {
            const data = await response.json();
            token = data.access;
            console.log("Token actualizado con éxito");
        } else {
            console.error("Error al refrescar el token:", response.status);
        }
    } catch (error) {
        console.error("Error en la solicitud de refresh token:", error);
    }
}

// Llamar a refrescar el token cada 7 días
setInterval(refrescarToken, 7 * 24 * 60 * 60 * 1000); // 7 días en milisegundos

// Función para obtener las cotizaciones de soja y maíz
async function obtenerCotizacionesSemillas() {
    try {
        const response = await fetch("https://api.matbarofex.com.ar/v2/futures", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();

            // Filtrar datos para obtener soja y maíz
            const sojaData = data.find(item => item.symbol === "SOJ");
            const maizData = data.find(item => item.symbol === "MAI");

            // Actualizar valores en la tabla de la interfaz
            if (sojaData) {
                document.getElementById("fechaSoja").textContent = sojaData.trade_date;
                document.getElementById("precioSoja").textContent = `$${sojaData.settlement.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;
                document.getElementById("variacionSoja").textContent = sojaData.change > 0 ? "↑" : "↓";
            }
            if (maizData) {
                document.getElementById("fechaMaiz").textContent = maizData.trade_date;
                document.getElementById("precioMaiz").textContent = `$${maizData.settlement.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;
                document.getElementById("variacionMaiz").textContent = maizData.change > 0 ? "↑" : "↓";
            }
        } else {
            console.error("Error al obtener cotizaciones de semillas:", response.status);
        }
    } catch (error) {
        console.error("Error en la solicitud de cotizaciones de semillas:", error);
    }
}

// Función para obtener cotización del dólar
async function obtenerCotizacionDolar() {
    try {
        const responseDolar = await fetch("https://dolarapi.com/v1/dolares/oficial");
        const dolarData = await responseDolar.json();

        if (dolarData && dolarData.compra && dolarData.venta) {
            document.getElementById("compraDolar").textContent = `$${dolarData.compra.toFixed(2)}`;
            document.getElementById("ventaDolar").textContent = `$${dolarData.venta.toFixed(2)}`;
            document.getElementById("varDolar").textContent = dolarData.venta > dolarData.compra ? "↑" : "↓";
        } else {
            console.error("Datos de dólar no disponibles");
        }
    } catch (error) {
        console.error("Error al obtener la cotización del dólar:", error);
    }
}

// Función principal para inicializar la carga de datos
function cargarDatos() {
    obtenerCotizacionDolar();
    obtenerCotizacionesSemillas();
}

// Llamar a la función principal al cargar la página
document.addEventListener("DOMContentLoaded", cargarDatos);

document.querySelectorAll('.expandable-card').forEach(card => {
    card.addEventListener('click', function () {
        this.classList.toggle('closed');
        this.classList.toggle('open');
    });
});

