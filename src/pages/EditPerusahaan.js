import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Stack, Typography, Card, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
// components
import TextField from '@mui/material/TextField';
import useToken from '../config/useRequireAuth';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function EditPerusahaanPage() {
  const { id } = useParams();
  const [perusahaan, setPerusahaan] = useState([]);
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [jenis, setJenis] = useState('');
  const [password, setPassword] = useState('');
  const { token, checkAndLogin } = useToken();
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

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

  const handleJenis = (event) => {
    setJenis(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/admin/users/${id}`,
        {
          nama_perusahaan: nama,
          email,
          jenis,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/dashboard/perusahaan');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
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
            Edit Perusahaan
          </Typography>
        </Stack>

        <Card>
          <form onSubmit={submitHandler}>
            <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 530 }}>
              <FormLabel sx={{ color: 'black' }}>Nama Perusahaan</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder={perusahaan.nama_perusahaan}
                sx={{ backgroundColor: '#fafafa' }}
                onChange={(e) => setNama(e.target.value)}
              />
              <FormLabel sx={{ color: 'black' }}>Email Perusahaan</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder={perusahaan.email}
                sx={{ backgroundColor: '#fafafa' }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel sx={{ color: 'black' }}>Jenis Perusahaan</FormLabel>
              <Select
                labelId="select-kegiatan"
                id="select-kegiatan"
                value={jenis}
                label="Kegiatan"
                onChange={handleJenis}
              >
                <MenuItem value={'usaha bongkar muat barang'}>usaha bongkar muat barang</MenuItem>
                <MenuItem value={'usaha jasa pengurusan transportasi'}>usaha jasa pengurusan transportasi</MenuItem>
                <MenuItem value={'penyelenggaraan depo peti kemas'}>penyelenggaraan depo peti kemas</MenuItem>
                <MenuItem value={'penyelenggaraan Tally mandiri'}>penyelenggaraan Tally mandiri</MenuItem>
                <MenuItem
                  value={
                    'penyelenggaraan penyewaan peralatan angkutan laut atau peralatan jasa terkait dengan angkutan laut'
                  }
                >
                  penyelenggaraan penyewaan peralatan angkutan laut atau peralatan jasa terkait dengan angkutan laut
                </MenuItem>
                <MenuItem value={'usaha angkutan perairan Pelabuhan'}>usaha angkutan perairan Pelabuhan</MenuItem>
              </Select>
              <Button variant="contained" sx={{ mt: 2 }} type="submit">
                Submit
              </Button>
            </FormControl>
          </form>
        </Card>
      </Container>
    </>
  );
}
