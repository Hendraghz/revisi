import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecoded from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// @mui
import { Button, Container, Stack, Typography, Card, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
// components
import TextField from '@mui/material/TextField';
import baseURL from '../../../config/url';
import useToken from '../../../config/useRequireAuth';

export default function TambahAdminPage() {
  const [tokenref, setToken] = useState('');
  const { token, checkAndLogin } = useToken();
  const [expire, setExpire] = useState('');
  const [email, setemail] = useState('');
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    tanggal: '',
    email,
    nama_perusahaan: '',
    penyewaan_peralatan: '',
    kegiatan: '',
    nama_peralatanAL: '',
    jumlah_satuanAL: '',
    nama_peralatanJT: '',
    jumlah_satuanJT: '',
    masa_sewa: '',
    jw_mulai: '',
    jw_selesai: '',
    surat: null,
  });

  useEffect(() => {
    checkAndLogin();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    // Menangani perubahan input file
    setFormData({
      ...formData,
      surat: e.target.files[0],
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const decode = jwtDecoded(token);
    const email = decode.email;
    try {
      const formDataForApi = new FormData();
      formDataForApi.append('tanggal', formData.tanggal);
      formDataForApi.append('email', email);
      formDataForApi.append('nama_perusahaan', formData.nama_perusahaan);
      formDataForApi.append('penyewaan_peralatan', formData.penyewaan_peralatan);
      formDataForApi.append('kegiatan', formData.kegiatan);
      formDataForApi.append('nama_peralatanAL', formData.nama_peralatanAL);
      formDataForApi.append('jumlah_satuanAL', formData.jumlah_satuanAL);
      formDataForApi.append('nama_peralatanJT', formData.nama_peralatanJT);
      formDataForApi.append('jumlah_satuanJT', formData.jumlah_satuanJT);
      formDataForApi.append('masa_sewa', formData.masa_sewa);
      formDataForApi.append('jw_mulai', formData.jw_mulai);
      formDataForApi.append('jw_selesai', formData.jw_selesai);
      formDataForApi.append('surat', formData.surat);

      const response = await axios.post(`${baseURL}/ppal`, formDataForApi, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle successful response
      if (response.status === 200) {
        Swal.fire({
          title: 'Laporan Berhasil',
          text: 'Di tambahkan',
          icon: 'success',
        });
        navigateTo('/dashboard-user/laporan-user');
      }
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
            Tambah Laporan Penyewaan Angkutan Laut
          </Typography>
        </Stack>

        <Card>
          <form onSubmit={handleFormSubmit}>
            <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 530 }}>
              <FormLabel sx={{ color: 'black', mb: 2 }}>Tanggal</FormLabel>
              <TextField
                type="date"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb: 3 }}
                name="tanggal"
                value={formData.tanggal}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb: 2 }}>Nama Perusahaan/Perorangan</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb: 3 }}
                name="nama_perusahaan"
                value={formData.nama_perusahaan}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb: 2 }}>Penyewa Peralatan</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb: 3 }}
                value={formData.penyewaan_peralatan}
                onChange={handleInputChange}
                name="penyewaan_peralatan"
              />
              <FormLabel sx={{ color: 'black', mb: 2 }}>Kegiatan</FormLabel>
              <Select
                labelId="select-kegiatan"
                id="select-kegiatan"
                value={formData.kegiatan}
                name="kegiatan"
                onChange={handleInputChange}
                label="Kegiatan"
                sx={{ mb: 3 }}
              >
                <MenuItem value={'angkutan laut'}>Angkutan Laut</MenuItem>
                <MenuItem value={'bongkar muat'}>Bongkar Muat</MenuItem>
                <MenuItem value={'jasa pengurusan transportasi'}>Jasa Pengurusan Transportasi</MenuItem>
                <MenuItem value={'tally mandiri'}>Tally Mandiri</MenuItem>
                <MenuItem value={'depo petikemas'}>Depo Petikeams</MenuItem>
                <MenuItem value={'perbaikan kapal'}>Perbaikan dan Pemeliharaan Kapal</MenuItem>
              </Select>
              <h3>Peralatan Angkutan Laut</h3>
              <FormLabel sx={{ color: 'black', mb: 2 }}>Nama Peralatan</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                value={formData.nama_peralatanAL}
                name="nama_peralatanAL"
                onChange={handleInputChange}
                sx={{ backgroundColor: '#fafafa', mb: 3 }}
              />
              <FormLabel sx={{ color: 'black', mb: 2 }}>Jumlah Peralatan</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                name="jumlah_satuanAL"
                value={formData.jumlah_satuanAL}
                onChange={handleInputChange}
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb: 3 }}
              />
              <h3>Peralatan Jasa Terkait</h3>
              <FormLabel sx={{ color: 'black', mb: 2 }}>Nama Peralatan</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                name="nama_peralatanJT"
                value={formData.nama_peralatanJT}
                onChange={handleInputChange}
                sx={{ backgroundColor: '#fafafa', mb: 3 }}
              />
              <FormLabel sx={{ color: 'black', mb: 2 }}>Jumlah Peralatan</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                name="jumlah_satuanJT"
                value={formData.jumlah_satuanJT}
                onChange={handleInputChange}
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb: 3 }}
              />
              <FormLabel sx={{ color: 'black', mb: 2 }}>Masa Sewa (Hari)</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                value={formData.masa_sewa}
                name="masa_sewa"
                onChange={handleInputChange}
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb: 3 }}
              />
              <h3>Jangka Waktu (Tgl/Bulan/Tahun)</h3>
              <FormLabel sx={{ color: 'black', mb: 2 }}>Mulai</FormLabel>
              <TextField
                type="date"
                variant="outlined"
                name="jw_mulai"
                value={formData.jw_mulai}
                onChange={handleInputChange}
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb: 3 }}
              />
              <FormLabel sx={{ color: 'black', mb: 2 }}>Selesai</FormLabel>
              <TextField
                type="date"
                name="jw_selesai"
                value={formData.jw_selesai}
                onChange={handleInputChange}
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb: 3 }}
              />
              <FormLabel sx={{ color: 'black', mb: 2 }}>
                Upload Surat Penunjukan Perjanjian Sewa/Purchase Order
              </FormLabel>
              <TextField
                type="file"
                variant="outlined"
                sx={{ backgroundColor: '#fafafa', mb: 3 }}
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
