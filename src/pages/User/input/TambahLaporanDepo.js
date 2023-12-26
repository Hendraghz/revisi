import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { toast, ToastContainer } from 'react-toastify';
import jwtDecoded from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
// @mui
import { Button, Container, Stack, Typography, Card, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
// components
import TextField from '@mui/material/TextField';
import useToken from '../../../config/useRequireAuth';

export default function TambahAdminPage() {
  const { token, checkAndLogin } = useToken();
  const navigateTo = useNavigate();

  useEffect(() => {
    checkAndLogin();
  }, []);
  const decoded = jwtDecoded(token);
  const email = decoded.email;

  const [formData, setFormData] = useState({
    // eslint-disable-next-line object-shorthand
    email: email,
    nama_perusahaan: '',
    kegiatan: '',
    kegiatan_lain: '',
    lokasi: '',
    nomor: '',
    ukuran: '',
    status: '',
    posisi_row: '',
    posisi_tier: '',
    kapasitas_depo: '',
    kapasitas_digunakan: '',
    surat: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      surat: e.target.files[0],
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataForApi = new FormData();
      formDataForApi.append('email', formData.email);
      formDataForApi.append('nama_perusahaan', formData.nama_perusahaan);
      formDataForApi.append('kegiatan', formData.kegiatan);
      formDataForApi.append('kegiatan_lain', formData.kegiatan_lain);
      formDataForApi.append('lokasi', formData.lokasi);
      formDataForApi.append('nomor', formData.nomor);
      formDataForApi.append('ukuran', formData.ukuran);
      formDataForApi.append('status', formData.status);
      formDataForApi.append('posisi_row', formData.posisi_row);
      formDataForApi.append('posisi_tier', formData.posisi_tier);
      formDataForApi.append('kapasitas_depo', formData.kapasitas_depo);
      formDataForApi.append('kapasitas_digunakan', formData.kapasitas_digunakan);
      formDataForApi.append('surat', formData.surat);

      const response = await axios.post('http://localhost:3001/petiKemas', formDataForApi, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle successful response
      console.log('Response data:', response.data);
      toast.success('Laporan berhasil ditambahkan!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigateTo('/dashboard-user/laporan-user');
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title> Laporan | Sistem Pelayaran </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tambah Laporan Kegiatan Depo Petikemas
          </Typography>
        </Stack>

        <Card>
          <form onSubmit={handleFormSubmit}>
            <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 530 }}>
              <FormLabel sx={{ color: 'black' }}>Nama Perusahaan (Pengguna Depo)</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="nama_perusahaan"
                value={formData.nama_perusahaan}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black' }}>Kegiatan</FormLabel>
              <Select
                labelId="select-kegiatan"
                id="select-kegiatan"
                name="kegiatan"
                value={formData.kegiatan}
                onChange={handleInputChange}
                label="Kegiatan"
              >
                <MenuItem value={'stevedoring'}>Stevedoring</MenuItem>
                <MenuItem value={'cargodoring'}>Cargodoring</MenuItem>
                <MenuItem value={'receiving'}>Receiving</MenuItem>
                <MenuItem value={'delivery'}>Delivery</MenuItem>
                <MenuItem value={'stuffing'}>Stuffing</MenuItem>
                <MenuItem value={'stripping'}>Stripping</MenuItem>
              </Select>
              <FormLabel sx={{ color: 'black' }}>Kegiatan Lain</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="kegiatan_lain"
                value={formData.kegiatan_lain}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black' }}>Lokasi Depo Petikemas</FormLabel>
              <Select
                labelId="select-lokasi"
                id="select-lokasi"
                label="Lokasi"
                name="lokasi"
                value={formData.lokasi}
                onChange={handleInputChange}
              >
                <MenuItem value={'diluar-pelabuhan'}>Diluar Pelabuhan</MenuItem>
                <MenuItem value={'didalam-pelabuhan'}>Didalam Terminal</MenuItem>
              </Select>
              <FormLabel sx={{ color: 'black' }}>Nomor Petikemas</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="nomor"
                value={formData.nomor}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black' }}>Ukuran Petikemas</FormLabel>
              <Select
                labelId="select-ukuran"
                id="select-ukuran"
                value={formData.ukuran}
                onChange={handleInputChange}
                label="Ukuran"
                name="ukuran"
              >
                <MenuItem value={'20feet'}>20 Feet</MenuItem>
                <MenuItem value={'40feet'}>40 Feet</MenuItem>
                <MenuItem value={'40hc'}>40 HC</MenuItem>
                <MenuItem value={'20feet'}>20 Refeer</MenuItem>
                <MenuItem value={'iso tank'}>ISO TANK</MenuItem>
                <MenuItem value={'ot'}>OT</MenuItem>
                <MenuItem value={'ft'}>FT</MenuItem>
              </Select>
              <FormLabel sx={{ color: 'black' }}>Status Petikemas</FormLabel>
              <Select
                labelId="select-status"
                id="select-status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                label="Status"
              >
                <MenuItem value={'in'}>In</MenuItem>
                <MenuItem value={'out'}>Out</MenuItem>
              </Select>
              <h3>Posisi Petikemas</h3>
              <FormLabel sx={{ color: 'black' }}>Row</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                name="posisi_row"
                value={formData.posisi_row}
                onChange={handleInputChange}
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
              />
              <FormLabel sx={{ color: 'black' }}>Tier</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                name="posisi_tier"
                value={formData.posisi_tier}
                onChange={handleInputChange}
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
              />
              <FormLabel sx={{ color: 'black' }}>Kapasitas Depo (YOR)</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                name="kapasitas_depo"
                value={formData.kapasitas_depo}
                onChange={handleInputChange}
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
              />
              <FormLabel sx={{ color: 'black' }}>Kapasitas YOR yang digunakan</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                name="kapasitas_digunakan"
                value={formData.kapasitas_digunakan}
                onChange={handleInputChange}
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
              />
              <FormLabel sx={{ color: 'black' }}>Upload Surat Penunjukan</FormLabel>
              <TextField
                type="file"
                variant="outlined"
                sx={{ backgroundColor: '#fafafa' }}
                name="surat"
                multiple
                onChange={handleFileChange}
              />
              <Button variant="contained" type="submit" sx={{ mt: 2 }} color="success">
                Submit
              </Button>
            </FormControl>
          </form>
        </Card>
      </Container>
    </>
  );
}