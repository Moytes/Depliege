import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer } = Layout;

// 1. Estilo actualizado con la nueva paleta de colores
const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: '#003366',
    // 2. Color de texto claro para que sea legible sobre el fondo oscuro
    color: 'rgba(255, 255, 255, 0.65)',
};

export const AdminFooter: React.FC = () => {
    return (
        <Footer style={footerStyle}>
            {/* 3. Se elimina 'type="secondary"' para que el texto herede el nuevo color */}
            <Typography.Text style={{ color: 'inherit' }}>
                ©{new Date().getFullYear()} Invernaderos UTEQ. Todos los derechos reservados.
            </Typography.Text>
        </Footer>
    );
};