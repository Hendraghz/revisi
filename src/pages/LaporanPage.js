import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { Grid, Container, Stack, Typography } from '@mui/material';

import { AppWidgetSummary } from '../sections/@dashboard/app';
import useToken from '../config/useRequireAuth';
import baseURL from '../config/url';

export default function LaporanPage() {
  const [count, setCount] = useState([]);
  const { token, checkAndLogin } = useToken();
  useEffect(() => {
    checkAndLogin();
    getCount();
  }, []);

  const getCount = async () => {
    const response = await axios.get(`${baseURL}/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCount(response.data.data);
  };
  return (
    <>
      <Helmet>
        <title> Laporan | Sistem Pelayaran </title>
      </Helmet>

      <Container style={{ padding: '1%' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Laporan
          </Typography>
        </Stack>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/dashboard/laporan-bongkar" style={{ textDecoration: 'none' }}>
              <AppWidgetSummary
                title="Perusahaan Bongkar Muat"
                color="success"
                total={count.countBM}
                icon={'ant-design:hdd-filled'}
              />
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Link to="/dashboard/laporan-pengurusan" style={{ textDecoration: 'none' }}>
              <AppWidgetSummary
                title="Perusahaan Jasa Pengurusan Transportasi"
                total={count.countTrans}
                color="info"
                icon={'ant-design:car-filled'}
              />
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Link to="/dashboard/laporan-angkutan" style={{ textDecoration: 'none' }}>
              <AppWidgetSummary
                title="Angkutan Perairan Pelabuhan"
                total={count.countPelabuhan}
                color="warning"
                icon={'ant-design:filter-filled'}
              />
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Link to="/dashboard/laporan-tally" style={{ textDecoration: 'none' }}>
              <AppWidgetSummary
                title="Tally Mandiri"
                total={count.countTally}
                color="error"
                icon={'ant-design:gold-filled'}
              />
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Link to="/dashboard/laporan-depo" style={{ textDecoration: 'none' }}>
              <AppWidgetSummary title="Depo Petikemas" total={count.countPK} icon={'ant-design:layout-filled'} />
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Link to="/dashboard/laporan-penyewaan" style={{ textDecoration: 'none' }}>
              <AppWidgetSummary
                title="Penyewaan Peralatan Angkutan Laut"
                total={count.countPPAL}
                color="secondary"
                icon={'ant-design:build-filled'}
              />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
