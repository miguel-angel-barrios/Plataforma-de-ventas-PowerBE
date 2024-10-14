"use client"; // Indica que este componente se ejecuta en el cliente.

import { useEffect, useState } from 'react'; // Importamos los hooks de React.
import { motion } from 'framer-motion'; // Importamos Framer Motion para las animaciones.
import Navbar from '../../components/Navbar'; // Importa la navbar.
import styles from './cart.module.css'; // Importamos los estilos para la página del carrito.
import axios from 'axios'; // Importamos Axios para realizar solicitudes HTTP.

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]); // Estado para almacenar los artículos del carrito.

    useEffect(() => {
        const items = JSON.parse(sessionStorage.getItem('cartItems')) || []; // Obtener los artículos del carrito del sessionStorage.
        setCartItems(items); // Actualizar el estado con los artículos del carrito.
    }, []);

    const removeFromCart = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id); // Filtrar los artículos para eliminar el seleccionado.
        setCartItems(updatedCart); // Actualizar el estado del carrito.
        sessionStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Actualizar el sessionStorage.
    };

    const increaseQuantity = (id) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity + 1; // Incrementar la cantidad
                return { ...item, quantity: newQuantity }; // Devolver el objeto actualizado
            }
            return item;
        });
        setCartItems(updatedCart);
        sessionStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Actualizar el sessionStorage.
    };

    const decreaseQuantity = (id) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1; // No permitir que la cantidad sea menor que 1
                return { ...item, quantity: newQuantity }; // Devolver el objeto actualizado
            }
            return item;
        });
        setCartItems(updatedCart);
        sessionStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Actualizar el sessionStorage.
    };

    // Calcular el total del carrito
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2); // Asegúrate de usar el precio correcto.
    };

    const handleCheckout = async () => {
        const totalAmount = calculateTotal(); // Calcula el total del carrito
        const purchaseDetails = cartItems.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            subtotal: (item.price * item.quantity).toFixed(2) // Calcular el subtotal para cada artículo
        }));
    
        try {
            const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
                },
            };
    
            // Enviar la solicitud POST para crear un nuevo cheque
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/checks`, {
                totalAmount,
                purchaseDetails
            }, config);
    
            // Redirigir a la página de confirmación de compra
            window.location.href = '/confirmation';
        } catch (error) {
            console.error('Error al guardar la confirmación de la compra:', error); // Manejo de errores
        }
    };
    
    

    return (
        <div className={styles.container}>
            <Navbar /> {/* Agregamos la navbar */}
            <h1 className={styles.title}>Carrito</h1>
            {cartItems.length === 0 && <p>No hay artículos en el carrito.</p>}

            <div className={styles.cartGrid}>
                {cartItems.map(item => (
                    <motion.div key={item.id} className={styles.cartItem} whileHover={{ scale: 1.05 }}>
                        <h2 className={styles.productName}>{item.name}</h2>
                        <p className={styles.productDescription}>{item.description}</p>
                        <p className={styles.productPrice}>Precio Total: ${(item.price * item.quantity).toFixed(2)}</p> {/* Aquí se calcula el subtotal */}
                        <p className={styles.productQuantity}>Cantidad: {item.quantity}</p>
                        <div className={styles.quantityButtons}>
                            <motion.button
                                className={styles.quantityButton}
                                whileHover={{ scale: 1.1 }}
                                onClick={() => decreaseQuantity(item.id)} // Decrementar cantidad
                            >
                                -
                            </motion.button>
                            <motion.button
                                className={styles.quantityButton}
                                whileHover={{ scale: 1.1 }}
                                onClick={() => increaseQuantity(item.id)} // Incrementar cantidad
                            >
                                +
                            </motion.button>
                        </div>
                        <motion.button
                            className={styles.removeButton}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => removeFromCart(item.id)} // Eliminar el artículo del carrito
                        >
                            Eliminar
                        </motion.button>
                    </motion.div>
                ))}
            </div>

            {/* Muestra el total del carrito */}
            <h2 className={styles.total}>Total: ${calculateTotal()}</h2>

            {/* Botón para confirmar la compra */}
            <motion.button
                className={styles.confirmButton} // Asegúrate de que aquí se utiliza la clase confirmButton
                whileHover={{ scale: 1.05 }}
                onClick={handleCheckout}
            >
                Confirmar Compra
            </motion.button>
        </div>
    );
};

export default CartPage; // Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación.
