import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card, CardContent } from '@mui/material';

// components
// sections
import { useAuth } from '../config/AuthContext';
import useToken from '../config/useRequireAuth';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
    const { checkAndLogin } = useToken();
    const navigateTo = useNavigate();
    const { token, login, logout } = useAuth();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        checkAndLogin();
        if (!token && storedToken) {
            login(storedToken);
        }

        if (!token && !storedToken) {
            navigateTo('/login');
        }
    }, [token, login]);

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
        backgroundColor: '45a049'
    };

    const linkStyle = {
        display: 'block',
        textDecoration: 'none',
        color: '#1e88e5',
        margin: '8px 0',
        fontSize: '18px',
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
                    Hi, Selamat Datang Kembali Halaman user
                </Typography>

                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Panduan Informasi!
                        </Typography>
                        <Typography variant="h5" sx={{ mt: 2, mb: 4 }}>
                            Ini adalah panduan untuk membantu Anda memahami informasi lebih lanjut.
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <a href="http://bit.ly/46YLdvb" style={linkStyle} target="_blank" rel="noopener noreferrer">
                                    1. Panduan Migrasi OSS (Non UMK)
                                </a>
                            </Grid>
                            <Grid item xs={12}>
                                <a href="https://bit.ly/3t1Cmuy" style={linkStyle} target="_blank" rel="noopener noreferrer">
                                    2. Perizinan Berusaha Non UMK Risiko Tinggi dan Menengah Tinggi
                                </a>
                            </Grid>
                            <Grid item xs={12}>
                                <a
                                    href="https://bit.ly/perubahanperizinan"
                                    style={linkStyle}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    3. Perubahan Perizinan Berusaha
                                </a>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}
