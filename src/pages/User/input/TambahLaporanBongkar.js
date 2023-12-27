import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecoded from 'jwt-decode';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import {
  Button,
  Container,
  Stack,
  Typography,
  Card,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
} from '@mui/material';
// components
import TextField from '@mui/material/TextField';
import useToken from '../../../config/useRequireAuth';


export default function TambahAdminPage() {
  const navigateTo = useNavigate();

  const { token, checkAndLogin } = useToken();
  const [pdokPbm, setpdokPmb] = useState(null);
  const [suratPenunjukanTally, setsuratPenunjukanTally] = useState(null);

  useEffect(() => {
    checkAndLogin();
  }, [token]);

  const decode = jwtDecoded(token);
  const email = decode.email;

  const [formData, setFormData] = useState({
    // eslint-disable-next-line object-shorthand
    tanggal: '',
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
  });

  useEffect(() => {
    checkAndLogin();
  }, [token]);

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
      formDataForApi.append('tanggal', formData.tanggal);
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
      formDataForApi.append('surat_penunjukan_tally', suratPenunjukanTally);

      const response = await axios.post('http://localhost:3001/bongkarMuat', formDataForApi, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.status === 200){
        Swal.fire({
          title: "Laporan Berhasil",
          text: "Di tambahkan",
          icon: "success"
        });
        navigateTo('/dashboard-user/laporan-user');
      }
      // Handle successful response
      
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
            Tambah Laporan Kegiatan Perusahaan Bongkar Muat
          </Typography>
        </Stack>

        <Card>
          <form onSubmit={handleFormSubmit}>
            <Stack direction="row">
              <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 380 }}>
                <FormLabel sx={{ color: 'black', mb: 2 }}>Tanggal</FormLabel>
                <TextField
                  type="date"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  value={formData.tanggal}
                  onChange={handleInputChange}
                  name="tanggal"
                  size="small"
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Kegiatan</FormLabel>
                <Select
                  labelId="select-kegiatan"
                  id="select-kegiatan"
                  onChange={handleInputChange}
                  value={formData.kegiatan}
                  name="kegiatan"
                  label="Kegiatan"
                  sx={{ mb: 3 }}
                  size="small"
                >
                  <MenuItem value={'stevedoring'}>Stevedoring</MenuItem>
                  <MenuItem value={'cargodoring'}>Cargodoring</MenuItem>
                  <MenuItem value={'receiving/delivery'}>Receiving/Delivery</MenuItem>
                </Select>
                <FormLabel sx={{ color: 'black', mb: 2 }}>Bendera</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  name="bendera"
                  value={formData.bendera}
                  onChange={handleInputChange}
                  size="small"
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Nomor RKBM</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  value={formData.no_rkmb}
                  onChange={handleInputChange}
                  name="no_rkmb"
                  size="small"
                />
              </FormControl>
              <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 380 }}>
                <FormLabel sx={{ color: 'black', mb: 2 }}>Nama Kapal</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  name="nama_kapal"
                  value={formData.nama_kapal}
                  onChange={handleInputChange}
                  size="small"
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Nama Perusahaan Angkutan Laut/Agen</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  name="nama_perusahaan_al"
                  value={formData.nama_perusahaan_al}
                  onChange={handleInputChange}
                  size="small"
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Tujuan</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  name="tujuan"
                  value={formData.tujuan}
                  onChange={handleInputChange}
                  size="small"
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Ukuran DWT/GT/HP</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  name="ukuran"
                  value={formData.ukuran}
                  onChange={handleInputChange}
                  size="small"
                />
              </FormControl>
            </Stack>
            <Stack direction="row">
              <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 380 }}>
                <h3>Jenis Muatan</h3>
                <FormLabel sx={{ color: 'black', mb: 2 }}>Jenis Bongkar</FormLabel>
                <Select
                  labelId="select-jumlah-bongkar"
                  id="select-jumlah-bongkar"
                  label="jumlah-bongkar"
                  value={formData.jenis_bongkar}
                  onChange={handleInputChange}
                  name="jenis_bongkar"
                  sx={{ mb: 3 }}
                  size="small"
                >
                  <MenuItem value={'curah cair'}>Curah Cair</MenuItem>
                  <MenuItem value={'curah kering'}>Curah Kering</MenuItem>
                  <MenuItem value={'general cargo'}>General Cargo</MenuItem>
                  <MenuItem value={'life stock'}>Life Stock</MenuItem>
                </Select>
                <FormLabel sx={{ color: 'black', mb: 2 }}>Jenis Muat</FormLabel>
                <Select
                  labelId="select-jumlah-muat"
                  id="select-jumlah-muat"
                  label="jumlah-muat"
                  value={formData.jenis_muat}
                  onChange={handleInputChange}
                  name="jenis_muat"
                  sx={{ mb: 3 }}
                  size="small"
                >
                  <MenuItem value={'curah cair'}>Curah Cair</MenuItem>
                  <MenuItem value={'curah kering'}>Curah Kering</MenuItem>
                  <MenuItem value={'general cargo'}>General Cargo</MenuItem>
                  <MenuItem value={'life stock'}>Life Stock</MenuItem>
                </Select>
                <h3>Kegiatan Bongkar Muat</h3>
                <FormLabel sx={{ color: 'black', mb: 2 }}>Jumlah Bongkar</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  value={formData.jml_bongkar }
                  onChange={handleInputChange}
                  name="jml_bongkar"
                  size="small"
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Jumlah Muat</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  name="jml_muat"
                  value={formData.jml_muat  }
                  onChange={handleInputChange}
                  size="small"
                />
              </FormControl>
            </Stack>
            <Stack direction="row">
              <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 380 }}>
                <h3>Mulai (jam)</h3>
                <FormLabel sx={{ color: 'black', mb: 2 }}>Mulai Bongkar</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  name="mulai_jam_bongkar"
                  value={formData.mulai_jam_bongkar}
                  onChange={handleInputChange}
                  size="small"
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Mulai Muat</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  name="mulai_jam_muat"
                  value={formData.mulai_jam_muat}
                  onChange={handleInputChange}
                  size="small"
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Jumlah Buruh</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  name="jml_buruh"
                  value={formData.jml_buruh}
                  onChange={handleInputChange}
                  size="small"
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Penunjukan PBM</FormLabel>
                <TextField
                  type="file"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  name="pdok_pbm"
                  onChange={(e) => setpdokPmb(e.target.files[0])}
                  size="small"
                />
              </FormControl>
              <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 380 }}>
                <h3>Selesai (jam)</h3>
                <FormLabel sx={{ color: 'black', mb: 2 }}>Selesai Bongkar</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  name="selesai_jam_bongkar"
                  value={formData.selesai_jam_bongkar}
                  onChange={handleInputChange}
                  size="small"
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Selesai Muat</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  name="selesai_jam_muat"
                  value={formData.selesai_jam_muat}
                  onChange={handleInputChange}
                  size="small"
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Pelabuhan Muat</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  name="pelabuhan_muat"
                  value={formData.pelabuhan_muat}
                  onChange={handleInputChange}
                  size="small"
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Upload Surat Penunjukan Tally</FormLabel>
                <TextField
                  type="file"
                  variant="outlined"
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  onChange={(e) => setsuratPenunjukanTally(e.target.files[0])}
                  size="small"
                />
              </FormControl>
            </Stack>
              <Button variant="contained" type="submit" sx={{ mt: 2, mb:3, ml:5 , height:40, width:120 }} color="success">
                Submit
              </Button>
          </form>
        </Card>
      </Container>
    </>
  );
}
