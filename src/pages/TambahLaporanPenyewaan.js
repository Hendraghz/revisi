import * as React from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Stack, Typography, Card, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
// components
import TextField from '@mui/material/TextField';

export default function TambahAdminPage() {
  const [kegiatan, setKegiatan] = React.useState('');

  const handleChange = (event) => {
    setKegiatan(event.target.value);
  };

  const [lokasi, setLokasi] = React.useState('');

  const handleLokasi = (event) => {
    setLokasi(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title> Laporan | Sistem Pelayaran </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tambah Laporan Penyewaan Angkutan Laut
          </Typography>
        </Stack>

        <Card>
          <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 530 }}>
            <FormLabel sx={{ color: 'black' }}>Tanggal</FormLabel>
            <TextField type="date" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
            <FormLabel sx={{ color: 'black' }}>Nama Perusahaan/Perorangan</FormLabel>
            <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
            <FormLabel sx={{ color: 'black' }}>Penyewa Peralatan</FormLabel>
            <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
            <FormLabel sx={{ color: 'black' }}>Kegiatan</FormLabel>
            <Select
              labelId="select-kegiatan"
              id="select-kegiatan"
              value={kegiatan}
              label="Kegiatan"
              onChange={handleChange}
            >
              <MenuItem value={'angkutan laut'}>Angkutan Laut</MenuItem>
              <MenuItem value={'bongkar muat'}>Bongkar Muat</MenuItem>
              <MenuItem value={'jasa pengurusan transportasi'}>Jasa Pengurusan Transportasi</MenuItem>
              <MenuItem value={'tally mandiri'}>Tally Mandiri</MenuItem>
              <MenuItem value={'depo petikemas'}>Depo Petikeams</MenuItem>
              <MenuItem value={'perbaikan kapal'}>Perbaikan dan Pemeliharaan Kapal</MenuItem>
            </Select>
            <h3>Peralatan Jasa Terkait</h3>
            <FormLabel sx={{ color: 'black' }}>Nama Peralatan</FormLabel>
            <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
            <FormLabel sx={{ color: 'black' }}>Jumlah Peralatan</FormLabel>
            <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
            <FormLabel sx={{ color: 'black' }}>Masa Sewa (Hari)</FormLabel>
            <h3>Jangka Waktu (Tgl/Bulan/Tahun)</h3>
            <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
            <FormLabel sx={{ color: 'black' }}>Mulai</FormLabel>
            <TextField type="date" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
            <FormLabel sx={{ color: 'black' }}>Selesai</FormLabel>
            <TextField type="date" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
            <FormLabel sx={{ color: 'black' }}>Upload Surat Penunjukan Perjanjian Sewa/Purchase Order</FormLabel>
            <TextField type="file" variant="outlined" sx={{ backgroundColor: '#fafafa' }} />
            <Button variant="contained" sx={{ mt: 2 }}>
              Submit
            </Button>
          </FormControl>
        </Card>
      </Container>
    </>
  );
}
