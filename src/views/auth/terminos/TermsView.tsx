import React from 'react';
import { Card, Typography, Button, Grid, ConfigProvider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 
import { theme, hexToRgba } from '../../../theme/landing/invernadero/theme';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

export const TermsView = () => {
    const screens = useBreakpoint();
    const navigate = useNavigate();

    // Función para volver a la página anterior
    const handleGoBack = () => {
        navigate(-1); // Navega un paso atrás en el historial
    };

    // ----------------------------------------------------------------
    // Objeto de Estilos
    // ----------------------------------------------------------------
    const styles = {
        pageWrapper: (screens: any): React.CSSProperties => ({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: theme.primaryDark,
            padding: '16px',
        }),
        card: (screens: any): React.CSSProperties => ({
            width: screens.xs ? '100%' : '80%',
            maxWidth: '900px',
            height: '90vh',
            maxHeight: '90vh',
            borderRadius: '16px',
            background: theme.primary,
            border: `1px solid ${hexToRgba(theme.textLight, 0.1)}`,
            boxShadow: `0 8px 25px ${hexToRgba(theme.primaryDark, 0.5)}`,
            display: 'flex',
            flexDirection: 'column',
        }),
        cardHeader: {
            borderBottom: `1px solid ${hexToRgba(theme.textLight, 0.1)}`,
            textAlign: 'center',
            background: 'transparent',
            paddingBottom: '16px'
        } as React.CSSProperties,
        
        // ----- AJUSTE DE TEXTO RESPONSIVO -----
        title: {
            margin: 0,
            color: theme.text,
            fontWeight: 600,
            fontSize: screens.md ? '1.75rem' : '1.25rem', // PC (md) | Mobile
        } as React.CSSProperties,
        
        cardBody: (screens: any): React.CSSProperties => ({
            padding: screens.xs ? '16px' : '24px',
            background: 'transparent',
            flex: '1 1 auto', 
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
        }),
        scrollableContent: (screens: any): React.CSSProperties => ({
            flex: '1 1 auto', 
            overflowY: 'auto', 
            paddingRight: '16px', 
            color: theme.textLight,
        }),
        footer: {
            flex: '0 0 auto',
            paddingTop: '24px',
            marginTop: '16px',
            borderTop: `1px solid ${hexToRgba(theme.textLight, 0.1)}`,
            textAlign: 'center',
        } as React.CSSProperties,
        backButton: {
            color: theme.textMuted,
            fontWeight: 500,
        } as React.CSSProperties,
        
        // ----- AJUSTE DE TEXTO RESPONSIVO -----
        sectionTitle: {
            color: theme.text,
            marginTop: '16px',
            marginBottom: '8px',
            fontSize: screens.md ? '1.25rem' : '1.1rem', // PC (md) | Mobile
        } as React.CSSProperties,
        
        // ----- AJUSTE DE TEXTO RESPONSIVO -----
        paragraph: {
            color: theme.textLight,
            lineHeight: '1.6',
            textAlign: 'justify',
            fontSize: screens.md ? '1rem' : '0.9rem', // PC (md) | Mobile
        } as React.CSSProperties,
        
        // ----- AJUSTE DE TEXTO RESPONSIVO -----
        policyTitle: {
            color: theme.text,
            marginTop: '32px',
            marginBottom: '16px',
            paddingTop: '32px',
            borderTop: `1px solid ${hexToRgba(theme.textMuted, 0.3)}`,
            fontSize: screens.md ? '1.5rem' : '1.2rem', // PC (md) | Mobile
        } as React.CSSProperties,
    };

    // Pre-calculamos los colores para el tag <style>
    const scrollbarTrackBg = hexToRgba(theme.primaryDark, 0.5);
    const scrollbarThumbBg = hexToRgba(theme.secondary, 0.7);
    const scrollbarThumbHoverBg = theme.secondary;

    return (
        <ConfigProvider 
            theme={{ 
                token: { 
                    colorPrimary: theme.secondary, 
                    colorLink: theme.accent,       
                    colorText: theme.textLight,    
                } 
            }}
        >
            <style>
                {`
                .scrollable-content::-webkit-scrollbar {
                    width: 8px;
                }
                .scrollable-content::-webkit-scrollbar-track {
                    background: ${scrollbarTrackBg};
                    border-radius: 4px;
                }
                .scrollable-content::-webkit-scrollbar-thumb {
                    background: ${scrollbarThumbBg};
                    border-radius: 4px;
                }
                .scrollable-content::-webkit-scrollbar-thumb:hover {
                    background: ${scrollbarThumbHoverBg};
                }
                .scrollable-content ul {
                    padding-left: 20px; 
                    color: ${theme.textLight}; 
                }
                .scrollable-content li {
                    margin-bottom: 8px; 
                    /* Aplicamos el mismo tamaño de fuente del párrafo */
                    font-size: ${screens.md ? '1rem' : '0.9rem'};
                }
                `}
            </style>

            <div style={styles.pageWrapper(screens)}>
                <Card
                    style={styles.card(screens)}
                    title={
                        // Este título ahora usará styles.title responsivo
                        <Title level={3} style={styles.title}>
                            Términos y Condiciones de Uso
                        </Title>
                    }
                    bodyStyle={styles.cardBody(screens)}
                >
                    {/* El contenido usará los estilos responsivos */}
                    <div className="scrollable-content" style={styles.scrollableContent(screens)}>
                        
                        <Paragraph style={styles.paragraph}>
                            Última actualización: noviembre 2025
                        </Paragraph>

                        <Title level={5} style={styles.sectionTitle}>1. Aceptación de los Términos</Title>
                        <Paragraph style={styles.paragraph}>
                            El uso de la aplicación web Sistema de Clima Controlado para Invernadero implica la aceptación plena de estos Términos y Condiciones. Si el usuario no está de acuerdo, deberá abstenerse de utilizarla.
                        </Paragraph>

                        <Title level={5} style={styles.sectionTitle}>2. Propósito Educativo</Title>
                        <Paragraph style={styles.paragraph}>
                            La Aplicación fue desarrollada como parte de un proyecto académico de la Universidad Tecnológica de Querétaro (UTEQ) con fines educativos, demostrativos y de investigación. Su uso está limitado a entornos formativos o experimentales.
                        </Paragraph>

                        <Title level={5} style={styles.sectionTitle}>3. Acceso y Registro de Usuarios</Title>
                        <Paragraph style={styles.paragraph}>
                            El acceso requiere un registro con credenciales personales. El usuario se compromete a proporcionar información veraz y mantener la confidencialidad de sus datos de inicio de sesión.
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            El equipo de desarrollo y la UTEQ no se responsabilizan por el uso indebido de cuentas personales ni por la divulgación voluntaria de contraseñas.
                        </Paragraph>

                        <Title level={5} style={styles.sectionTitle}>4. Uso Aceptable de la Aplicación</Title>
                        <Paragraph style={styles.paragraph}>
                            El usuario se compromete a:
                            <ul>
                                <li>No manipular ni alterar el código o las funciones de la aplicación.</li>
                                <li>No intentar acceder sin autorización a bases de datos, sensores o servicios externos.</li>
                                <li>No utilizar la aplicación con fines comerciales o ajenos al aprendizaje académico.</li>
                            </ul>
                        </Paragraph>

                        <Title level={5} style={styles.sectionTitle}>5. Recolección y Visualización de Datos</Title>
                        <Paragraph style={styles.paragraph}>
                            La Aplicación muestra en tiempo real los datos ambientales (temperatura, humedad y luminosidad) obtenidos del prototipo físico de invernadero.
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            Estos datos son únicamente informativos y no deben considerarse mediciones certificadas o con fines de control agrícola real.
                        </Paragraph>

                        <Title level={5} style={styles.sectionTitle}>6. Propiedad Intelectual</Title>
                        <Paragraph style={styles.paragraph}>
                            El contenido, diseño y código fuente de la Aplicación pertenecen al equipo desarrollador del proyecto y a la Universidad Tecnológica de Querétaro.
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            Queda prohibida su reproducción, modificación o distribución sin autorización expresa.
                        </Paragraph>

                        <Title level={5} style={styles.sectionTitle}>7. Limitación de Responsabilidad</Title>
                        <Paragraph style={styles.paragraph}>
                            El sistema se entrega “tal cual”, sin garantía de funcionamiento continuo o libre de errores.
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            Ni la UTEQ ni los desarrolladores se responsabilizan por pérdidas de datos, fallos de conexión, errores de hardware o mal uso de la aplicación.
                        </Paragraph>

                        <Title level={5} style={styles.sectionTitle}>8. Modificaciones a los Términos</Title>
                        <Paragraph style={styles.paragraph}>
                            La UTEQ o el equipo desarrollador podrán actualizar estos Términos en cualquier momento. Las modificaciones serán visibles dentro de la aplicación y entrarán en vigor al publicarse.
                        </Paragraph>

                        <Title level={5} style={styles.sectionTitle}>9. Jurisdicción y Ley Aplicable</Title>
                        <Paragraph style={styles.paragraph}>
                            Estos Términos se rigen por las leyes mexicanas. Cualquier disputa será resuelta en los tribunales competentes del estado de Querétaro, México.
                        </Paragraph>

                        
                        {/* --- SECCIÓN DE POLÍTICA DE PRIVACIDAD --- */}
                        
                        <Title level={4} style={styles.policyTitle}>Política de Privacidad</Title>
                        
                        <Paragraph style={styles.paragraph}>
                            Última actualización: noviembre 2025
                        </Paragraph>

                        <Title level={5} style={styles.sectionTitle}>1. Identidad del responsable</Title>
                        <Paragraph style={styles.paragraph}>
                            El equipo desarrollador del proyecto “Sistema de Clima Controlado para Invernadero”, en colaboración con la Universidad Tecnológica de Querétaro (UTEQ), es responsable del tratamiento y resguardo de los datos personales recabados a través de la aplicación web (en adelante.
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            El uso de la Aplicación implica la aceptación plena de esta Política de Privacidad.
                        </Paragraph>

                        <Title level={5} style={styles.sectionTitle}>2. Finalidad del Tratamiento de Datos</Title>
                        <Paragraph style={styles.paragraph}>
                            La información recopilada por la Aplicación será utilizada únicamente con fines educativos, demostrativos y de investigación.
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            Las finalidades específicas incluyen:
                            <ul>
                                <li>Gestionar el acceso de usuarios autorizados al sistema.</li>
                                <li>Monitorear en tiempo real variables ambientales obtenidas por los sensores del prototipo (temperatura, humedad, luminosidad).</li>
                                <li>Almacenar y mostrar los datos recolectados en la interfaz de usuario.</li>
                                <li>Elaborar reportes académicos o métricas de desempeño del proyecto.</li>
                                <li>Garantizar la funcionalidad y seguridad de la plataforma.</li>
                            </ul>
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            En ningún caso los datos serán utilizados con fines comerciales, publicitarios o distintos a los establecidos en esta Política.
                        </Paragraph>

                        <Title level={5} style={styles.sectionTitle}>3. Datos Personales Recabados</Title>
                        <Paragraph style={styles.paragraph}>
                            Durante el uso de la Aplicación, se podrán recopilar los siguientes datos:
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            a) Datos de identificación:
                            <ul>
                                <li>Nombre completo.</li>
                                <li>Correo electrónico institucional.</li>
                                <li>Contraseña o credenciales de acceso (almacenadas de forma cifrada).</li>
                            </ul>
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            b) Datos de interacción con el sistema:
                            <ul>
                                <li>Fechas y horarios de acceso.</li>
                                <li>Acciones realizadas dentro de la Aplicación (inicio de sesión, consultas, reportes generados).</li>
                            </ul>
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            c) Datos técnicos y ambientales:
                            <ul>
                                <li>Lecturas de sensores (temperatura, humedad y luminosidad).</li>
                                <li>Información generada automáticamente por el sistema IoT, sin incluir datos personales sensibles.</li>
                            </ul>
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            No se recaban datos financieros, biométricos ni de ubicación geográfica del usuario.
                        </Paragraph>

                        <Title level={5} style={styles.sectionTitle}>4. Base Legal y Consentimiento</Title>
                        <Paragraph style={styles.paragraph}>
                            El tratamiento de los datos personales se realiza con fundamento en lo dispuesto por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (México).
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            El usuario otorga su consentimiento expreso al registrarse y utilizar la Aplicación.
                        </Paragraph>

                        <Title level={5} style={styles.sectionTitle}>5. Seguridad de la Información</Title>
                        <Paragraph style={styles.paragraph}>
                            La Aplicación implementa medidas de seguridad administrativas, técnicas y físicas para proteger la información personal contra pérdida, uso indebido, acceso no autorizado o divulgación.
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            Entre las medidas aplicadas se incluyen:
                            <ul>
                                <li>Cifrado de contraseñas y comunicaciones mediante protocolo HTTPS.</li>
                                <li>Autenticación de usuarios por roles.</li>
                                <li>Limitación de acceso a la base de datos SQL Server y al servicio en tiempo real de Firebase.</li>
                                <li>Monitoreo de registros de actividad para detectar accesos irregulares.</li>
                            </ul>
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            El usuario reconoce que, si bien se aplican prácticas de seguridad adecuadas, ningún sistema tecnológico es completamente invulnerable, por lo que el uso de la Aplicación implica la aceptación de este riesgo residual.
                        </Paragraph>

                        <Title level={5} style={styles.sectionTitle}>6. Almacenamiento y Transferencia de Datos</Title>
                        <Paragraph style={styles.paragraph}>
                            Los datos personales se almacenan en servidores de Microsoft SQL Server y en la plataforma Firebase para la sincronización en tiempo real.
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            No se realizan transferencias de datos a terceros, salvo cuando:
                            <ul>
                                <li>Sea requerida por una autoridad competente conforme a la ley.</li>
                                <li>Sea necesaria para el cumplimiento de fines académicos o administrativos de la UTEQ, siempre bajo medidas de confidencialidad.</li>
                            </ul>
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            Los datos ambientales (no personales) podrán ser utilizados de forma agregada o anónima para fines de análisis, reportes o publicaciones educativas.
                        </Paragraph>

                        <Title level={5} style={styles.sectionTitle}>7. Conservación y Eliminación de Datos</Title>
                        <Paragraph style={styles.paragraph}>
                            Los datos personales serán conservados únicamente durante la vigencia del proyecto académico o mientras el usuario mantenga una cuenta activa.
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            Una vez concluido el periodo de uso educativo, la información será eliminada de manera segura o anonimizada para su uso estadístico.
                        </Paragraph>

                        <Title level={5} style={styles.sectionTitle}>8. Derechos del Titular de los Datos (ARCO)</Title>
                        <Paragraph style={styles.paragraph}>
                            El usuario, como titular de los datos personales, podrá ejercer los derechos de Acceso, Rectificación, Cancelación y Oposición (ARCO), así como revocar su consentimiento, mediante solicitud escrita dirigida al correo institucional del equipo desarrollador o a la coordinación académica de la UTEQ.
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            La solicitud deberá incluir:
                            <ul>
                                <li>Nombre completo y correo electrónico del titular.</li>
                                <li>Descripción clara del derecho que desea ejercer.</li>
                                <li>Documentos que acrediten su identidad.</li>
                            </ul>
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            El equipo responderá dentro de un plazo máximo de 20 días hábiles.
                        </Paragraph>

                        <Title level={5} style={styles.sectionTitle}>10. Enlaces Externos</Title>
                        <Paragraph style={styles.paragraph}>
                            La Aplicación puede incluir enlaces a plataformas externas (por ejemplo, Firebase, GitHub o recursos institucionales de la UTEQ).
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            La presente Política no se aplica a dichos sitios, por lo que se recomienda revisar las políticas de privacidad de cada proveedor.
                        </Paragraph>

                        <Title level={5} style={styles.sectionTitle}>11. Modificaciones a la Política de Privacidad</Title>
                        <Paragraph style={styles.paragraph}>
                            El equipo desarrollador se reserva el derecho de actualizar esta Política cuando sea necesario, notificando a los usuarios a través de la propia Aplicación o los canales institucionales correspondientes.
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            La versión más reciente siempre estará disponible en el apartado “Política de Privacidad” de la Aplicación.
                        </Paragraph>

                        <Title level={5} style={styles.sectionTitle}>12. Contacto</Title>
                        <Paragraph style={styles.paragraph}>
                            Para dudas, solicitudes o ejercicio de derechos relacionados con la privacidad, el usuario podrá comunicarse a:
                        </Paragraph>
                        <Paragraph style={styles.paragraph}>
                            Equipo de Desarrollo – Sistema de Clima Controlado para Invernadero
                            <br />
                            Universidad Tecnológica de Querétaro (UTEQ)
                            <br />
                            soporte.invernadero@uteq.edu.mx
                            <br />
                            Av. Pie de la Cuesta 2501, Col. Nacional, Querétaro, Qro., México.
                        </Paragraph>

                    </div>
                    
                    {/* Pie de página con el botón "Volver" */}
                    <div style={styles.footer}>
                        <Button
                            type="link"
                            icon={<ArrowLeftOutlined />}
                            onClick={handleGoBack}
                            style={styles.backButton}
                        >
                            Volver
                        </Button>
                    </div>
                </Card>
            </div>
        </ConfigProvider>
    );
};