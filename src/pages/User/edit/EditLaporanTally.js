import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import jwtDecoded from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Button, Container, Stack, Typography, Card, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
// components
import TextField from '@mui/material/TextField';
import useToken from '../../../config/useRequireAuth';

export default function TambahAdminPage() {
  const { token, checkAndLogin } = useToken();
  const navigateTo = useNavigate();
  const { id } = useParams();
  const decoded = jwtDecoded(token);
  const email = decoded.email;
  useEffect(() => {
    checkAndLogin();
    getTally();
  }, []);

  const [formData, setFormData] = useState({
    tanggal : '',
    email,
    nama_perusahaan_penunjuk: '',
    nama_kapal: '',
    bendera: '',
    type_kapal: '',
    kegiatan: '',
    jumlah_bongkar: '',
    jumlah_muat: '',
    jam_bongkar: '',
    jam_muat: '',
    selesai_bongkar: '',
    selesai_muat: '',
    lokasi_kegiatan: '',
    muatan: '',
    surat: null,
  });

  useEffect(() => {
    checkAndLogin();
    getTally();
  }, []);

  const getTally = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/tally/${id}/detail`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Set the fetched data in the form state
      setFormData({
        tanggal: response.data.data.tanggal,
        email: response.data.data.email,
        nama_perusahaan_penunjuk: response.data.data.nama_perusahaan_penunjuk,
        nama_kapal: response.data.data.nama_kapal,
        bendera: response.data.data.bendera,
        type_kapal: response.data.data.type_kapal,
        kegiatan: response.data.data.kegiatan,
        jumlah_bongkar: response.data.data.jumlah_bongkar,
        jumlah_muat: response.data.data.jumlah_muat,
        jam_bongkar: response.data.data.jam_bongkar,
        jam_muat: response.data.data.jam_muat,
        selesai_bongkar: response.data.data.selesai_bongkar,
        selesai_muat: response.data.data.selesai_muat,
        lokasi_kegiatan: response.data.data.lokasi_kegiatan,
        muatan: response.data.data.muatan,
        surat: response.data.data.surat,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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

    try {
      const formDataForApi = new FormData();
      formDataForApi.append('tanggal', formData.tanggal);
      formDataForApi.append('email', formData.email);
      formDataForApi.append('nama_perusahaan_penunjuk', formData.nama_perusahaan_penunjuk);
      formDataForApi.append('nama_kapal', formData.nama_kapal);
      formDataForApi.append('bendera', formData.bendera);
      formDataForApi.append('type_kapal', formData.type_kapal);
      formDataForApi.append('kegiatan', formData.kegiatan);
      formDataForApi.append('jumlah_bongkar', formData.jumlah_bongkar);
      formDataForApi.append('jumlah_muat', formData.jumlah_muat);
      formDataForApi.append('jam_bongkar', formData.jam_bongkar);
      formDataForApi.append('jam_muat', formData.jam_muat);
      formDataForApi.append('selesai_bongkar', formData.selesai_bongkar);
      formDataForApi.append('selesai_muat', formData.selesai_muat);
      formDataForApi.append('lokasi_kegiatan', formData.lokasi_kegiatan);
      formDataForApi.append('muatan', formData.muatan);
      formDataForApi.append('surat', formData.surat);

      const response = await axios.put(`http://localhost:3001/tally/${id}/update`, formDataForApi, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle successful response
      console.log('Response data:', response.data);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Data Berhasil Diubah',
        confirmButtonText: 'OK',
        showConfirmButton: true,
        timer: 1500,
      });
      navigateTo('/dashboard-user/laporan-user');
    } catch (error) {
      console.error('Error data:', error);
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
            Edit Laporan Kegiatan Tally Mandiri
          </Typography>
        </Stack>

        <Card>
          <form onSubmit={handleFormSubmit}>
            <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 530 }}>
            <FormLabel sx={{ color: 'black', mb:2 }}>Tanggal</FormLabel>
              <TextField
                type="date"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                name="tanggal"
                value={formData.tanggal}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb:2 }}>Nama Perusahaan Penunjuk</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                name="nama_perusahaan_penunjuk"
                value={formData.nama_perusahaan_penunjuk}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb:2 }}>Nama Kapal</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                name="nama_kapal"
                value={formData.nama_kapal}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb:2 }}>Type Kapal</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                name="type_kapal"
                value={formData.type_kapal}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb:2 }}>Bendera</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                name="bendera"
                value={formData.bendera}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb:2 }}>Kegiatan</FormLabel>
              <Select
                labelId="select-kegiatan"
                id="select-kegiatan"
                value={formData.kegiatan}
                label="Kegiatan"
                name="kegiatan"
                onChange={handleInputChange}
                sx={{mb:3}}
              >
                <MenuItem value={'stevedoring'}>Stevedoring</MenuItem>
                <MenuItem value={'cargodoring'}>Cargodoring</MenuItem>
                <MenuItem value={'receiving'}>Receiving</MenuItem>
                <MenuItem value={'delivery'}>Delivery</MenuItem>
                <MenuItem value={'stuffing'}>Stuffing</MenuItem>
                <MenuItem value={'stripping'}>Stripping</MenuItem>
              </Select>
              <h2>Kegiatan Tally Mandiri</h2>
              <h3>Jumlah</h3>
              <FormLabel sx={{ color: 'black', mb:2 }}>Bongkar</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                name="jumlah_bongkar"
                value={formData.jumlah_bongkar}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb:2 }}>Muat</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                name="jumlah_muat"
                value={formData.jumlah_muat}
                onChange={handleInputChange}
              />
              <h3>Mulai (jam)</h3>
              <FormLabel sx={{ color: 'black', mb:2 }}>Bongkar</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                name="jam_bongkar"
                value={formData.jam_bongkar}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb:2 }}>Muat</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                name="jam_muat"
                value={formData.jam_muat}
                onChange={handleInputChange}
              />
              <h3>Selesai (jam)</h3>
              <FormLabel sx={{ color: 'black',mb:2 }}>Bongkar</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                name="selesai_bongkar"
                value={formData.selesai_bongkar}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb:2 }}>Muat</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                name="selesai_muat"
                value={formData.selesai_muat}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb:2 }}>Lokasi Kegiatan</FormLabel>
              <Select
                labelId="select-lokasi"
                id="select-lokasi"
                value={formData.lokasi_kegiatan}
                name="lokasi_kegiatan"
                onChange={handleInputChange}
                label="Lokasi"
                sx={{mb:3}}
              >
                <MenuItem value={'pelabuhan'}>Pelabuhan</MenuItem>
                <MenuItem value={'cargodoring'}>Terminal</MenuItem>
                <MenuItem value={'receiving'}>Depo Petikemas</MenuItem>
                <MenuItem value={'delivery'}>Gudang</MenuItem>
              </Select>
              <FormLabel sx={{ color: 'black', mb:2 }}>Muatan</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                name="muatan"
                value={formData.muatan}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black', mb:2 }}>Upload Surat Penunjukan</FormLabel>
              <TextField
                type="file"
                variant="outlined"
                sx={{ backgroundColor: '#fafafa', mb:3 }}
                onChange={handleFileChange}
                name="surat"
              />
              <Button variant="contained" sx={{ mt: 2 }} color="success" type="submit">
                Submit
              </Button>
            </FormControl>
          </form>
        </Card>
      </Container>
    </>
  );
}
