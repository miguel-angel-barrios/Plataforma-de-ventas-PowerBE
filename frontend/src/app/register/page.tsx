"use client"; // Indica que este componente se ejecuta en el cliente y puede usar hooks como useState y useEffect.

import { useState, useEffect } from 'react'; // Importamos los hooks necesarios de React.
import axios from 'axios'; // Importamos Axios para hacer las solicitudes HTTP.
import { useRouter } from 'next/navigation'; // Hook para la navegación en Next.js.
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa'; // Importamos los iconos de usuario, candado y sobre.
import Link from 'next/link'; // Componente para crear enlaces de navegación en Next.js.
import { motion } from 'framer-motion'; // Importamos Framer Motion para las animaciones.
import Logo from '../../components/Logo'; // Importamos el componente de logo.
import styles from './register.module.css'; // Importamos el archivo de estilos CSS específico para esta página.

const RegisterPage = () => {
    // Estado para almacenar los datos del formulario.
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    // Estado para almacenar mensajes de error.
    const [error, setError] = useState('');
    // Estado para controlar si el componente está montado.
    const [isMounted, setIsMounted] = useState(false);
    // Usamos el hook useRouter para poder navegar entre páginas.
    const router = useRouter();

    // Este efecto se ejecuta al montar el componente.
    useEffect(() => {
        setIsMounted(true); // Cambiamos el estado de montado a true.
        return () => setIsMounted(false); // Limpiamos el estado al desmontar el componente.
    }, []);

    // Función para manejar los cambios en los campos del formulario.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Actualizamos el estado del formulario con los nuevos valores.
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Función para manejar el envío del formulario.
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Evitamos el comportamiento por defecto del formulario.
        try {
            // Hacemos la solicitud POST al backend para registrar un nuevo usuario.
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/register`, formData);
            const { token } = response.data; // Obtenemos el token de la respuesta.

            // Almacenamos el token en el almacenamiento local.
            localStorage.setItem('token', token);
            // Redirigimos al usuario a la página de inicio de sesión.
            router.push('/login');
        } catch (error: any) {
            // Si hay un error, actualizamos el estado de error con el mensaje correspondiente.
            setError(error.response?.data?.message || 'Error al registrarse. Por favor, inténtalo de nuevo.');
        }
    };

    // Si el componente no está montado, no renderizamos nada para evitar errores.
    if (!isMounted) return null;

    return (
        <div className={styles.container}>
            <Logo /> {/* Mostramos el componente de logo en la parte superior */}
            <h2 className={styles.title}>Registro</h2> {/* Título de la página */}
            <form onSubmit={handleSubmit} className={styles.form}> {/* Formulario para registrar un nuevo usuario */}
                <div className={styles.inputGroup}>
                    <FaUser className={styles.icon} /> {/* Icono de usuario */}
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Nombre"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <FaUser className={styles.icon} /> {/* Icono de usuario */}
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Apellido"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <FaEnvelope className={styles.icon} /> {/* Icono de correo electrónico */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <FaLock className={styles.icon} /> {/* Icono de candado */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>} {/* Mostramos el mensaje de error si existe */}
                <motion.button
                    type="submit"
                    className={styles.button}
                    whileHover={{ scale: 1.05 }} // Animación al pasar el mouse sobre el botón
                    whileTap={{ scale: 0.95 }} // Animación al hacer clic en el botón
                >
                    Registrarse
                </motion.button>
            </form>
            <p className={styles.redirectText}>
                ¿Ya tiene una cuenta? <Link href="/login" className={styles.link}>Inicia sesión aquí</Link> {/* Opción para iniciar sesión si el usuario ya tiene una cuenta */}
            </p>
        </div>
    );
};

export default RegisterPage; // Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación.
