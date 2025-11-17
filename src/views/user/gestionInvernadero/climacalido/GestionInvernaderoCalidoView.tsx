import { useState, useEffect, FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Box, Button, CircularProgress, Alert, Paper, Grid, Divider, Tabs, Tab } from '@mui/material';
import { ArrowBack, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { getHotDataByGreenhouseId } from '../../../../services/admin/gestionuser/Invernaderos/GreenhouseController';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface HotDataReading {
  time: string;
  temp_c: number;
  hum_c: number;
  lum_c: number;
}

interface ChartDataPoint {
  date: number;
  value: number;
}

interface KPICardProps {
  title: string;
  value: string;
  change?: number;
  trend?: 'up' | 'down';
}

const KPICard: FC<KPICardProps> = ({ title, value, change, trend }) => {
  const changeColor = change && change > 0 ? 'green' : 'red';
  const TrendIcon = change && change > 0 ? ArrowUpward : ArrowDownward;

  return (
    <Paper sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="h5">{value}</Typography>
      {change !== undefined && (
        <Typography color={changeColor} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {change.toFixed(2)}% {trend && <TrendIcon fontSize="small" />}
        </Typography>
      )}
    </Paper>
  );
};

const SimpleLineChart: FC<{ data: HotDataReading[]; field: keyof Pick<HotDataReading, 'temp_c' | 'hum_c' | 'lum_c'>; label: string; color: string }> = ({ data, field, label, color }) => {
  const chartData = data.map((d) => ({
    date: new Date(d.time).getTime(),
    value: d[field],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" type="number" domain={['dataMin', 'dataMax']} tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString()} />
        <YAxis />
        <RechartTooltip labelFormatter={(label) => new Date(label).toLocaleString()} />
        <Legend />
        <Line type="monotone" dataKey="value" stroke={color} name={label} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const GestionInvernaderoCalidoView: FC = () => {
  const [data, setData] = useState<HotDataReading[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
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
    const interval = setInterval(fetchData, 10000); // Actualizar cada 10 segundos para simular tiempo real
    return () => clearInterval(interval);
  }, [id]);

  const sortedData = [...data].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  const now = new Date().getTime();

  const latest = sortedData[sortedData.length - 1] || { temp_c: NaN, hum_c: NaN, lum_c: NaN, time: '' };

  const filterData = (startTime: number) => sortedData.filter((d) => new Date(d.time).getTime() > now - startTime);

  const lastHourData = filterData(3600 * 1000);
  const previousHourData = sortedData.filter((d) => {
    const time = new Date(d.time).getTime();
    return time > now - 2 * 3600 * 1000 && time <= now - 3600 * 1000;
  });

  const lastDayData = filterData(24 * 3600 * 1000);
  const previousDayData = sortedData.filter((d) => {
    const time = new Date(d.time).getTime();
    return time > now - 2 * 24 * 3600 * 1000 && time <= now - 24 * 3600 * 1000;
  });

  const lastMonthData = filterData(30 * 24 * 3600 * 1000);
  const previousMonthData = sortedData.filter((d) => {
    const time = new Date(d.time).getTime();
    return time > now - 2 * 30 * 24 * 3600 * 1000 && time <= now - 30 * 24 * 3600 * 1000;
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
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <KPICard title="Temperatura Promedio" value={`${avgTemp.toFixed(2)} °C`} change={changeTemp} trend={changeTemp > 0 ? 'up' : 'down'} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <KPICard title="Humedad Promedio" value={`${avgHum.toFixed(2)} %`} change={changeHum} trend={changeHum > 0 ? 'up' : 'down'} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <KPICard title="Luminosidad Promedio" value={`${avgLum.toFixed(2)} lux`} change={changeLum} trend={changeLum > 0 ? 'up' : 'down'} />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle1" gutterBottom>Tendencia de Temperatura</Typography>
                <SimpleLineChart data={periodData} field="temp_c" label="Temperatura (°C)" color="#8884d8" />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle1" gutterBottom>Tendencia de Humedad</Typography>
                <SimpleLineChart data={periodData} field="hum_c" label="Humedad (%)" color="#82ca9d" />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle1" gutterBottom>Tendencia de Luminosidad</Typography>
                <SimpleLineChart data={periodData} field="lum_c" label="Luminosidad (lux)" color="#ffc658" />
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    );
  };

  const renderRealTimeSection = () => (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Datos en Tiempo Real</Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <KPICard title="Temperatura Actual" value={isNaN(latest.temp_c) ? 'N/A' : `${latest.temp_c.toFixed(2)} °C`} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <KPICard title="Humedad Actual" value={isNaN(latest.hum_c) ? 'N/A' : `${latest.hum_c.toFixed(2)} %`} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <KPICard title="Luminosidad Actual" value={isNaN(latest.lum_c) ? 'N/A' : `${latest.lum_c.toFixed(2)} lux`} />
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Button component={Link} to="/user/gestion-invernadero" startIcon={<ArrowBack />} sx={{ mb: 2 }}>
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
        <>
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} centered>
            <Tab label="Tiempo Real" />
            <Tab label="Última Hora" />
            <Tab label="Último Día" />
            <Tab label="Último Mes" />
          </Tabs>
          {tabValue === 0 && renderRealTimeSection()}
          {tabValue === 1 && renderSection('Datos de la Última Hora', lastHourData, previousHourData)}
          {tabValue === 2 && renderSection('Datos del Último Día', lastDayData, previousDayData)}
          {tabValue === 3 && renderSection('Datos del Último Mes', lastMonthData, previousMonthData)}
        </>
      )}
    </Box>
  );
};