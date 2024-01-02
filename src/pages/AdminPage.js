import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableHead,
  TableContainer,
} from '@mui/material';
// components
import Iconify from '../components/iconify';
import useToken from '../config/useRequireAuth';
import { useAuth } from '../config/AuthContext';
import baseURL from '../config/url';

function createData(idAdmin, namaAdmin, emailAdmin, passwordAdmin) {
  return { idAdmin, namaAdmin, emailAdmin, passwordAdmin };
}

export default function AdminPage() {
  const [admins, setAdmins] = useState([]);
  const { token, checkAndLogin } = useToken();
  const { login, logout } = useAuth();
  const navigateTo = useNavigate();

  useEffect(() => {
    checkAndLogin();
    getAdmins();
    const storedToken = localStorage.getItem('token');
    if (!token && storedToken) {
      login(storedToken);
    }

    if (!token && !storedToken) {
      navigateTo('/login');
    }
  }, []);

  const getAdmins = async () => {
    const response = await axios.get(`${baseURL}/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAdmins(response.data.data);
  };

  const navigate = useNavigate();

  const navigateAdd = () => {
    navigate('/dashboard/tambah-admin');
  };
  // const navigateEdit = (e) => {
  //   e.preventDefault();
  //   navigate('/dashboard/edit-admin');
  // };

  const handleDelete = async (id) => {
    try {
      // Lakukan request DELETE ke endpoint yang sesuai
      const response = await axios.delete(`${baseURL}/admin/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        getAdmins();
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
        <title> Admin | Sistem Pelayaran </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Admin
          </Typography>
          <Link to="/dashboard/tambah-admin">
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" onClick={navigateAdd} />}>
              Tambah Admin
            </Button>
          </Link>
        </Stack>

        <Card>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Nama Admin</TableCell>
                  <TableCell align="right">Email Admin</TableCell>
                  <TableCell align="right">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {admins.map((row) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.nama}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">
                      <Link to={`/dashboard/edit-admin/${row.id}`}>
                        <Button variant="outlined" sx={{ mr: 1 }}>
                          Ubah
                        </Button>
                      </Link>
                      <Button onClick={() => handleDelete(row.id)} variant="outlined" color="error">
                        Hapus
                      </Button>
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
