import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { toast, ToastContainer } from 'react-toastify';
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

  useEffect(() => {
    checkAndLogin();
    getPetiKemas();
  }, []);
  const decoded = jwtDecoded(token);
  const email = decoded.email;

  const [formData, setFormData] = useState({
    // eslint-disable-next-line object-shorthand
    email: email,
    // eslint-disable-next-line object-shorthand
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
  const getPetiKemas = async () => {
    const response = await axios.get(`http://localhost:3001/petiKemas/${id}/show`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setFormData({
      email: response.data.data.email,
      nama_perusahaan: response.data.data.nama_perusahaan,
      kegiatan: response.data.data.kegiatan,
      kegiatan_lain: response.data.data.kegiatan_lain,
      lokasi: response.data.data.lokasi,
      nomor: response.data.data.nomor,
      ukuran: response.data.data.ukuran,
      status: response.data.data.status,
      posisi_row: response.data.data.posisi_row,
      posisi_tier: response.data.data.posisi_tier,
      kapasitas_depo: response.data.data.kapasitas_depo,
      kapasitas_digunakan: response.data.data.kapasitas_digunakan,
      surat: response.data.data.surat,
    });
  };

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

      // Use a PUT or PATCH request to update the existing data
      const response = await axios.put(`http://localhost:3001/petiKemas/${id}/update`, formDataForApi, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle successful response
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Data Edited Successfully',
        confirmButtonText: 'OK',
        showConfirmButton: false,
        timer: 1500,
      });
      navigateTo('/dashboard-user/laporan-user');
    } catch (error) {
      console.error('Error updating data:', error);
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