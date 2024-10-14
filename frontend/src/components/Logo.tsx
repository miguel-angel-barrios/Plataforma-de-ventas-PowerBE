"use client";

import { FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Logo: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            {isMounted && (
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }} // Inicializa en escala 0.8 y opacidad 0
                    animate={{ scale: 1, opacity: 1 }} // Animar a escala 1 y opacidad 1
                    transition={{ duration: 0.5, type: 'spring', stiffness: 300 }} // Estilo de animación
                >
                    <FaShoppingCart size={50} color="#f38c07" />
                </motion.div>
            )}
            <h1 style={{ marginLeft: '10px', color: '#c65700' }}>PowerBE Ecommerce</h1>
        </div>
    );
};

export default Logo;
