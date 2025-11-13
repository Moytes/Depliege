import  { useState, useEffect, FC, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {Typography,Box,Button,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,IconButton,CircularProgress,Alert,Tooltip,Modal,TextField,Stack} from '@mui/material';
import {Add,Edit,DeleteOutline,AcUnit,WbSunny} from '@mui/icons-material';

import {getGreenhousesByUser,addGreenhouse,patchGreenhouse,deleteGreenhouse} from '../../../services/admin/gestionuser/Invernaderos/GreenhouseController';
import { GetGreenhouseDto, AddGreenhouseRequest, PatchGreenhouseRequest } from '../../../types/admin/greenhouse/greenhouse';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

export const GestionInvernaderoView: FC = () => {
    const [greenhouses, setGreenhouses] = useState<GetGreenhouseDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedGreenhouse, setSelectedGreenhouse] = useState<GetGreenhouseDto | null>(null);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    const [newGreenhouseData, setNewGreenhouseData] = useState<AddGreenhouseRequest>({ name: '', location: '' });
    const [editGreenhouseData, setEditGreenhouseData] = useState<PatchGreenhouseRequest>({ name: '', location: '' });

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getGreenhousesByUser();
            setGreenhouses(data);
        } catch (err: any) {
            if (err.message && (err.message.includes('401') || err.message.includes('403'))) {
                setError('No tienes permiso para ver este recurso. (Error 401/403)');
            } else {
                setError(err.message || 'Error al obtener los invernaderos.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleNavigateToCold = (id: string) => {
        navigate(`/user/gestion-invernadero/${id}/frio`);
    };

    const handleNavigateToHot = (id: string) => {
        navigate(`/user/gestion-invernadero/${id}/calido`);
    };

    const handleOpenCreateModal = () => {
        setNewGreenhouseData({ name: '', location: '' });
        setIsCreateModalOpen(true);
    };
    const handleCloseCreateModal = () => setIsCreateModalOpen(false);
    
    const handleCreateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewGreenhouseData({ ...newGreenhouseData, [e.target.name]: e.target.value });
    };

    const handleCreateSubmit = async () => {
        try {
            await addGreenhouse(newGreenhouseData);
            handleCloseCreateModal();
            fetchData(); 
        } catch (err: any) {
            setError(err.message || 'Error al crear el invernadero.');
        }
    };

    const handleOpenEditModal = (greenhouse: GetGreenhouseDto) => {
        setSelectedGreenhouse(greenhouse);
        setEditGreenhouseData({ name: greenhouse.name, location: greenhouse.location });
        setIsEditModalOpen(true);
    };
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedGreenhouse(null);
    };

    const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditGreenhouseData({ ...editGreenhouseData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async () => {
        if (!selectedGreenhouse) return;
        try {
            await patchGreenhouse(selectedGreenhouse.id, editGreenhouseData);
            handleCloseEditModal();
            fetchData(); 
        } catch (err: any) {
            setError(err.message || 'Error al actualizar el invernadero.');
        }
    };

    const handleOpenDeleteModal = (greenhouse: GetGreenhouseDto) => {
        setSelectedGreenhouse(greenhouse);
        setIsDeleteModalOpen(true);
    };
    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedGreenhouse(null);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedGreenhouse) return;
        try {
            await deleteGreenhouse(selectedGreenhouse.id);
            handleCloseDeleteModal();
            fetchData(); 
        } catch (err: any) {
            setError(err.message || 'Error al eliminar el invernadero.');
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Gestión de Invernaderos
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleOpenCreateModal}
                >
                    Añadir Invernadero
                </Button>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {greenhouses.length === 0 && !loading ? (
                <Typography>No se encontraron invernaderos.</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Ubicación</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {greenhouses.map((g) => (
                                <TableRow key={g.id}>
                                    <TableCell>{g.name}</TableCell>
                                    <TableCell>{g.location}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Datos Fríos">
                                            <IconButton onClick={() => handleNavigateToCold(g.id)} color="primary">
                                                <AcUnit />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Datos Calientes">
                                            <IconButton onClick={() => handleNavigateToHot(g.id)} color="warning">
                                                <WbSunny />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Editar">
                                            <IconButton onClick={() => handleOpenEditModal(g)} color="secondary">
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Eliminar">
                                            <IconButton onClick={() => handleOpenDeleteModal(g)} color="error">
                                                <DeleteOutline />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Modal open={isCreateModalOpen} onClose={handleCloseCreateModal}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2">Añadir Nuevo Invernadero</Typography>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre"
                            name="name"
                            value={newGreenhouseData.name}
                            onChange={handleCreateChange}
                            fullWidth
                        />
                        <TextField
                            label="Ubicación"
                            name="location"
                            value={newGreenhouseData.location}
                            onChange={handleCreateChange}
                            fullWidth
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <Button onClick={handleCloseCreateModal} variant="outlined">Cancelar</Button>
                            <Button onClick={handleCreateSubmit} variant="contained">Guardar</Button>
                        </Box>
                    </Stack>
                </Box>
            </Modal>

            <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2">Editar Invernadero</Typography>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre"
                            name="name"
                            value={editGreenhouseData.name}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            label="Ubicación"
                            name="location"
                            value={editGreenhouseData.location}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <Button onClick={handleCloseEditModal} variant="outlined">Cancelar</Button>
                            <Button onClick={handleEditSubmit} variant="contained">Actualizar</Button>
                        </Box>
                    </Stack>
                </Box>
            </Modal>

            <Modal open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2">Confirmar Eliminación</Typography>
                    <Typography sx={{ mt: 2 }}>
                        ¿Estás seguro de que deseas eliminar el invernadero "{selectedGreenhouse?.name}"? Esta acción no se puede deshacer.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3 }}>
                        <Button onClick={handleCloseDeleteModal} variant="outlined">Cancelar</Button>
                        <Button onClick={handleDeleteConfirm} variant="contained" color="error">Eliminar</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};