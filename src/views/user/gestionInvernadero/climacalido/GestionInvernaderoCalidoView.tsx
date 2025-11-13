import React, { useState, useEffect, FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import {Typography,Box,Button,CircularProgress,Alert,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { getHotDataByGreenhouseId } from '../../../../services/admin/gestionuser/Invernaderos/GreenhouseController';

interface HotDataReading {
    time: string; // o Date
    temp_c: number;
    hum_c: number;
    lum_c: number;
}

export const GestionInvernaderoCalidoView: FC = () => {
    const [data, setData] = useState<HotDataReading[]>([]);
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
                const result: HotDataReading[] = await getHotDataByGreenhouseId(id) as any;
                
                if (!result || result.length === 0) {
                    setError("No se encontraron datos para el lado caliente de este invernadero.");
                } else {
                    setData(result);
                }
            } catch (err: any) {
                if (err.message && (err.message.includes('401') || err.message.includes('403'))) {
                    setError('No tienes permiso para ver este recurso. (Error 401/403)');
                } else {
                    setError(err.message || "Error al obtener los datos del lado caliente.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]); 

    return (
        <Box sx={{ p: 3 }}>
            <Button
                component={Link}
                to="/user/gestion-invernadero"
                startIcon={<ArrowBack />}
                sx={{ mb: 2 }}
            >
                Volver a la lista
            </Button>
            <Typography variant="h4" gutterBottom>
                Datos del Lado Caliente
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
                                <TableCell>Marca de Tiempo</TableCell>
                                <TableCell align="right">Temp. (Lado Caliente)</TableCell>
                                <TableCell align="right">Hum. (Lado Caliente)</TableCell>
                                <TableCell align="right">Lum. (Lado Caliente)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={index}> 
                                    <TableCell>
                                        {new Date(row.time).toLocaleString()}
                                    </TableCell>
                                    <TableCell align="right">{row.temp_c?.toFixed(2) ?? 'N/A'}</TableCell>
                                    <TableCell align="right">{row.hum_c?.toFixed(2) ?? 'N/A'}</TableCell>
                                    <TableCell align="right">{row.lum_c?.toFixed(2) ?? 'N/A'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};