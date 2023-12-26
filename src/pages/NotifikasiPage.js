import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// @mui
import { Button, Container, Stack, Typography, Card } from '@mui/material';
// components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Iconify from '../components/iconify';

function createData(idNotif, isiNotifikasi, tujuanNotifikasi) {
    return { idNotif, isiNotifikasi, tujuanNotifikasi };
}

const rows = [
    createData('NTF-100', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry', 'PT Insa Cell Indonesia'),
    createData('NTF-200', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry', 'PT Insa Cell Indonesia'),
    createData('NTF-300', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry', 'PT Insa Cell Indonesia'),
    createData('NTF-400', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry', 'PT Insa Cell Indonesia'),
    createData('NTF-500', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry', 'PT Insa Cell Indonesia'),

];

export default function NotifikasiPage() {
    const [open, setOpen] = useState(null);

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };
    return (
        <>
            <Helmet>
                <title> Notifikasi | Sistem Pelayaran </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Notifikasi
                    </Typography>
                    <Link to="/dashboard/tambah-notifikasi">
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                            Tambah Notifikasi
                        </Button>
                    </Link>
                </Stack>

                <Card>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">Isi Notifikasi</TableCell>
                                    <TableCell align="right">Tujuan</TableCell>
                                    <TableCell align="right">Aksi</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.idNotif}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.idNotif}
                                        </TableCell>
                                        <TableCell align="right">{row.isiNotifikasi}</TableCell>
                                        <TableCell align="right">{row.tujuanNotifikasi}</TableCell>
                                        <TableCell align="right">
                                            <Link to="/dashboard/edit-notifikasi">
                                                <Button variant="outlined" sx={{px:2.4, mb:1}}>Ubah</Button>
                                            </Link>
                                            <Button variant="outlined" color='error'>Hapus</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>

                </Card>

            </Container>
        </>
    );
}
