import React from 'react';
import Head from 'next/head';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Plataforma de Ventas' }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Plataforma de Ventas PowerBE" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="container">{children}</main>
        </>
    );
};

export default Layout;
