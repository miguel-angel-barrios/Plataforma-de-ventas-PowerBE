// src/app/page.tsx
import Link from 'next/link';
import Layout from '../components/Layout';
import Logo from '../components/Logo'; // Importa el componente de logo
import styles from './page.module.css'; // Importa estilos específicos para esta página

const HomePage = () => {
    return (
        <Layout title="Bienvenido a la Plataforma de Ventas">
            <div className={styles.container}>
                <Logo /> {/* Aquí se agrega el logo */}
                <h1 className={styles.title}>Bienvenido a Ecommerce PowerBE</h1>
                <p className={styles.description}>
                    Esta aplicación está diseñada para facilitar la gestión de ventas y productos. 
                    Aquí podrás administrar tus productos, clientes y mucho más de una manera eficiente y organizada.
                </p>
                <p className={styles.description}>
                    Si ya tienes una cuenta, <Link className={styles.link} href="/login">inicia sesión</Link> para continuar. 
                    Si no, <Link className={styles.link} href="/register">regístrate</Link> y únete a nuestra comunidad.
                </p>
                <Link href="/login">
                    <button className={styles.button}>Iniciar Sesión</button>
                </Link>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <Link href="/register">
                    <button className={styles.button}>Registrarse</button>
                </Link>
            </div>
        </Layout>
    );
};

export default HomePage;
