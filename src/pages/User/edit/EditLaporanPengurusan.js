import * as React from 'react';
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

export default function EditLaporanPengurusan() {
  const { token, checkAndLogin } = useToken();
  const { id } = useParams();
  const decoded = jwtDecoded(token);
  const email = decoded.email;
  const navigateTo = useNavigate();

  useEffect(() => {
    checkAndLogin();
    getTransportasi();
  }, []);

  const [formData, setFormData] = useState({
    email,
    namaPerusahaan: '',
    nama_pemilik_brg: '',
    nama_brg: '',
    jenis_moda_trns: '',
    nama_kpl_pswt: '',
    no_kendaraan: '',
    jenis_kegiatan: '',
    muatan: '',
    in_imp_pib: '',
    in_imp_volume: '',
    in_ap_pib: '',
    in_ap_volume: '',
    out_imp_pib: '',
    out_imp_volume: '',
    out_ap_pib: '',
    out_ap_volume: '',
    jml_in_out: '',
    surat: null,
  });

  const getTransportasi = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/transportasi/${id}/show`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Set the fetched data in the form state
      setFormData({
        email: response.data.data.email,
        namaPerusahaan: response.data.data.namaPerusahaan,
        nama_pemilik_brg: response.data.data.nama_pemilik_brg,
        nama_brg: response.data.data.nama_brg,
        jenis_moda_trns: response.data.data.jenis_moda_trns,
        nama_kpl_pswt: response.data.data.nama_kpl_pswt,
        no_kendaraan: response.data.data.no_kendaraan,
        jenis_kegiatan: response.data.data.jenis_kegiatan,
        muatan: response.data.data.muatan,
        in_imp_pib: response.data.data.in_imp_pib,
        in_imp_volume: response.data.data.in_imp_volume,
        in_ap_pib: response.data.data.in_ap_pib,
        in_ap_volume: response.data.data.in_ap_volume,
        out_imp_pib: response.data.data.out_imp_pib,
        out_imp_volume: response.data.data.out_imp_volume,
        out_ap_pib: response.data.data.out_ap_pib,
        out_ap_volume: response.data.data.out_ap_volume,
        jml_in_out: response.data.data.jml_in_out,
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
      formDataForApi.append('email', formData.email);
      formDataForApi.append('nama_perusahaan', formData.namaPerusahaan);
      formDataForApi.append('nama_pemilik_brg', formData.nama_pemilik_brg);
      formDataForApi.append('nama_brg', formData.nama_brg);
      formDataForApi.append('jenis_moda_trns', formData.jenis_moda_trns);
      formDataForApi.append('nama_kpl_pswt', formData.nama_kpl_pswt);
      formDataForApi.append('no_kendaraan', formData.no_kendaraan);
      formDataForApi.append('jenis_kegiatan', formData.jenis_kegiatan);
      formDataForApi.append('muatan', formData.muatan);
      formDataForApi.append('in_imp_pib', formData.in_imp_pib);
      formDataForApi.append('in_imp_volume', formData.in_imp_volume);
      formDataForApi.append('in_ap_pib', formData.in_ap_pib);
      formDataForApi.append('in_ap_volume', formData.in_ap_volume);
      formDataForApi.append('out_imp_pib', formData.out_imp_pib);
      formDataForApi.append('out_imp_volume', formData.out_imp_volume);
      formDataForApi.append('out_ap_pib', formData.out_ap_pib);
      formDataForApi.append('out_ap_volume', formData.out_ap_volume);
      formDataForApi.append('jml_in_out', formData.jml_in_out);
      formDataForApi.append('surat', formData.surat);

      const response = await axios.put(`http://localhost:3001/transportasi/${id}/update`, formDataForApi, {
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
        title: 'Data Edited Diubah',
        confirmButtonText: 'OK',
        showConfirmButton: false,
        timer: 1500,
      });
      navigateTo('/dashboard-user');
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
            Ubah Laporan Kegiatan Perusahaan Jasa Pengurusan Transportasi
          </Typography>
        </Stack>

        <Card>
          <form onSubmit={handleFormSubmit}>
            <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 530 }}>
              <FormLabel sx={{ color: 'black' }}>Nama Pemilik Barang</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="nama_pemilik_brg"
                value={formData.nama_pemilik_brg}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black' }}>Nama Barang</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="nama_brg"
                value={formData.nama_brg}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black' }}>Jenis Moda Transportasi</FormLabel>
              <Select
                labelId="select-moda-transportasi"
                id="select-moda-transportasi"
                name="jenis_moda_trns"
                value={formData.jenis_moda_trns}
                onChange={handleInputChange}
              >
                <MenuItem value={'kapal'}>Kapal</MenuItem>
                <MenuItem value={'pesawat'}>Pesawat</MenuItem>
                <MenuItem value={'kereta'}>Kereta</MenuItem>
                <MenuItem value={'truck'}>Truck</MenuItem>
              </Select>
              <FormLabel sx={{ color: 'black' }}>Nama Kapal/Pesawat</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="nama_kpl_pswt"
                value={formData.nama_kpl_pswt}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black' }}>Nomor Kendaraan</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                name="no_kendaraan"
                value={formData.no_kendaraan}
                onChange={handleInputChange}
                sx={{ backgroundColor: '#fafafa' }}
              />
              <FormLabel sx={{ color: 'black' }}>Jenis Kegiatan</FormLabel>
              <Select
                labelId="jenis-kegiatan"
                id="jenis-kegiatan"
                name="jenis_kegiatan"
                value={formData.jenis_kegiatan}
                onChange={handleInputChange}
              >
                <MenuItem value="penerimaan">Penerimaan</MenuItem>
                <MenuItem value="pengelolaan-penyimpanan">Pengelolaan Penyimpanan</MenuItem>
                <MenuItem value="sortasi">Sortasi</MenuItem>
                <MenuItem value="pengepakan">Pengepakan</MenuItem>
                <MenuItem value="penandaan">Penandaan</MenuItem>
                <MenuItem value="pengukuran">Pengukuran</MenuItem>
                <MenuItem value="penimbangan">Penimbangan</MenuItem>
                <MenuItem value="pengelolaan-transportasi">Pengelolaan Transportasi</MenuItem>
                <MenuItem value="penerbitan-dokumen">
                  Penerbitan Dokumen Angkutan Barang melalui Moda Transportasi Darat, Laut, dan/atau Udara
                </MenuItem>
                <MenuItem value="pengurusan-penyelesaian-dokumen">Pengurusan Penyelesaian Dokumen</MenuItem>
                <MenuItem value="pemesanan-ruangan-pengangkut">Pemesanan Ruangan Pengangkut</MenuItem>
                <MenuItem value="pengiriman">Pengiriman</MenuItem>
                <MenuItem value="pengelolaan-pendistribusian">Pengelolaan Pendistribusian</MenuItem>
                <MenuItem value="perhitungan-biaya">Perhitungan Biaya Angkutan dan Logistik</MenuItem>
                <MenuItem value="klaim">Klaim</MenuItem>
                <MenuItem value="asuransi">Asuransi atas Pengiriman Barang</MenuItem>
                <MenuItem value="penyelesaian-tagihan">Penyelesaian Tagihan dan Biaya Lainnya yang Diperlukan</MenuItem>
                <MenuItem value="penyediaan-sistem-informasi">Penyediaan Sistem Informasi dan Komunikasi</MenuItem>
                <MenuItem value="layanan-logistik">
                  Layanan Logistik Penyediaan Layanan Logistik di Pasar Nasional dan Internasional Secara Konvensional
                  dan/atau Elektronik
                </MenuItem>
              </Select>
              <FormLabel sx={{ color: 'black' }}>Muatan</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="muatan"
                value={formData.muatan}
                onChange={handleInputChange}
              />
              <h1>Inklaring</h1>
              <h2>Impor</h2>
              <FormLabel sx={{ color: 'black' }}>Nomor PIB</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="in_imp_pib"
                value={formData.in_imp_pib}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black' }}>Volume (Kg/Ton)</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="in_imp_volume"
                value={formData.in_imp_volume}
                onChange={handleInputChange}
              />
              <h2>Antar Pulau</h2>
              <FormLabel sx={{ color: 'black' }}>Nomor PBB</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
                name="in_ap_pib"
                value={formData.in_ap_pib}
                onChange={handleInputChange}
              />
              <FormLabel sx={{ color: 'black' }}>Volume (Kg/Ton)</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                name="in_ap_volume"
                value={formData.in_ap_volume}
                onChange={handleInputChange}
                sx={{ backgroundColor: '#fafafa' }}
              />
              <h1>Outklaring</h1>
              <h2>Ekspor</h2>
              <FormLabel sx={{ color: 'black' }}>Nomor PEB</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                className="noPIBImport"
                value={formData.out_imp_pib}
                name="out_imp_pib"
                onChange={handleInputChange}
                sx={{ backgroundColor: '#fafafa' }}
              />
              <FormLabel sx={{ color: 'black' }}>Volume (Kg/Ton)</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                name="out_imp_volume"
                value={formData.out_imp_volume}
                onChange={handleInputChange}
                sx={{ backgroundColor: '#fafafa' }}
              />
              <h2>Antar Pulau</h2>
              <FormLabel sx={{ color: 'black' }}>Nomor PMB</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                name="out_ap_pib"
                value={formData.out_ap_pib}
                onChange={handleInputChange}
                sx={{ backgroundColor: '#fafafa' }}
              />
              <FormLabel sx={{ color: 'black' }}>Volume (Kg/Ton)</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                name="out_ap_volume"
                value={formData.out_ap_volume}
                onChange={handleInputChange}
                sx={{ backgroundColor: '#fafafa', mb: 7 }}
              />
              <FormLabel sx={{ color: 'black' }}>Jumlah Inklaring + Outklaring</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                name="jml_in_out"
                value={formData.jml_in_out}
                onChange={handleInputChange}
                placeholder=""
                sx={{ backgroundColor: '#fafafa' }}
              />
              <FormLabel sx={{ color: 'black' }}>Upload Surat Penunjukan Tally</FormLabel>
              <TextField
                type="file"
                variant="outlined"
                name="surat"
                multiple
                onChange={handleFileChange}
                sx={{ backgroundColor: '#fafafa' }}
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
