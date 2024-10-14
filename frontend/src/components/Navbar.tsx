"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaShoppingCart, FaReceipt, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Logo from './Logo'; // Importar el componente de Logo
import styles from './Navbar.module.css'; // Asegúrate de que este archivo exista

const Navbar: React.FC = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Logo /> {/* Usamos el componente de Logo */}
            </div>
            <ul className={styles.navList}>
                <li>
                    <motion.button 
                        className={styles.navItem} 
                        onClick={() => router.push('/products')}
                        whileHover={{ scale: 1.1 }} // Animación al pasar el mouse
                    >
                        <FaHome className={styles.icon} />
                        Productos
                    </motion.button>
                </li>
                <li>
                    <motion.button 
                        className={styles.navItem} 
                        onClick={() => router.push('/cart')}
                        whileHover={{ scale: 1.1 }} // Animación al pasar el mouse
                    >
                        <FaShoppingCart className={styles.icon} />
                        Mi Carrito
                    </motion.button>
                </li>
                <li>
                    <motion.button 
                        className={styles.navItem} 
                        onClick={() => router.push('/purchases')}
                        whileHover={{ scale: 1.1 }} // Animación al pasar el mouse
                    >
                        <FaReceipt className={styles.icon} />
                        Mis Compras
                    </motion.button>
                </li>
                <li>
                    <motion.button 
                        className={styles.navItem} 
                        onClick={handleLogout}
                        whileHover={{ scale: 1.1 }} // Animación al pasar el mouse
                    >
                        <FaSignOutAlt className={styles.icon} />
                        Cerrar Sesión
                    </motion.button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
