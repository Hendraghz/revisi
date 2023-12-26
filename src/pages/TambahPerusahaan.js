import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Stack, Typography, Card, FormControl, FormLabel, MenuItem, Select } from '@mui/material';
// components
import TextField from '@mui/material/TextField';
import useToken from '../config/useRequireAuth';

export default function TambahAdminPage() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [jenis, setJenis] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const navigate = useNavigate();

  const { token, checkAndLogin } = useToken();
  useEffect(() => {
    checkAndLogin();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/admin/users',
        {
          nama_perusahaan: nama,
          email,
          jenis,
          password,
          confPassword,
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

  const handleJenis = (event) => {
    setJenis(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title> Perusahaan | Sistem Pelayaran </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tambah Perusahaan
          </Typography>
        </Stack>

        <Card>
          <form onSubmit={submitHandler}>
            <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 530 }}>
              <FormLabel sx={{ color: 'black' }}>Nama Perusahaan</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder="PT Senjata Indo"
                sx={{ backgroundColor: '#fafafa' }}
                onChange={(e) => setNama(e.target.value)}
              />
              <FormLabel sx={{ color: 'black' }}>Email Perusahaan</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder="senjataindo@yahoo.com"
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
              <FormLabel sx={{ color: 'black' }}>Password</FormLabel>
              <TextField
                type="password"
                variant="outlined"
                placeholder="Password"
                sx={{ backgroundColor: '#fafafa' }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormLabel sx={{ color: 'black' }}>Confirm Password</FormLabel>
              <TextField
                type="password"
                variant="outlined"
                placeholder="confirm password"
                sx={{ backgroundColor: '#fafafa' }}
                onChange={(e) => setConfPassword(e.target.value)}
              />
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
