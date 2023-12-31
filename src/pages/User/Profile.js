import { Helmet } from 'react-helmet-async';
import { Form } from 'react-bootstrap';
// @mui
import { Button, Container, Stack, Typography, Card, FormControl, FormLabel, Avatar, Box } from '@mui/material';
// components
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useToken from '../../config/useRequireAuth';
import baseURL from '../../config/url';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Profile() {
  const [nama, setNama] = useState('');
  const [perusahaan, setPerusahaan] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const { token, checkAndLogin } = useToken();
  useEffect(() => {
    checkAndLogin();
    getPerusahaan();
    console.log(perusahaan);
  }, []);

  const getPerusahaan = async () => {
    const response = await axios.get(`${baseURL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPerusahaan(response.data.data);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseURL}/admin`,
        {
          nama,
          email,
          password,
          confPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/dashboard/admin');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title> User | Sistem Pelayaran </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Profile User {perusahaan.nama_perusahaan}
          </Typography>
        </Stack>
        <Card>
          <form onSubmit={submitHandler}>
            <Stack direction="row" spacing={2} sx={{ ml: 5, mt: 3, mb: 3, mr: 5 }}>
              <FormControl sx={{ width: 530 }}>
                <FormLabel sx={{ color: 'black', mb: 2 }}>Nama Perusahaan</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder={perusahaan.nama_perusahaan}
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Lokasi Kegiatan Usaha</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder="Bandung"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ width: 530 }}>
                <FormLabel sx={{ color: 'black', mb: 2 }}>Email Perusahaan</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="exampl3@gmail.com"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Alamat Perusahaan</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Jln. Example,Bandung, Jawa barat"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                />
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ ml: 5, mr: 5 }}>
              <FormControl sx={{ width: 530 }}>
                <FormLabel sx={{ color: 'black', mb: 2 }}>No Telp Perusahaan</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="08918239800"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Provinsi</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Transportasi, etc"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ width: 530 }}>
                <FormLabel sx={{ color: 'black', mb: 2 }}>Jenis Perusahaan</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Transportasi, etc"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Kabupaten/Kota</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Transportasi, etc"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                />
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ ml: 5, mr: 5 }}>
              <FormControl sx={{ width: 530 }}>
                <FormLabel sx={{ color: 'black', mb: 2 }}>Kecamatan</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Transportasi, etc"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Kode Pos</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Transportasi, etc"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ width: 530 }}>
                <FormLabel sx={{ color: 'black', mb: 2 }}>Kelurahan</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Transportasi, etc"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Modal Usaha</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Transportasi, etc"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                />
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ ml: 5, mr: 5 }}>
              <FormControl sx={{ width: 530 }}>
                <FormLabel sx={{ color: 'black', mb: 2 }}>NIB</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Transportasi, etc"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Password</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Transportasi, etc"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ width: 530 }}>
                <FormLabel sx={{ color: 'black', mb: 2 }}>Jumlah Tenaga Kerja Indonesia</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Transportasi, etc"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>KBLI</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Transportasi, etc"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                />
              </FormControl>
            </Stack>
            <Box textAlign="center">
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 3 }}>
                Simpan Profile
              </Button>
            </Box>
          </form>
        </Card>
      </Container>
    </>
  );
}
