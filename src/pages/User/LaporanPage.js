import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Container, Stack, Typography } from '@mui/material';
import jwtDecode from 'jwt-decode'
import LaporanPageAngkutan from './LaporanAngkutan';
import LaporanPageBongkar from './LaporanBongkarUser';
import LaporanPagePengurusan from './LaporanPengurusan';
import LaporanPagePenyewaan from './LaporanPenyewaan';
import LaporanPageTally from './LaporanTally';
import LaporanPageDepo from './LaporanDepoUser';


import useToken from '../../config/useRequireAuth';



export default function LaporanPage() {
    const { token, checkAndLogin } = useToken();

    
    useEffect(() => {
        checkAndLogin();
    }, [token, checkAndLogin]);
        
        const decoded = jwtDecode(token);
        const jenisperusahaan = decoded.jenis;

    let komponen;
    if (jenisperusahaan === 'penyelenggaraan depo peti kemas') {
      komponen = <LaporanPageDepo />;
    } else if (jenisperusahaan === 'usaha angkutan perairan Pelabuhan') {
      komponen = <LaporanPageAngkutan />;
    } else if (jenisperusahaan === 'penyelenggaraan Tally mandiri') {
      komponen = <LaporanPageTally />;
    } else if (jenisperusahaan === 'penyelenggaraan penyewaan peralatan angkutan laut atau peralatan jasa terkait dengan angkutan laut'){
      komponen = <LaporanPagePenyewaan/>;
    } else if (jenisperusahaan === 'usaha bongkar muat barang'){
     komponen = <LaporanPageBongkar/>
    } else {
      komponen = <LaporanPagePengurusan />;
    }


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
                    {komponen}
                </Grid>

            </Container>
        </>
    );
}
