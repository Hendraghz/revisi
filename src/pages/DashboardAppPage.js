import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Modal, Typography, Button, Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { useJsApiLoader } from '@react-google-maps/api';
import TabPanel from '@mui/lab/TabPanel';

// components
// sections
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
  SummaryTally,
  SummaryTransportasi,
  SummaryPPAL,
  SummaryDepoPetikemas,
  SummaryAngkutanPerairan,
} from '../sections/@dashboard/app';
import { useAuth } from '../config/AuthContext';
import useToken from '../config/useRequireAuth';
import Maps from '../components/maps/Maps';
import { mapOptions } from '../components/maps/MapConfiguration';
import Geo from '../components/maps/Geo';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [count, setCount] = useState([]);
  const [bongkarMuat, setBongkarMuat] = useState([]);
  const [Tally, setTally] = useState([]);
  const [Transportasi, setTransportasi] = useState([]);
  const [Pelabuhan, setPelabuhan] = useState([]);
  const [PPAL, setPPAL] = useState([]);
  const [DepoPetikemas, setDepoPetikemas] = useState([]);

  const { checkAndLogin } = useToken();
  const navigateTo = useNavigate();
  const { token, login, logout } = useAuth();
  const { tanggal, setTanggal } = useState([]);

  useEffect(() => {
    checkAndLogin();
    const storedToken = localStorage.getItem('token');
    if (!token && storedToken) {
      login(storedToken);
    }

    if (!token && !storedToken) {
      navigateTo('/login');
    }
    // refreshTokens();
    getCount();
    getDepo();
    getBongkarMuAT();
    getPelabuhan();
    getTally();
    getPPAL();
  }, [token, login]);

  // const { isLoaded } = useJsApiLoader({
  //   id: mapOptions.googleMapApiKey,
  //   googleMapsApiKey: mapOptions.googleMapApiKey,
  // });

  const getCount = async () => {
    const response = await axios.get('http://localhost:3001/total', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCount(response.data.data);
  };

  const getBongkarMuAT = async () => {
    const response = await axios.get('http://localhost:3001/sumbm');
    setBongkarMuat(response.data.data);
  };
  const chartLabelBongkar = bongkarMuat.map((item) => item.bulan);
  const chartDatabongkar = [
    {
      name: 'Volume KG/TON',
      type: 'line',
      fill: 'solid',
      data: bongkarMuat.map((item) => item.bongkar), // Replace 'yourDataField' with the actual field from your API response
    },
    {
      name: 'Muat KG/TON',
      type: 'line',
      fill: 'solid',
      data: bongkarMuat.map((item) => item.muat), // Replace 'yourDataField' with the actual field from your API response
    },
  ];

  const getTally = async () => {
    const response = await axios.get('http://localhost:3001/sumtrans');
    setTransportasi(response.data.data);
  };

  const chartLabeltransportasi = Transportasi.map((item) => item.bulan);
  const chartDatatotaltrans = [
    {
      name: 'Total',
      type: 'line',
      fill: 'solid',
      data: Transportasi.map((item) => item.total), // Replace 'yourDataField' with the actual field from your API response
    },
  ];

  const getDepo = async () => {
    const response = await axios.get('http://localhost:3001/sumpk');
    setDepoPetikemas(response.data.data);
  };

  const chartLabelDepo = DepoPetikemas.map((item) => item.bulan);
  const chartDatatotalDepo = [
    {
      name: 'Total',
      type: 'line',
      fill: 'solid',
      data: DepoPetikemas.map((item) => item.total), // Replace 'yourDataField' with the actual field from your API response
    },
  ];

  const getPelabuhan = async () => {
    const response = await axios.get('http://localhost:3001/sumpelabuhan');
    setPelabuhan(response.data.data);
  };

  const chartLabelPelabuhan = Pelabuhan.map((item) => item.bulan);
  const chartDataPelabuhan = [
    {
      name: 'Bongkar',
      type: 'line',
      fill: 'solid',
      data: Pelabuhan.map((item) => item.bongkar), // Replace 'yourDataField' with the actual field from your API response
    },
    {
      name: 'Muat',
      type: 'line',
      fill: 'solid',
      data: Pelabuhan.map((item) => item.muat), // Replace 'yourDataField' with the actual field from your API response
    },
  ];

  const getPPAL = async () => {
    const response = await axios.get('http://localhost:3001/sumppal');
    setPPAL(response.data.data);
  };

  const chartLabelPPAL = PPAL.map((item) => item.bulan);
  const chartDatatotalPPAL = [
    {
      name: 'Total',
      type: 'line',
      fill: 'solid',
      data: PPAL.map((item) => item.total), // Replace 'yourDataField' with the actual field from your API response
    },
  ];

  const theme = useTheme();

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600, // Adjust the width as needed
    height: 400, // Adjust the height as needed
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    textAlign: 'center',
  };

  const buttonStyle = {
    color: 'white',
    '&:hover': {
      backgroundColor: '#45a049',
    },
  };

  const linkStyle = {
    display: 'block',
    textDecoration: 'none',
    color: '#1e88e5',
    margin: '8px 0',
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Helmet>
        <title> Dashboard | Sistem Pelayaran </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Selamat Datang Kembali
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={9} lg={12}>
            {/* <Maps isLoaded={isLoaded} /> */}
            <Geo />
          </Grid>
          <Grid item xs={12} md={9} lg={12}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Bongkar Muat" value="1" />
                    <Tab label="Tally Mandiri" value="2" />
                    <Tab label="Jasa Pengurusan Transportasi" value="3" />
                    <Tab label="Depo Petikemas" value="4" />
                    <Tab label="Angkutan Perairan Pelabuhan" value="5" />
                    <Tab label="Peralatan Atau Jasa Terkait Angkatan Laut" value="6" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <AppWebsiteVisits
                    title="Bongkar Muat"
                    subheader="Summary"
                    chartLabels={chartLabelBongkar}
                    chartData={chartDatabongkar}
                  />
                </TabPanel>
                <TabPanel value="2">
                  <SummaryTally
                    title="Tally Mandiri"
                    subheader="Summary"
                    chartLabels={'s'}
                    chartData={[
                      {
                        name: 'Volume KG/TON',
                        type: 'line',
                        fill: 'solid',
                        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                      },
                    ]}
                  />
                </TabPanel>
                <TabPanel value="3">
                  <SummaryTransportasi
                    title="Jasa Pengurusan Transportasi"
                    subheader="Summary"
                    chartLabels={chartLabeltransportasi}
                    chartData={chartDatatotaltrans}
                  />
                </TabPanel>
                <TabPanel value="4">
                  <SummaryDepoPetikemas
                    title="Depo Petikemas"
                    subheader="Summary"
                    chartLabels={chartLabelDepo}
                    chartData={chartDatatotalDepo}
                  />
                </TabPanel>
                <TabPanel value="5">
                  <SummaryAngkutanPerairan
                    title="Angkutan Perairan Pelabuhan"
                    subheader="Summary"
                    chartLabels={chartLabelPelabuhan}
                    chartData={chartDataPelabuhan}
                  />
                </TabPanel>
                <TabPanel value="6">
                  <SummaryPPAL
                    title="Peralatan Penyewaan Angkatan Laut"
                    subheader="Summary"
                    chartLabels={chartLabelPPAL}
                    chartData={chartDatatotalPPAL}
                  />
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Laporan Masuk" total={count.total} icon={'ant-design:project-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Perusahaan"
              total={count.totUser}
              color="info"
              icon={'ant-design:build-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Admin"
              total={count.totAdmin}
              color="warning"
              icon={'ant-design:database-filled'}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
