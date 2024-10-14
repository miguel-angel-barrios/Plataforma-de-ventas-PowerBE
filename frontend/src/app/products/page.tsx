"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar'; // Importa la navbar
import styles from './products.module.css'; // Estilos para la página de productos

const ProductsPage = () => {
    const [products, setProducts] = useState([]); // Estado para almacenar los productos
    const [error, setError] = useState(''); // Estado para manejar errores

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
                    },
                };

                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, config); // Obtener productos del backend
                setProducts(response.data); // Actualizar el estado con los productos
            } catch (error: any) {
                setError(error.response?.data?.message || 'Error al cargar los productos.');
            }
        };

        fetchProducts(); // Llamar a la función para obtener productos
    }, []);

    const addToCart = async (productId) => {
        const productToAdd = products.find(product => product.id === productId);
        if (productToAdd) {
            const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
    
            // Decodificar el token para obtener el userId
            const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificar el token para obtener el ID del usuario
            const userId = decodedToken.id; // Obtener el ID del usuario
    
            // Preparar los datos para la API
            const data = {
                productId: productToAdd.id,
                quantity: 1, // Agregamos una unidad por defecto
            };
    
            try {
                // Hacer una llamada a la API para agregar el producto al carrito en el servidor
                await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/${userId}/add`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
                    },
                });
                // Lógica para agregar al Local Storage...
            } catch (error) {
                console.error('Error al agregar producto al carrito:', error); // Manejo de errores
            }
        }
    };

    return (
        <div className={styles.container}>
            <Navbar /> {/* Agregamos la navbar */}
            <h1 className={styles.title}>Productos</h1>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.productsGrid}>
                {products.map((product) => (
                    <motion.div 
                        key={product.id} 
                        className={styles.productCard} 
                        whileHover={{ scale: 1.05 }} // Animación al pasar el mouse
                    >
                        <h2 className={styles.productName}>{product.name}</h2>
                        <p className={styles.productDescription}>{product.description}</p>
                        <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                        <motion.button 
                            className={styles.button} 
                            onClick={() => addToCart(product.id)} // Llama a la función addToCart
                            whileHover={{ scale: 1.1 }} // Animación al pasar el mouse sobre el botón
                        >
                            Añadir al Carrito
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
