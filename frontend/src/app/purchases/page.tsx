"use client"; // Indica que este componente se ejecuta en el cliente.

import { useEffect, useState } from 'react'; // Importamos los hooks de React.
import { motion } from 'framer-motion'; // Importamos Framer Motion para las animaciones.
import Navbar from '../../components/Navbar'; // Importa la navbar.
import styles from './purchases.module.css'; // Importamos los estilos para la página de compras.
import axios from 'axios'; // Importamos Axios para realizar solicitudes HTTP.
import { FaBox } from 'react-icons/fa'; // Importa el icono de paquete

const PurchasesPage = () => {
    const [checks, setChecks] = useState([]); // Estado para almacenar las boletas.
    const [error, setError] = useState(''); // Estado para manejar errores.

    useEffect(() => {
        const fetchChecks = async () => {
            try {
                const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
                    },
                };
    
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/checks`, config); // Obtener boletas del backend
                setChecks(response.data); // Actualizar el estado con las boletas
            } catch (error) {
                setError('Error al cargar las compras.'); // Manejo de errores
            }
        };
    
        fetchChecks(); // Llamar a la función para obtener las boletas
    }, []);

    return (
        <div className={styles.container}>
            <Navbar /> {/* Agregamos la navbar */}
            <h1 className={styles.title}>Mis Compras</h1>
            {error && <p className={styles.error}>{error}</p>}
    
            {/* Renderizar las boletas */}
            <div className={styles.checksGrid}>
                {checks.length === 0 ? (
                    <p>No hay compras registradas.</p>
                ) : (
                    checks.map(check => (
                        <motion.div key={check.id} className={styles.checkItem} whileHover={{ scale: 1.05 }}>
                            <div className={styles.checkHeader}>
                                <FaBox className={styles.icon} /> {/* Icono de paquete */}
                                <h2 className={styles.checkTitle}>Boleta #{check.id}</h2>
                            </div>
                            <p className={styles.checkDate}>Fecha: {new Date(check.createdDate).toLocaleDateString()}</p>
                            <p className={styles.checkTotal}>Total: ${check.totalAmount.toFixed(2)}</p>
                            <h3>Detalles:</h3>
                            <ul className={styles.detailList}>
                                {check.purchaseDetails.map((item) => (
                                    <li key={item.id} className={styles.detailItem}>
                                        <span>{item.name}</span> - 
                                        <span>Cantidad: {item.quantity}</span> - 
                                        <span>Precio: ${item.price.toFixed(2)}</span> - 
                                        <span>Subtotal: ${(item.price * item.quantity).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PurchasesPage; // Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación.
