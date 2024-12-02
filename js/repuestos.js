document.getElementById('repuestoForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const productName = document.getElementById('productName').value;
    const partNumber = document.getElementById('partNumber').value;
    const quantity = document.getElementById('quantity').value;
    const comments = document.getElementById('comments').value;

    try {
        const response = await fetch('/api/solicitar-repuesto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productName, partNumber, quantity, comments })
        });

        if (response.ok) {
            alert("Su solicitud de repuesto ha sido enviada.");
            document.getElementById('repuestoForm').reset();
        } else {
            throw new Error("Error al enviar la solicitud");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema al enviar su solicitud. Inténtelo nuevamente.");
    }
});
