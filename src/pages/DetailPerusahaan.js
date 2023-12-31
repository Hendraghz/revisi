import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Stack, Typography, Card, FormControl, FormLabel } from '@mui/material';
// components
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useToken from '../config/useRequireAuth';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function DetailPerusahaan() {
  const { id } = useParams();
  const [perusahaan, setPerusahaan] = useState([]);
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const { token, checkAndLogin } = useToken();
  useEffect(() => {
    checkAndLogin();
    getPerusahaan();
  }, []);

  const getPerusahaan = async () => {
    const response = await axios.get(`http://localhost:3001/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPerusahaan(response.data.data);
  };

  return (
    <>
      <Helmet>
        <title> Admin | Sistem Pelayaran </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Detail Perusahaan
          </Typography>
        </Stack>

        <Card>
          <form>
            <Stack direction="row" spacing={2} sx={{ ml: 5, mt: 3, mb: 3 }}>
              <FormControl sx={{ width: 530 }}>
                <FormLabel sx={{ color: 'black', mb: 2 }}>Nama Perusahaan</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder="PT Example"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                  value={perusahaan.nama_perusahaan}
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Lokasi Kegiatan Usaha</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder="Bandung"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                  value={perusahaan.lokasi}
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
                  value={perusahaan.email}
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Alamat Perusahaan</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Jln. Example,Bandung, Jawa barat"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                  value={perusahaan.alamat}
                />
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ ml: 5 }}>
              <FormControl sx={{ width: 530 }}>
                <FormLabel sx={{ color: 'black', mb: 2 }}>No Telp Perusahaan</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="08918239800"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                  value={perusahaan.no_telp}
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Provinsi</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Transportasi, etc"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                  value={perusahaan.provinsi}
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
                  value={perusahaan.jenis}
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Kabupaten/Kota</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Transportasi, etc"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                  value={perusahaan.kota}
                />
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ ml: 5 }}>
              <FormControl sx={{ width: 530 }}>
                <FormLabel sx={{ color: 'black', mb: 2 }}>Kecamatan</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Transportasi, etc"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                  value={perusahaan.kecamatan}
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Kode Pos</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Transportasi, etc"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                  value={perusahaan.kode}
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
                  value={perusahaan.kelurahan}
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Modal Usaha</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Transportasi, etc"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                  value={perusahaan.modal}
                />
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ ml: 5 }}>
              <FormControl sx={{ width: 530 }}>
                <FormLabel sx={{ color: 'black', mb: 2 }}>NIB</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Transportasi, etc"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                  value={perusahaan.nib}
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
                  value={perusahaan.jumlah_tki}
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>KBLI</FormLabel>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Transportasi, etc"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setNama(e.target.value)}
                  value={perusahaan.kbli}
                />
              </FormControl>
            </Stack>
          </form>
        </Card>
      </Container>
    </>
  );
}
