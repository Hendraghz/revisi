import * as React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import jwtDecoded from 'jwt-decode';

// @mui
import { Button, Container, Stack, Typography, Card, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
// components
import TextField from '@mui/material/TextField';
import useToken from '../../../config/useRequireAuth';


export default function TambahAdminPage() {
  const navigateTo = useNavigate();
  const [tokenref, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [email, setemail] = useState('');
  const { token, checkAndLogin } = useToken();
  const [formData, setFormData] = React.useState({
    tanggal : '',
    email,
    nama_perusahaan: '',
    nama_kapal: '',
    tipe: '',
    kegiatan: '',
    jml_penumpang_naik: '',
    jml_penumpang_turun: '',
    jml_barang_bongkar: '',
    jml_barang_muat: '',
    kapal_tujuan: '',
    pelabuhan: '',
    terminal_asal: '',
    terminal_tujuan: '',
    surat: null,
  });

  useEffect(() => {
    checkAndLogin();
  }, []);

  const handleInputChange = (e) => {
    // Menangani perubahan input teks dan dropdown
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
      formDataForApi.append('nama_kapal', formData.nama_kapal);
      formDataForApi.append('tipe', formData.tipe);
      formDataForApi.append('kegiatan', formData.kegiatan);
      formDataForApi.append('jml_penumpang_naik', formData.jml_penumpang_naik);
      formDataForApi.append('jml_penumpang_turun', formData.jml_penumpang_turun);
      formDataForApi.append('jml_barang_bongkar', formData.jml_barang_bongkar);
      formDataForApi.append('jml_barang_muat', formData.jml_barang_muat);
      formDataForApi.append('kapal_tujuan', formData.kapal_tujuan);
      formDataForApi.append('pelabuhan', formData.pelabuhan);
      formDataForApi.append('terminal_asal', formData.terminal_asal);
      formDataForApi.append('terminal_tujuan', formData.terminal_tujuan);
      formDataForApi.append('surat', formData.surat);

      const response = await axios.post('http://localhost:3001/pelabuhan', formDataForApi, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

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
            Tambah Laporan Kegiatan Angkutan Perairan Pelabuhan
          </Typography>
        </Stack>

        <Card>
          <form onSubmit={handleFormSubmit}>
            <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 530 }}>
            <FormLabel sx={{ color: 'black', mb:2 }}>Tanggal</FormLabel>
              <TextField
                type="date"
                variant="outlined"
                name="tanggal"
                value={formData.tanggal}
                placeholder=""
                sx={{ backgroundColor: '#fafafa' , mb:3}}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb:2 }}>Nama Perusahaan</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                name="nama_perusahaan"
                value={formData.nama_perusahaan}
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb:2 }}>Nama Kapal</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                name="nama_kapal"
                value={formData.nama_kapal}
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb:2 }}>Type Kapal</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                name="tipe"
                value={formData.tipe}
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb:2 }}>Kegiatan</FormLabel>
              <Select
                labelId="select-kegiatan"
                id="select-kegiatan"
                label="Kegiatan"
                onChange={handleInputChange}
                value={formData.kegiatan}
                name="kegiatan"
                sx={{mb:3}}
              >
                <MenuItem value={'penumpang'}>Memindahkan Penumpang</MenuItem>
                <MenuItem value={'barang'}>Memindahkan Barang</MenuItem>
              </Select>
              <h3>Jumlah Penumpang (orang)</h3>
              <FormLabel sx={{ color: 'black', mb:2 }}>Naik</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                value={formData.jml_penumpang_naik}
                name="jml_penumpang_naik"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb:2 }}>Turun</FormLabel>
              <TextField
                type="text"
                value={formData.jml_penumpang_turun}
                name="jml_penumpang_turun"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                onChange={handleInputChange}
              />
              <h3>Jumlah Barang (ton/M3)</h3>
              <FormLabel sx={{ color: 'black', mb:2 }}>Bongkar</FormLabel>
              <TextField
                type="text"
                value={formData.jml_barang_bongkar}
                name="jml_barang_bongkar"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' , mb:3}}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb:2 }}>Muat</FormLabel>
              <TextField
                type="textt"
                variant="outlined"
                value={formData.jml_barang_muat}
                name="jml_barang_muat"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb:2 }}>Kapal Tujuan</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                value={formData.kapal_tujuan}
                name="kapal_tujuan"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb:2 }}>Pelabuhan</FormLabel>
              <TextField
                type="text"
                name="pelabuhan"
                value={formData.pelabuhan}
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                onChange={handleInputChange}
              />
              <h3>Terminal</h3>
              <FormLabel sx={{ color: 'black', mb:2 }}>Asal</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                name="terminal_asal"
                value={formData.terminal_asal}
                sx={{ backgroundColor: '#fafafa' , mb:3}}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb:2 }}>Tujuan</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                name="terminal_tujuan"
                value={formData.terminal_tujuan}
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb:2 }}>Upload Surat Penunjukan</FormLabel>
              <TextField
                type="file"
                variant="outlined"
                sx={{ backgroundColor: '#fafafa',mb:3 }}
                name="surat"
                onChange={handleFileChange}
              />
              <Button variant="contained" sx={{ mt: 2 }} type="submit" color="success">
                Submit
              </Button>
            </FormControl>
          </form>
        </Card>
      </Container>
    </>
  );
}
