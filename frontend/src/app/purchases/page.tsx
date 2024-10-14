"use client"; // Indica que este componente se ejecuta en el cliente.

import { useEffect, useState } from 'react'; // Importamos los hooks de React.
import { motion } from 'framer-motion'; // Importamos Framer Motion para las animaciones.
import Navbar from '../../components/Navbar'; // Importa la navbar.
import styles from './purchases.module.css'; // Importamos los estilos para la página de compras.

const PurchasesPage = () => {
    const [purchases, setPurchases] = useState([]); // Estado para almacenar las compras.

    useEffect(() => {
        const items = JSON.parse(sessionStorage.getItem('purchases')) || []; // Obtener las compras del sessionStorage.
        setPurchases(items); // Actualizar el estado con las compras.
    }, []);

    return (
        <div className={styles.container}>
            <Navbar /> {/* Agregamos la navbar */}
            <h1 className={styles.title}>Mis Compras</h1>
            {purchases.length === 0 && <p>No tienes compras registradas.</p>}

            <div className={styles.purchasesGrid}>
                {purchases.map((purchase, index) => (
                    <motion.div key={index} className={styles.purchaseCard} whileHover={{ scale: 1.05 }}>
                        <h2 className={styles.purchaseDate}>Fecha: {new Date(purchase.date).toLocaleDateString()}</h2>
                        <h3>Detalles de la compra:</h3>
                        <ul>
                            {purchase.items.map(item => (
                                <li key={item.id}>
                                    {item.name} - Cantidad: {item.quantity} - Precio: ${item.price}
                                </li>
                            ))}
                        </ul>
                        <p className={styles.total}>Total: ${purchase.total}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PurchasesPage; // Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación.
