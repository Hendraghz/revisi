import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import jwtDecoded from 'jwt-decode';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from '@mui/material';
// components
import TextField from '@mui/material/TextField';
import useToken from '../../../config/useRequireAuth';

export default function TambahAdminPage() {
  const [tokenref, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [email, setemail] = useState('');
  const [namaPerusahaan, setperusahaan] = useState('');
  const [lainnyaSelected, setLainnyaSelected] = useState(false);
  const { token, checkAndLogin } = useToken();
  const [totalVolume, setTotalVolume] = useState('');
  const [totalVolumeImport, setTotalVolumeImport] = useState(0);
  const [totalVolumeExport, setTotalVolumeExport] = useState(0);
  const [totalVolumeAntarPulau, setTotalVolumeAntarPulau] = useState(0);
  const [totalVolumeAntarKota, setTotalVolumeAntarKota] = useState(0);
  const navigateTo = useNavigate();
  const [selectedMuatanOption, setSelectedMuatanOption] = useState(''); // Add this line

  const [formData, setFormData] = useState({
    tanggal: '',
    email,
    namaPerusahaan: '',
    nama_pemilik_brg: '',
    nama_brg: '',
    jenis_moda_trns: '',
    nama_kpl_pswt: '',
    no_kendaraan: '',
    jenis_kegiatan: '',
    asal_imp: '',
    tujuan_exp: '',
    tujuan_antarpulau: '',
    tujuan_antarkota: '',
    asal_antarkota: '',
    asal_antarpulau: '',
    muatan: '',
    imp_asal: '',
    imp_voulme: 0,
    exp_tujuan: '',
    exp_voulme: 0,
    ap_asal: '',
    ap_tujuan: '',
    ap_voulme: 0,
    ak_asal: '',
    ak_tujuan: '',
    ak_voulme: 0,
    jml_muatan: 0,
    surat: null,
  });

  useEffect(() => {
    checkAndLogin();
    refreshTokens();

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    setFormData({
      ...formData,
      tanggal: formattedDate,
    });
    const sum =
      (totalVolumeImport === '' ? '' : Number(totalVolumeImport)) +
      (totalVolumeExport === '' ? '' : Number(totalVolumeExport)) +
      (totalVolumeAntarPulau === '' ? '' : Number(totalVolumeAntarPulau)) +
      (totalVolumeAntarKota === '' ? '' : Number(totalVolumeAntarKota));

    setTotalVolume(sum);
  }, [totalVolumeImport, totalVolumeExport, totalVolumeAntarPulau, totalVolumeAntarKota]);

  const handleInputChange = (e) => {
    // Menangani perubahan input teks dan dropdown
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'jenis_kegiatan') {
      // Check if the selected option is "Lainnya"
      setLainnyaSelected(e.target.value === 'lainnya');
    }
  };

  const handleChangeVolume = (e, label) => {
    const value = e.target.value;
    if (label === 'Number 1') {
      setTotalVolumeImport(value);
    } else if (label === 'Number 2') {
      setTotalVolumeExport(value);
    } else if (label === 'Number 3') {
      setTotalVolumeAntarPulau(value);
    } else if (label === 'Number 4') {
      setTotalVolumeAntarKota(value);
    }
  };

  const refreshTokens = async () => {
    try {
      const response = await axios.get('http://localhost:3001/refresh');
      setToken(response.data.accessToken);
      const decoded = jwtDecoded(response.data.accessToken);
      console.log(decoded);
      setemail(decoded.email);
      setperusahaan(decoded.perusahaan);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };

  const instance = axios.create();

  instance.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        try {
          const response = await axios.get('http://localhost:3001/refresh');
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          setToken(response.data.accessToken);
          const decoded = jwtDecoded(response.data.accessToken);
          setemail(decoded.email);
          setperusahaan(decoded.namaPerusahaan);
          setExpire(decoded.exp);
        } catch (error) {
          // Handle error here, e.g., by logging or navigating to the login page
          console.error('Error refreshing token:', error);
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleFileChange = (e) => {
    // Menangani perubahan input file
    setFormData({
      ...formData,
      surat: e.target.files[0],
    });
  };
  const handleChangeRadio = (e) => {
    const value = e.target.value;
    setSelectedMuatanOption(value);
    console.log(value);
    // Clear form fields based on the selected radio option
    if (value === 'impor') {
      setFormData({
        ...formData,
        asal_imp: '',
      });
      setTotalVolumeImport(0);
      setTotalVolume(0);
      setTotalVolumeExport(0);
      setTotalVolumeAntarPulau(0);
      setTotalVolumeAntarKota(0);
    } else if (value === 'ekspor') {
      setFormData({
        ...formData,
        tujuan_exp: '',
      });
      setTotalVolumeExport(0);
      setTotalVolumeImport(0);
      setTotalVolumeAntarPulau(0);
      setTotalVolume(0);
      setTotalVolumeAntarKota(0);
    } else if (value === 'antarPulau') {
      setFormData({
        ...formData,
        asal_antarpulau: '',
        tujuan_antarpulau: '',
      });
      setTotalVolumeAntarPulau(0);
      setTotalVolumeImport(0);
      setTotalVolume(0);
      setTotalVolumeExport(0);
      setTotalVolumeAntarKota(0);
    } else if (value === 'antarKota') {
      setFormData({
        ...formData,
        asal_antarkota: '',
        tujuan_antarkota: '',
      });
      setTotalVolumeAntarKota(0);
      setTotalVolumeAntarPulau(0);
      setTotalVolumeImport(0);
      setTotalVolume(0);
      setTotalVolumeExport(0);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const decode = jwtDecoded(token);
    const email = decode.email;
    try {
      const formDataForApi = new FormData();
      formDataForApi.append('tanggal', formData.tanggal);
      formDataForApi.append('email', email);
      formDataForApi.append('nama_perusahaan', formData.namaPerusahaan);
      formDataForApi.append('nama_pemilik_brg', formData.nama_pemilik_brg);
      formDataForApi.append('nama_brg', formData.nama_brg);
      formDataForApi.append('jenis_moda_trns', formData.jenis_moda_trns);
      formDataForApi.append('nama_kpl_pswt', formData.nama_kpl_pswt);
      formDataForApi.append('no_kendaraan', formData.no_kendaraan);
      formDataForApi.append('jenis_kegiatan', formData.jenis_kegiatan);
      formDataForApi.append('muatan', formData.muatan);
      formDataForApi.append('imp_asal', formData.imp_asal);
      formDataForApi.append('imp_voulme', totalVolumeImport);
      formDataForApi.append('exp_tujuan', formData.exp_tujuan);
      formDataForApi.append('exp_voulme', totalVolumeExport);
      formDataForApi.append('ap_asal', formData.ap_asal);
      formDataForApi.append('ap_tujuan', formData.ap_tujuan);
      formDataForApi.append('ap_voulme', totalVolumeAntarPulau);
      formDataForApi.append('ak_asal', formData.ak_asal);
      formDataForApi.append('ak_tujuan', formData.ak_tujuan);
      formDataForApi.append('ak_voulme', totalVolumeAntarKota);
      formDataForApi.append('jml_muatan', totalVolume);
      formDataForApi.append('surat', formData.surat);

      const response = await axios.post('http://localhost:3001/transportasi', formDataForApi, {
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
            Tambah Laporan Kegiatan Perusahaan Jasa Pengurusan Transportasi
          </Typography>
        </Stack>

        <Card>
          <form onSubmit={handleFormSubmit}>
            <Stack direction="row">
              <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 350 }}>
                <FormLabel sx={{ color: 'black', mb: 2 }}>Tanggal</FormLabel>
                <TextField
                  type="date"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleInputChange}
                  size="small"
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Nama Pemilik Barang</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  name="nama_pemilik_brg"
                  value={formData.nama_pemilik_brg}
                  onChange={handleInputChange}
                  size="small"
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Nama Barang</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  name="nama_brg"
                  value={formData.nama_brg}
                  onChange={handleInputChange}
                  size="small"
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Jenis Moda Transportasi</FormLabel>
                <Select
                  labelId="select-moda-transportasi"
                  id="select-moda-transportasi"
                  name="jenis_moda_trns"
                  sx={{ mb: 3 }}
                  value={formData.jenis_moda_trns}
                  onChange={handleInputChange}
                  size="small"
                >
                  <MenuItem value={'kapal'}>Kapal</MenuItem>
                  <MenuItem value={'pesawat'}>Pesawat</MenuItem>
                  <MenuItem value={'kereta'}>Kereta</MenuItem>
                  <MenuItem value={'truck'}>Truck</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 350 }}>
                <FormLabel sx={{ color: 'black', mb: 2 }}>Nama Kapal/Pesawat</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  name="nama_kpl_pswt"
                  value={formData.nama_kpl_pswt}
                  onChange={handleInputChange}
                  size="small"
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Nomor Kendaraan</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder=""
                  name="no_kendaraan"
                  value={formData.no_kendaraan}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  size="small"
                />
                <FormLabel sx={{ color: 'black', mb: 2 }}>Jenis Kegiatan</FormLabel>
                <Select
                  labelId="jenis-kegiatan"
                  id="jenis-kegiatan"
                  name="jenis_kegiatan"
                  sx={{ mb: 3 }}
                  value={formData.jenis_kegiatan}
                  onChange={handleInputChange}
                  size="small"
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
                  <MenuItem value="penyelesaian-tagihan">
                    Penyelesaian Tagihan dan Biaya Lainnya yang Diperlukan
                  </MenuItem>
                  <MenuItem value="penyediaan-sistem-informasi">Penyediaan Sistem Informasi dan Komunikasi</MenuItem>
                  <MenuItem value="layanan-logistik">
                    Layanan Logistik Penyediaan Layanan Logistik di Pasar Nasional dan Internasional Secara Konvensional
                    dan/atau Elektronik
                  </MenuItem>
                  <MenuItem value="lainnya">Lainnya</MenuItem>
                </Select>
                {lainnyaSelected && (
                  <>
                    {/* Additional text field for "Detail Kegiatan (Lainnya)" */}
                    <FormLabel sx={{ color: 'black', mb: 2 }}>Jenis Kegiatan (Lainnya)</FormLabel>
                    <TextField
                      type="text"
                      variant="outlined"
                      placeholder=""
                      sx={{ backgroundColor: '#fafafa', mb: 3 }}
                      name="lainnya_detail"
                      value={formData.lainnya_detail}
                      onChange={handleInputChange}
                      size="small"
                    />
                  </>
                )}
                <FormLabel sx={{ color: 'black', mb: 2 }}>Muatan</FormLabel>
                <TextField
                  type="text"
                  variant="outlined"
                  placeholder=""
                  sx={{ backgroundColor: '#fafafa', mb: 3 }}
                  name="muatan"
                  value={formData.muatan}
                  onChange={handleInputChange}
                  size="small"
                />
              </FormControl>
            </Stack>
            <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 550 }}>
              <h2>Muatan</h2>
              <RadioGroup
                row
                aria-label="muatan-options"
                name="muatan-options"
                value={selectedMuatanOption}
                onChange={handleChangeRadio}
                size="small"
              >
                <FormControlLabel value="impor" control={<Radio />} label="Impor" />
                <FormControlLabel value="ekspor" control={<Radio />} label="Ekspor" />
                <FormControlLabel value="antarPulau" control={<Radio />} label="Antar Pulau" />
                <FormControlLabel value="antarKota" control={<Radio />} label="Antar Kota/Kabupaten" />
              </RadioGroup>
              {selectedMuatanOption === 'impor' && (
                <>
                  <h3>Impor</h3>
                  <FormLabel sx={{ color: 'black', mb: 2 }}>Asal</FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    placeholder=""
                    sx={{ backgroundColor: '#fafafa', mb: 3 }}
                    name="imp_asal"
                    value={formData.imp_asal}
                    onChange={handleInputChange}
                    size="small"
                  />
                  <FormLabel sx={{ color: 'black', mb: 2 }}>Volume (Kg/Ton)</FormLabel>
                  <TextField
                    type="number"
                    variant="outlined"
                    placeholder=""
                    sx={{ backgroundColor: '#fafafa', mb: 3 }}
                    name="totalVolumeImport"
                    value={totalVolumeImport}
                    onChange={(e) => handleChangeVolume(e, 'Number 1')}
                    size="small"
                  />
                </>
              )}
              {selectedMuatanOption === 'ekspor' && (
                <>
                  <h3>Ekspor</h3>
                  <FormLabel sx={{ color: 'black', mb: 2 }}>Tujuan</FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    placeholder=""
                    sx={{ backgroundColor: '#fafafa', mb: 3 }}
                    name="exp_tujuan"
                    value={formData.exp_tujuan}
                    onChange={handleInputChange}
                    size="small"
                  />
                  <FormLabel sx={{ color: 'black', mb: 2 }}>Volume (Kg/Ton)</FormLabel>
                  <TextField
                    type="number"
                    variant="outlined"
                    placeholder=""
                    sx={{ backgroundColor: '#fafafa', mb: 3 }}
                    name="totalVolumeExport"
                    value={totalVolumeExport}
                    onChange={(e) => handleChangeVolume(e, 'Number 2')}
                    size="small"
                  />
                </>
              )}
              {selectedMuatanOption === 'antarPulau' && (
                <>
                  <h3>Antar Pulau</h3>
                  <FormLabel sx={{ color: 'black', mb: 2 }}>Asal</FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    placeholder=""
                    sx={{ backgroundColor: '#fafafa', mb: 3 }}
                    name="ap_asal"
                    value={formData.ap_asal}
                    onChange={handleInputChange}
                    size="small"
                  />
                  <FormLabel sx={{ color: 'black', mb: 2 }}>Tujuan</FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    placeholder=""
                    sx={{ backgroundColor: '#fafafa', mb: 3 }}
                    name="ap_tujuan"
                    value={formData.ap_tujuan}
                    onChange={handleInputChange}
                    size="small"
                  />
                  <FormLabel sx={{ color: 'black', mb: 2 }}>Volume (Kg/Ton)</FormLabel>
                  <TextField
                    type="number"
                    variant="outlined"
                    placeholder=""
                    sx={{ backgroundColor: '#fafafa', mb: 3 }}
                    name="totalVolumeAntarPulau"
                    value={totalVolumeAntarPulau}
                    onChange={(e) => handleChangeVolume(e, 'Number 3')}
                    size="small"
                  />
                </>
              )}
              {selectedMuatanOption === 'antarKota' && (
                <>
                  <h3>Antar Kota</h3>
                  <FormLabel sx={{ color: 'black', mb: 2 }}>Asal</FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    placeholder=""
                    sx={{ backgroundColor: '#fafafa', mb: 3 }}
                    name="ak_asal"
                    value={formData.ak_asal}
                    onChange={handleInputChange}
                    size="small"
                  />
                  <FormLabel sx={{ color: 'black', mb: 2 }}>Tujuan</FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    placeholder=""
                    sx={{ backgroundColor: '#fafafa', mb: 3 }}
                    name="ak_tujuan"
                    value={formData.ak_tujuan}
                    onChange={handleInputChange}
                    size="small"
                  />
                  <FormLabel sx={{ color: 'black', mb: 2 }}>Volume (Kg/Ton)</FormLabel>
                  <TextField
                    type="number"
                    variant="outlined"
                    placeholder=""
                    sx={{ backgroundColor: '#fafafa', mb: 3 }}
                    name="totalVolumeAntarKota"
                    value={totalVolumeAntarKota}
                    onChange={(e) => handleChangeVolume(e, 'Number 4')}
                    size="small"
                  />
                </>
              )}

              <FormLabel sx={{ color: 'black', mb: 2 }}>Jumlah Muatan</FormLabel>
              <TextField
                type="number"
                variant="outlined"
                name="jml_in_out"
                value={totalVolume} // Display the total volume
                readOnly // Make the field read-only
                sx={{ backgroundColor: '#fafafa', mb: 3 }}
                size="small"
              />
              <FormLabel sx={{ color: 'black', mb: 2 }}>Upload Surat Penunjukan Tally</FormLabel>
              <TextField
                type="file"
                variant="outlined"
                name="filename"
                onChange={handleFileChange}
                sx={{ backgroundColor: '#fafafa', mb: 3 }}
                size="small"
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
