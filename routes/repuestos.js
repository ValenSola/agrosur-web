const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configuración de nodemailer para Ferozo
let transporter = nodemailer.createTransport({
    host: 'smtp.ferozo.com', // Servidor SMTP de Ferozo
    port: 587, // Usa el puerto 587 para STARTTLS o 465 para SSL/TLS
    secure: false, // Cambia a true si usas el puerto 465
    auth: {
        user: process.env.EMAIL_USER, // Usuario del correo
        pass: process.env.EMAIL_PASS  // Contraseña del correo
    },
    tls: {
        rejectUnauthorized: false // Ignora errores si es necesario
    }
});

router.post('/api/solicitar-repuesto', async (req, res) => {
    const { productName, partNumber, quantity, comments } = req.body;

    // Obtener la hora actual en formato 24 horas
    const currentHour = new Date().getHours();
    
    // Establecer el destinatario según el horario
    const recipientEmail = currentHour < 12
        ? 'repuestosbelgrano2@agrosur.com.ar'
        : 'repuestosbelgrano@agrosur.com.ar';

    // Configuración del mensaje de correo
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: 'SOLICITUD DE REPUESTO AGROSUR',
        html: `
            <h2>Solicitud de Repuesto</h2>
            <p><strong>Producto:</strong> ${productName}</p>
            <p><strong>Número de Parte:</strong> ${partNumber}</p>
            <p><strong>Cantidad:</strong> ${quantity}</p>
            <p><strong>Comentarios:</strong> ${comments}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Solicitud enviada exitosamente" });
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        res.status(500).json({ message: "Error al enviar la solicitud" });
    }
});


module.exports = router;
