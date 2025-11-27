import { useState, useEffect, FC, ChangeEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Box, Button, CircularProgress, Alert, Paper, Grid as Grid2, Divider, Tabs, Tab, TextField } from '@mui/material';
import { ArrowBack, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { getHotDataByGreenhouseId } from '../../../../services/admin/gestionuser/Invernaderos/GreenhouseController';
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip as RechartTooltip,Legend,ResponsiveContainer,} from 'recharts';

interface HotDataReading {
  time: string;
  temp_c: number;
  hum_c: number;
  lum_c: number;
}

interface KPICardProps {
  title: string;
  value: string;
  change?: number;
  trend?: 'up' | 'down';
}

const KPICard: FC<KPICardProps> = ({ title, value, change, trend }) => {
  const changeColor = change === undefined || change === 0 ? 'text.secondary' : (change > 0 ? 'success.main' : 'error.main');
  const TrendIcon = change && change > 0 ? ArrowUpward : ArrowDownward;

  return (
    <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
      <Typography variant="subtitle1" gutterBottom>{title}</Typography>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>{value}</Typography>
      {change !== undefined && (
        <Typography color={changeColor} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {change.toFixed(2)}% {trend && <TrendIcon fontSize="small" />}
        </Typography>
      )}
    </Paper>
  );
};

const SimpleLineChart: FC<{
  data: HotDataReading[];
  field: keyof Pick<HotDataReading, 'temp_c' | 'hum_c' | 'lum_c'>;
  label: string;
  color: string
}> = ({ data, field, label, color }) => {

  const chartData = data.map((d) => ({
    date: new Date(d.time).getTime(),
    value: d[field],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          type="number"
          domain={['dataMin', 'dataMax']}
          tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString()}
          style={{ fontSize: '10px' }} 
        />
        <YAxis style={{ fontSize: '10px' }} /> 
        <RechartTooltip labelFormatter={(label) => new Date(label).toLocaleString()} />
        <Legend wrapperStyle={{ fontSize: '12px' }} /> 
        <Line type="monotone" dataKey="value" stroke={color} name={label} dot={false} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const GestionInvernaderoCalidoView: FC = () => {
  const [data, setData] = useState<HotDataReading[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0); 
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const { id } = useParams<{ id: string }>();

  const fetchData = async () => {
    if (!id) {
      setError("No se proporcionó un ID de invernadero.");
      setLoading(false);
      return;
    }
    setError(null);
    try {
      const result: HotDataReading[] = await getHotDataByGreenhouseId(id) as any;
      if (!result || result.length === 0) {
        setError("No se encontraron datos para el lado caliente de este invernadero.");
        setData([]);
      } else {
        const sorted = result.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
        setData(sorted);
      }
    } catch (err: any) {
      if (err.message && (err.message.includes('401') || err.message.includes('403'))) {
        setError('No tienes permiso para ver este recurso. (Error 401/403)');
      } else {
        setError(err.message || "Error al obtener los datos del lado caliente.");
      }
    } finally {
      if (loading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [id]);

  const sortedData = data;
  const now = new Date().getTime();

  const latest = sortedData[sortedData.length - 1] || { temp_c: NaN, hum_c: NaN, lum_c: NaN, time: '' };

  const filterData = (startTime: number) => sortedData.filter((d) => new Date(d.time).getTime() > now - startTime);

  const lastMonthDuration = 30 * 24 * 3600 * 1000;
  const lastMonthData = filterData(lastMonthDuration);
  const previousMonthData = sortedData.filter((d) => {
    const time = new Date(d.time).getTime();
    return time > now - 2 * lastMonthDuration && time <= now - lastMonthDuration;
  });

  const calculateAverage = (readings: HotDataReading[], field: keyof Pick<HotDataReading, 'temp_c' | 'hum_c' | 'lum_c'>) => {
    if (!readings.length) return NaN;
    const sum = readings.reduce((acc, r) => acc + r[field], 0);
    return sum / readings.length;
  };

  const calculateChange = (currentAvg: number, prevAvg: number) => {
    if (isNaN(prevAvg) || prevAvg === 0) return 0;
    return ((currentAvg - prevAvg) / prevAvg) * 100;
  };

  const renderSection = (title: string, periodData: HotDataReading[], prevData: HotDataReading[]) => {
    const avgTemp = calculateAverage(periodData, 'temp_c');
    const avgHum = calculateAverage(periodData, 'hum_c');
    const avgLum = calculateAverage(periodData, 'lum_c');

    const prevAvgTemp = calculateAverage(prevData, 'temp_c');
    const prevAvgHum = calculateAverage(prevData, 'hum_c');
    const prevAvgLum = calculateAverage(prevData, 'lum_c');

    const changeTemp = calculateChange(avgTemp, prevAvgTemp);
    const changeHum = calculateChange(avgHum, prevAvgHum);
    const changeLum = calculateChange(avgLum, prevAvgLum);

    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>{title}</Typography>
        <Divider sx={{ mb: 2 }} />
        {periodData.length === 0 ? (
          <Alert severity="info">No hay datos disponibles para este período.</Alert>
        ) : (
          <>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <KPICard title="Temperatura Promedio" value={`${avgTemp.toFixed(2)} °C`} change={changeTemp} trend={changeTemp > 0 ? 'up' : 'down'} />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <KPICard title="Humedad Promedio" value={`${avgHum.toFixed(2)} %`} change={changeHum} trend={changeHum > 0 ? 'up' : 'down'} />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <KPICard title="Luminosidad Promedio" value={`${avgLum.toFixed(2)} lux`} change={changeLum} trend={changeLum > 0 ? 'up' : 'down'} />
              </Grid2>
            </Grid2>
            <Grid2 container spacing={2} sx={{ mt: 4 }}>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle1" gutterBottom>Tendencia de Temperatura</Typography>
                <SimpleLineChart data={periodData} field="temp_c" label="Temperatura (°C)" color="#e91e63" />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle1" gutterBottom>Tendencia de Humedad</Typography>
                <SimpleLineChart data={periodData} field="hum_c" label="Humedad (%)" color="#2196f3" />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle1" gutterBottom>Tendencia de Luminosidad</Typography>
                <SimpleLineChart data={periodData} field="lum_c" label="Luminosidad (lux)" color="#ffeb3b" />
              </Grid2>
            </Grid2>
          </>
        )}
      </Box>
    );
  };

  const renderRealTimeSection = () => (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Datos en Tiempo Real (Actualización cada 10s)</Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <KPICard title="Temperatura Actual" value={isNaN(latest.temp_c) ? 'N/A' : `${latest.temp_c.toFixed(2)} °C`} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <KPICard title="Humedad Actual" value={isNaN(latest.hum_c) ? 'N/A' : `${latest.hum_c.toFixed(2)} %`} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <KPICard title="Luminosidad Actual" value={isNaN(latest.lum_c) ? 'N/A' : `${latest.lum_c.toFixed(2)} lux`} />
        </Grid2>
      </Grid2>
      {latest.time && (
        <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'right' }}>
          Última Lectura: {new Date(latest.time).toLocaleString()}
        </Typography>
      )}
    </Box>
  );

  const renderCustomRangeSection = () => {

    const customData = sortedData.filter((d) => {
      if (!startDate || !endDate) return false;

      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      const time = new Date(d.time).getTime();
      return time >= start && time <= end;
    });

    const avgTemp = calculateAverage(customData, 'temp_c');
    const avgHum = calculateAverage(customData, 'hum_c');
    const avgLum = calculateAverage(customData, 'lum_c');

    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Gráficas de Sensores por Rango Personalizado 📊</Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid2 container spacing={2} sx={{ mb: 3 }} alignItems="center">
          <Grid2 size={{ xs: 12, sm: 6, md: 5 }}>
            <TextField
              label="Fecha/Hora de Inicio"
              type="datetime-local"
              fullWidth
              value={startDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 5 }}>
            <TextField
              label="Fecha/Hora de Fin"
              type="datetime-local"
              fullWidth
              value={endDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 2 }}>
            <Button variant="contained" fullWidth disabled={!startDate || !endDate} sx={{ height: '56px' }}> 
              Aplicar Rango
            </Button>
          </Grid2>
        </Grid2>

        {customData.length === 0 && (startDate || endDate) && (
          <Alert severity="warning">No se encontraron datos en el rango seleccionado.</Alert>
        )}
        {customData.length === 0 && (!startDate && !endDate) && (
          <Alert severity="info">Ingresa un rango de fecha y hora para graficar los datos.</Alert>
        )}

        {customData.length > 0 && (
          <>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <KPICard title="Temperatura Promedio" value={`${avgTemp.toFixed(2)} °C`} />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <KPICard title="Humedad Promedio" value={`${avgHum.toFixed(2)} %`} />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <KPICard title="Luminosidad Promedio" value={`${avgLum.toFixed(2)} lux`} />
              </Grid2>
            </Grid2>

            <Grid2 container spacing={2} sx={{ mt: 4 }}>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle1" gutterBottom>Tendencia de Temperatura</Typography>
                <SimpleLineChart data={customData} field="temp_c" label="Temperatura (°C)" color="#e91e63" />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle1" gutterBottom>Tendencia de Humedad</Typography>
                <SimpleLineChart data={customData} field="hum_c" label="Humedad (%)" color="#2196f3" />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle1" gutterBottom>Tendencia de Luminosidad</Typography>
                <SimpleLineChart data={customData} field="lum_c" label="Luminosidad (lux)" color="#ffeb3b" />
              </Grid2>
            </Grid2>
          </>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 3 } }}> {/* Ajuste el padding para pantallas pequeñas */}
      <Button component={Link} to="/user/gestion-invernadero" startIcon={<ArrowBack />} sx={{ mb: 2 }}>
        Volver a la lista
      </Button>
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
        Datos del Lado Caliente
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Mostrando datos para el Invernadero ID: **{id}**
      </Typography>

      {loading && <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />}

      {error && !loading && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {!loading && !error && data.length > 0 && (
        <>
          <Tabs
            value={tabValue}
            onChange={(e, v) => setTabValue(v)}
            centered
            sx={{ borderBottom: 1, borderColor: 'divider', mt: 2, '& .MuiTabs-flexContainer': { flexWrap: 'wrap' } }}
            variant="scrollable" // Permite el desplazamiento en pantallas muy pequeñas
            allowScrollButtonsMobile // Muestra botones de desplazamiento en móvil
          >
            <Tab label="Tiempo Real" />
            <Tab label="Último Mes" />
            <Tab label="Rango Personalizado" />
          </Tabs>
          {tabValue === 0 && renderRealTimeSection()}
          {tabValue === 1 && renderSection('Datos del Último Mes', lastMonthData, previousMonthData)}
          {tabValue === 2 && renderCustomRangeSection()}
        </>
      )}
    </Box>
  );
};