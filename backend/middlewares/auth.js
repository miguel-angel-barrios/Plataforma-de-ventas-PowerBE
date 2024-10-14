const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extrae el token del encabezado

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado: No se proporcionó token' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token
        req.user = verified; // Almacena los datos del usuario en el objeto de solicitud
        next(); // Llama al siguiente middleware o ruta
    } catch (err) {
        return res.status(400).json({ message: 'Token inválido' });
    }
};

// Función de middleware para la autorización por rol
const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Acceso denegado: Permisos insuficientes' });
        }
        next(); // Llama al siguiente middleware o ruta
    };
};



module.exports = { authenticateJWT, authorize }
