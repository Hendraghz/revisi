import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
import users from '../_mock/user';
import useToken from '../config/useRequireAuth';

function createData(id, namaPerusahaan, emailPerusahaan) {
  return { id, namaPerusahaan, emailPerusahaan };
}

export default function PerusahaanPage() {
  const [perusahaan, setPerusahaan] = useState([]);
  const [lokasi, setLokasi] = useState([]);
  const { token, checkAndLogin } = useToken();
  useEffect(() => {
    checkAndLogin();
    getPerusahaan();
  }, []);

  const getPerusahaan = async () => {
    const response = await axios.get('http://localhost:3001/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPerusahaan(response.data.data);
    setLokasi(response.data.profile);
  };
  const handleDelete = async (id) => {
    try {
      // Lakukan request DELETE ke endpoint yang sesuai
      const response = await axios.delete(`http://localhost:3001/admin/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        getPerusahaan();
      } else {
        console.error('Gagal melakukan penghapusan');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <>
      <Helmet>
        <title> Perusahaan | Sistem Pelayaran </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Perusahaan
          </Typography>
          <Link to="/dashboard/tambah-perusahaan">
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Tambah Perusahaan
            </Button>
          </Link>
        </Stack>

        <Card>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Nama Perusahaan</TableCell>
                  <TableCell align="right">Email Perusahaan</TableCell>
                  <TableCell align="right">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {perusahaan.map((perusahaanRow, index) => (
                  <TableRow key={perusahaanRow.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {perusahaanRow.id}
                    </TableCell>
                    <TableCell align="right">{perusahaanRow.nama_perusahaan}</TableCell>
                    <TableCell align="right">{perusahaanRow.email}</TableCell>
                    <TableCell align="right">
                      <Link to={`/dashboard/edit-perusahaan/${perusahaanRow.id}`}>
                        <Button variant="outlined" sx={{ mr: 1 }}>
                          Ubah
                        </Button>
                      </Link>
                      <Button onClick={() => handleDelete(perusahaanRow.id)} variant="outlined" color="error">
                        Hapus
                      </Button>
                      <Link to={'/dashboard/detail-perusahaan'}>
                        <Button variant="outlined" sx={{ ml: 1 }}>
                          Detail
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        <div className="print-button">
          <Button variant="contained" className="btnDownload" startIcon={<Iconify icon="file-icons:microsoft-excel" />}>
            Download Excel
          </Button>
        </div>
      </Container>
    </>
  );
}
