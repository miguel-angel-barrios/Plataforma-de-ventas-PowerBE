"use client"; // Indica que este componente se ejecuta en el cliente y puede usar hooks como useState y useEffect.

import { useEffect, useState } from 'react'; // Importamos los hooks de React.
import axios from 'axios'; // Importamos Axios para realizar solicitudes HTTP.
import { motion } from 'framer-motion'; // Importamos Framer Motion para las animaciones.
import Navbar from '../../components/Navbar'; // Importa la navbar.
import styles from './products.module.css'; // Importamos los estilos CSS para la página de productos.

const ProductsPage = () => {
    const [products, setProducts] = useState([]); // Estado para almacenar los productos.
    const [error, setError] = useState(''); // Estado para manejar errores.
    const [editingProduct, setEditingProduct] = useState(null); // Estado para manejar el producto en edición.
    const [newProduct, setNewProduct] = useState({ // Estado para manejar el formulario de producto nuevo o en edición.
        name: '',
        description: '',
        category: '',
        subCategory: '',
        price: ''
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local.
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados.
                    },
                };

                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, config); // Obtener productos del backend.
                setProducts(response.data); // Actualizar el estado con los productos.
            } catch (error: any) {
                setError(error.response?.data?.message || 'Error al cargar los productos.'); // Manejo de errores.
            }
        };

        fetchProducts(); // Llamar a la función para obtener productos.
    }, []);

    const handleInputChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value // Actualizamos el estado con los valores de entrada.
        });
    };

    const addOrUpdateProduct = async () => {
        const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local.
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Incluir el token en los encabezados.
            },
        };

        try {
            if (editingProduct) {
                // Actualizar producto existente.
                await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${editingProduct.id}`, newProduct, config);
                setProducts(products.map(p => (p.id === editingProduct.id ? { ...p, ...newProduct } : p))); // Actualizar el estado de productos.
            } else {
                // Agregar nuevo producto.
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, newProduct, config);
                setProducts([...products, response.data]); // Agregar el nuevo producto al estado.
            }
            // Limpiar el formulario y estado de edición.
            setNewProduct({ name: '', description: '', category: '', subCategory: '', price: '' });
            setEditingProduct(null); // Resetear el producto en edición.

            // Recargar la página para reflejar los cambios
            window.location.reload();
        } catch (error) {
            setError('Error al agregar o actualizar el producto.'); // Manejo de errores.
        }
    };

    const editProduct = (product) => {
        setEditingProduct(product); // Establecer el producto en edición.
        setNewProduct({
            name: product.name,
            description: product.description,
            category: product.category,
            subCategory: product.subCategory,
            price: product.price
        });
    };

    const deleteProduct = async (productId) => {
        const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local.
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Incluir el token en los encabezados.
            },
        };

        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productId}`, config); // Hacer la solicitud para eliminar el producto.
            setProducts(products.filter(p => p.id !== productId)); // Actualizar el estado eliminando el producto.
        } catch (error) {
            setError('Error al eliminar el producto.'); // Manejo de errores.
        }
    };

    return (
        <div className={styles.container}>
            <Navbar /> {/* Agregamos la navbar */}
            <h1 className={styles.title}>Productos</h1>
            {error && <p className={styles.error}>{error}</p>}

            {/* Formulario para agregar o editar producto */}
            <div className={styles.formContainer}>
                <h2>{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre del producto"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    className={styles.input}
                />&nbsp;&nbsp;
                <input
                    type="text"
                    name="description"
                    placeholder="Descripción"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    className={styles.input}
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Categoría"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    className={styles.input}
                />&nbsp;&nbsp;
                <input
                    type="text"
                    name="subCategory"
                    placeholder="Subcategoría"
                    value={newProduct.subCategory}
                    onChange={handleInputChange}
                    className={styles.input}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Precio"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    className={styles.input}
                />&nbsp;&nbsp;
                <motion.button
                    onClick={addOrUpdateProduct}
                    className={styles.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {editingProduct ? 'Actualizar' : 'Agregar'}
                </motion.button>
            </div>

            {/* Lista de productos */}
            <div className={styles.productsGrid}>
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        className={styles.productCard}
                        whileHover={{ scale: 1.05 }}
                    >
                        <h2 className={styles.productName}>{product.name}</h2>
                        <p className={styles.productDescription}>{product.description}</p>
                        <p className={styles.productCategory}>{product.category} - {product.subCategory}</p>
                        <p className={styles.productPrice}>${product.price ? product.price.toFixed(2) : '0.00'}</p>
                        <motion.button
                            onClick={() => editProduct(product)}
                            className={styles.editButton}
                            whileHover={{ scale: 1.1 }}
                        >
                            Editar
                        </motion.button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <motion.button
                            onClick={() => deleteProduct(product.id)}
                            className={styles.deleteButton}
                            whileHover={{ scale: 1.1 }}
                        >
                            Eliminar
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage; // Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación.
