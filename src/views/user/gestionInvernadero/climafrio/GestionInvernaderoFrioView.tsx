import React, { useState, useEffect, FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Typography,
    Box,
    Button,
    CircularProgress,
    Alert,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
// CAMBIO: Ruta de importación corregida (sube 5 niveles)
import { getColdDataByGreenhouseId } from '../../../../services/admin/gestionuser/Invernaderos/GreenhouseController';
// CAMBIO: Ruta de importación corregida (sube 5 niveles)
import { SensorReadingDto } from '../../../../types/admin/greenhouse/greenhouse';

// CAMBIO: Renombramos el componente
export const GestionInvernaderoFrioView: FC = () => {
    const [data, setData] = useState<SensorReadingDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!id) {
            setError("No se proporcionó un ID de invernadero.");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await getColdDataByGreenhouseId(id);
                if (result.length === 0) {
                    setError("No se encontraron datos para el lado frío de este invernadero.");
                } else {
                    setData(result);
                }
            } catch (err: any) {
                // CAMBIO: Manejo de errores 401/403
                if (err.message && (err.message.includes('401') || err.message.includes('403'))) {
                    setError('No tienes permiso para ver este recurso. (Error 401/403)');
                } else {
                    setError(err.message || "Error al obtener los datos del lado frío.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]); // Se ejecuta cada vez que el ID de la URL cambia

    return (
        <Box sx={{ p: 3 }}>
            <Button
                component={Link}
                // CAMBIO: Ruta de "Volver" actualizada a /user/
                to="/user/gestion-invernadero"
                startIcon={<ArrowBack />}
                sx={{ mb: 2 }}
            >
                Volver a la lista
            </Button>
            <Typography variant="h4" gutterBottom>
                {/* CAMBIO: Título actualizado */}
                Datos del Lado Frío
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Mostrando datos para el Invernadero ID: {id}
            </Typography>

            {loading && <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />}

            {error && !loading && <Alert severity="warning" sx={{ mt: 2 }}>{error}</Alert>}

            {!loading && !error && data.length > 0 && (
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Marca de Tiempo (Timestamp)</TableCell>
                                <TableCell align="right">Temperatura (°C)</TableCell>
                                <TableCell align="right">Humedad (%)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={index}> {/* Idealmente, usa un ID único si la API lo provee */}
                                    <TableCell>
                                        {/* Asumimos que 'timestamp' es un string ISO o un número de Date */}
                                        {new Date(row.timestamp).toLocaleString()}
                                    </TableCell>
                                    <TableCell align="right">{row.temperature.toFixed(2)}</TableCell>
                                    <TableCell align="right">{row.humidity.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};