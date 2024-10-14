const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Registrar un nuevo usuario e iniciar sesión
exports.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Crear el usuario
        const user = await User.create({ firstName, lastName, email, password: hashedPassword });

        // Generar token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.status(201).json({
            message: 'Usuario registrado',
            user: { id: user.id, firstName, lastName, email },
            token
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Iniciar sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
