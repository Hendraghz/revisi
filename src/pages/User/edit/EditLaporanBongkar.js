import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import jwtDecoded from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Stack, Typography, Card, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
// components
import TextField from '@mui/material/TextField';
import useToken from '../../../config/useRequireAuth';

export default function TambahAdminPage() {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const { token, checkAndLogin } = useToken();
  const [pdokPbm, setpdokPmb] = useState(null);
  const [suratPenunjukan, setsuratPenunjukan] = useState(null);
  const [suratPenunjukanTally, setsuratPenunjukanTally] = useState(null);

  useEffect(() => {
    checkAndLogin();
    getBongkarMuat();
  }, [token]);

  const decode = jwtDecoded(token);
  const email = decode.email;

  const [formData, setFormData] = useState({
    // eslint-disable-next-line object-shorthand
    email: email,
    nama_perusahaan: '',
    kegiatan: '',
    no_rkmb: '',
    nama_kapal: '',
    bendera: '',
    ukuran: '',
    nama_perusahaan_al: '',
    jenis_bongkar: '',
    jenis_muat: '',
    jml_bongkar: '',
    jml_muat: '',
    mulai_jam_bongkar: '',
    mulai_jam_muat: '',
    selesai_jam_bongkar: '',
    selesai_jam_muat: '',
    jml_buruh: '',
    pelabuhan_muat: '',
    tujuan: '',
    surat: null,
  });

  const getBongkarMuat = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/bongkarMuat/${id}/show`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Set the form data with the response data
      setFormData({
        email: response.data.data.email,
        nama_perusahaan: response.data.data.nama_perusahaan,
        kegiatan: response.data.data.kegiatan,
        no_rkmb: response.data.data.no_rkmb,
        nama_kapal: response.data.data.nama_kapal,
        bendera: response.data.data.bendera,
        ukuran: response.data.data.ukuran,
        nama_perusahaan_al: response.data.data.nama_perusahaan_al,
        jenis_bongkar: response.data.data.jenis_bongkar,
        jenis_muat: response.data.data.jenis_muat,
        jml_bongkar: response.data.data.jml_bongkar,
        jml_muat: response.data.data.jml_muat,
        mulai_jam_bongkar: response.data.data.mulai_jam_bongkar,
        mulai_jam_muat: response.data.data.mulai_jam_muat,
        selesai_jam_bongkar: response.data.data.selesai_jam_bongkar,
        selesai_jam_muat: response.data.data.selesai_jam_muat,
        jml_buruh: response.data.data.jml_buruh,
        pelabuhan_muat: response.data.data.pelabuhan_muat,
        tujuan: response.data.data.tujuan,
        surat: response.data.data.surat,
      });

      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataForApi = new FormData();
      formDataForApi.append('email', formData.email);
      formDataForApi.append('nama_perusahaan', formData.nama_perusahaan);
      formDataForApi.append('kegiatan', formData.kegiatan);
      formDataForApi.append('no_rkmb', formData.no_rkmb);
      formDataForApi.append('nama_kapal', formData.nama_kapal);
      formDataForApi.append('bendera', formData.bendera);
      formDataForApi.append('ukuran', formData.ukuran);
      formDataForApi.append('nama_perusahaan_al', formData.nama_perusahaan_al);
      formDataForApi.append('jenis_bongkar', formData.jenis_bongkar);
      formDataForApi.append('jenis_muat', formData.jenis_muat);
      formDataForApi.append('jml_bongkar', formData.jml_bongkar);
      formDataForApi.append('jml_muat', formData.jml_muat);
      formDataForApi.append('mulai_jam_bongkar', formData.mulai_jam_bongkar);
      formDataForApi.append('mulai_jam_muat', formData.mulai_jam_muat);
      formDataForApi.append('selesai_jam_bongkar', formData.selesai_jam_bongkar);
      formDataForApi.append('selesai_jam_muat', formData.selesai_jam_muat);
      formDataForApi.append('jml_buruh', formData.jml_buruh);
      formDataForApi.append('pelabuhan_muat', formData.pelabuhan_muat);
      formDataForApi.append('tujuan', formData.tujuan);
      formDataForApi.append('pdok_pbm', pdokPbm);
      formDataForApi.append('surat_penunjukan', suratPenunjukan);
      formDataForApi.append('surat_penunjukan_tally', suratPenunjukanTally);

      const response = await axios.put(`http://localhost:3001/bongkarMuat/${id}/update`, formDataForApi, {
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
            Tambah Laporan Kegiatan Perusahaan Bongkar Muat
          </Typography>
        </Stack>

        <Card>
          <form onSubmit={handleFormSubmit}>
            <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 530 }}>
              <FormLabel sx={{ color: 'black' }}>Kegiatan</FormLabel>
              <Select
                labelId="select-kegiatan"
                id="select-kegiatan"
                onChange={handleInputChange}
                value={formData.kegiatan}
                name="kegiatan"
                label="Kegiatan"
              >
                <MenuItem value={'stevedoring'}>Stevedoring</MenuItem>
                <MenuItem value={'cargodoring'}>Cargodoring</MenuItem>
                <MenuItem value={'receiving/delivery'}>Receiving/Delivery</MenuItem>
              </Select>
              <FormLabel sx={{ color: 'black' }}>Nomor RKBM</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                value={formData.no_rkmb}
                onChange={handleInputChange}
                name="no_rkmb"
              />
              <FormLabel sx={{ color: 'black' }}>Nama Kapal</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="nama_kapal"
                value={formData.nama_kapal}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black' }}>Bendera</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="bendera"
                value={formData.bendera}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black' }}>Ukuran DWT/GT/HP</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="ukuran"
                value={formData.ukuran}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black' }}>Nama Perusahaan Angkutan Laut/Agen</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="nama_perusahaan_al"
                value={formData.nama_perusahaan_al}
                onChange={handleInputChange}
              />
              <h3>Jenis Muatan</h3>
              <FormLabel sx={{ color: 'black' }}>Jumlah Bongkar</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                value={formData.jenis_bongkar}
                onChange={handleInputChange}
                name="jenis_bongkar"
              />
              <FormLabel sx={{ color: 'black' }}>Jumlah Muat</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="jenis_muat"
                value={formData.jenis_muat}
                onChange={handleInputChange}
              />
              <h2>Kegiatan Bongkar Muat</h2>
              <h3>Jumlah</h3>
              <FormLabel sx={{ color: 'black' }}>Jumlah Bongkar</FormLabel>
              <Select
                labelId="select-jumlah-bongkar"
                id="select-jumlah-bongkar"
                label="jumlah-bongkar"
                value={formData.jml_bongkar}
                onChange={handleInputChange}
                name="jml_bongkar"
              >
                <MenuItem value={'curah cair'}>Curah Cair</MenuItem>
                <MenuItem value={'curah kering'}>Curah Kering</MenuItem>
                <MenuItem value={'general cargo'}>General Cargo</MenuItem>
                <MenuItem value={'life stock'}>Life Stock</MenuItem>
              </Select>
              <FormLabel sx={{ color: 'black' }}>Jumlah Muat</FormLabel>
              <Select
                labelId="select-jumlah-muat"
                id="select-jumlah-muat"
                label="jumlah-muat"
                value={formData.jml_muat}
                onChange={handleInputChange}
                name="jml_muat"
              >
                <MenuItem value={'curah cair'}>Curah Cair</MenuItem>
                <MenuItem value={'curah kering'}>Curah Kering</MenuItem>
                <MenuItem value={'general cargo'}>General Cargo</MenuItem>
                <MenuItem value={'life stock'}>Life Stock</MenuItem>
              </Select>
              <h3>Mulai (jam)</h3>
              <FormLabel sx={{ color: 'black' }}>Jumlah Bongkar</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="mulai_jam_bongkar"
                value={formData.mulai_jam_bongkar}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black' }}>Jumlah Muat</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="mulai_jam_muat"
                value={formData.mulai_jam_muat}
                onChange={handleInputChange}
              />
              <h3>Selesai (jam)</h3>
              <FormLabel sx={{ color: 'black' }}>Jumlah Bongkar</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="selesai_jam_bongkar"
                value={formData.selesai_jam_bongkar}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black' }}>Jumlah Muat</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb: 7 }}
                name="selesai_jam_muat"
                value={formData.selesai_jam_muat}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black' }}>Jumlah Buruh</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="jml_buruh"
                value={formData.jml_buruh}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black' }}>Pelabuhan Muat</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="pelabuhan_muat"
                value={formData.pelabuhan_muat}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black' }}>Tujuan</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="tujuan"
                value={formData.tujuan}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black' }}>Penunjukan PBM</FormLabel>
              <TextField
                type="file"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="pdok_pbm"
                onChange={(e) => setpdokPmb(e.target.files[0])}
              />
              <FormLabel sx={{ color: 'black' }}>Upload Surat Penunjukan</FormLabel>
              <TextField
                type="file"
                variant="outlined"
                sx={{ backgroundColor: '#fafafa' }}
                multiple
                onChange={(e) => setsuratPenunjukan(e.target.files[0])}
              />
              <FormLabel sx={{ color: 'black' }}>Upload Surat Penunjukan Tally</FormLabel>
              <TextField
                type="file"
                variant="outlined"
                sx={{ backgroundColor: '#fafafa' }}
                name="surat_penunjukan_tally"
                multiple
                onChange={(e) => setsuratPenunjukanTally(e.target.files[0])}
              />
              <Button variant="contained" type="submit" sx={{ mt: 2 }} color="success">
                Submit
              </Button>
            </FormControl>
            <ToastContainer />
          </form>
        </Card>
      </Container>
    </>
  );
}
