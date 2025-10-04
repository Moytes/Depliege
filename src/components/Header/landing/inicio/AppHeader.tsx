import React from 'react';
import { Layout, Flex, Button, Typography, Grid } from 'antd';
import { BranchesOutlined, UserAddOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { useBreakpoint } = Grid;

interface AppHeaderProps {
    onRegisterClick: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onRegisterClick }) => {
    const screens = useBreakpoint();

    const headerStyle: React.CSSProperties = {
        
        position: 'sticky', 
        top: 0,             
        width: '100%',      
        

        backgroundColor: '#003366',
        display: 'flex',
        alignItems: 'center',
        padding: screens.sm ? (screens.lg ? '0 40px' : '0 24px') : '0 16px',
        height: screens.lg ? 72 : 64,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        zIndex: 10, 
        
    };

    const iconStyle: React.CSSProperties = {
        color: 'white',
        fontSize: screens.sm ? (screens.lg ? '2.5rem' : '2rem') : '1.8rem',
    };

    const titleStyle: React.CSSProperties = {
        color: 'white',
        margin: 0,
        userSelect: 'none',
        fontSize: screens.sm ? (screens.lg ? '22px' : '18px') : '16px',
    };

    const buttonSize = screens.sm ? (screens.lg ? 'large' : 'middle') : 'small';

    return (
        <Header style={headerStyle}>
            <Flex justify="space-between" align="center" style={{ width: '100%' }}>
                <Flex align="center" gap="middle">
                    <BranchesOutlined style={iconStyle} />
                    <Typography.Title level={5} style={titleStyle}>
                        Invernaderos UTEQ
                    </Typography.Title>
                </Flex>
                
                <Button size={buttonSize} type="primary" icon={<UserAddOutlined />} onClick={onRegisterClick}>
                    Registrar
                </Button>
            </Flex>
        </Header>
    );
};