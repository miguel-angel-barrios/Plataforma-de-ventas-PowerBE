"use client"; // Indica que este componente se ejecuta en el cliente

import { useEffect, useState } from 'react'; // Importamos los hooks de React.
import { motion } from 'framer-motion'; // Importamos Framer Motion para las animaciones.
import Navbar from '../../components/Navbar'; // Importamos la navbar.
import styles from './confirmation.module.css'; // Importamos los estilos para la página de confirmación.

const ConfirmationPage = () => {
    const [cartItems, setCartItems] = useState([]); // Estado para almacenar los artículos del carrito.
    const [total, setTotal] = useState(0); // Estado para almacenar el total de la compra.

    useEffect(() => {
        const items = JSON.parse(sessionStorage.getItem('cartItems')) || []; // Obtener los artículos del carrito.
        setCartItems(items); // Actualizar el estado con los artículos del carrito.
        
        // Calcular el total de la compra.
        const calculatedTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(calculatedTotal); // Actualizar el estado del total.
    }, []);

    return (
        <div className={styles.container}>
            <Navbar /> {/* Agregamos la navbar */}
            <h1 className={styles.title}>Confirmación de Compra</h1>
            {cartItems.length === 0 ? (
                <p>No hay artículos en el carrito para confirmar.</p>
            ) : (
                <motion.div className={styles.bill} whileHover={{ scale: 1.05 }}>
                    <h2>Detalles de la Compra</h2>
                    <div className={styles.items}>
                        {cartItems.map(item => (
                            <div key={item.id} className={styles.item}>
                                <h3>{item.name}</h3>
                                <p>Descripción: {item.description}</p>
                                <p>Cantidad: {item.quantity}</p>
                                <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <h2 className={styles.total}>Total: ${total.toFixed(2)}</h2>
                </motion.div>
            )}
        </div>
    );
};

export default ConfirmationPage; // Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación.
