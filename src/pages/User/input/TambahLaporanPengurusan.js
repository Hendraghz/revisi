import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import jwtDecoded from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
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
  const [totalVolumeImport, setTotalVolumeImport] = useState('');
  const [totalVolumeExport, setTotalVolumeExport] = useState('');
  const [totalVolumeAntarPulau, setTotalVolumeAntarPulau] = useState('');
  const [totalVolumeAntarKota, setTotalVolumeAntarKota] = useState('');
  const navigateTo = useNavigate();
  const [selectedMuatanOption, setSelectedMuatanOption] = useState(''); // Add this line

  const [formData, setFormData] = useState({
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
    in_imp_pib: '',
    volumeimport: '',
    volumeexport: '',
    volumeantarpulau: '',
    volumeantarkota: '',
    in_ap_pib: '',
    in_ap_volume: '',
    out_imp_pib: '',
    out_imp_volume: '',
    out_ap_pib: '',
    out_ap_volume: '',
    jml_in_out: '',
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
    console.log(value)
    // Clear form fields based on the selected radio option
    if (value === 'impor') {
    setFormData({
      ...formData,
      asal_imp: '',
    });
    setTotalVolumeImport('');
    setTotalVolume('');
    setTotalVolumeExport('');
    setTotalVolumeAntarPulau('');
    setTotalVolumeAntarKota('');
  } else if (value === 'ekspor') {
    setFormData({
      ...formData,
      tujuan_exp: '',
    });
    setTotalVolumeExport('');
    setTotalVolumeImport('');
    setTotalVolumeAntarPulau('');
    setTotalVolume('');
    setTotalVolumeAntarKota('');
  } else if (value === 'antarPulau') {
    setFormData({
      ...formData,
      asal_antarpulau: '',
      tujuan_antarpulau: '',
    });
    setTotalVolumeAntarPulau('');
    setTotalVolumeImport('');
    setTotalVolume('');
    setTotalVolumeExport('');
    setTotalVolumeAntarKota('');
  } else if (value === 'antarKota') {
    setFormData({
      ...formData,
      asal_antarkota: '',
      tujuan_antarkota: '',
    });
    setTotalVolumeAntarKota('');
    setTotalVolumeAntarPulau('');
    setTotalVolumeImport('');
    setTotalVolume('');
    setTotalVolumeExport('');
  }
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
      formDataForApi.append('jml_in_out', totalVolume.toString());

      const response = await axios.post('http://localhost:3001/transportasi', formDataForApi, {
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
            Tambah Laporan Kegiatan Perusahaan Jasa Pengurusan Transportasi
          </Typography>
        </Stack>

        <Card>
          <form onSubmit={handleFormSubmit}>
            <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 730 }}>
              <FormLabel sx={{ color: 'black', mb: 2 }}>Nama Pemilik Barang</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb: 3 }}
                name="nama_pemilik_brg"
                value={formData.nama_pemilik_brg}
                onChange={handleInputChange}
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
              />
              <FormLabel sx={{ color: 'black', mb: 2 }}>Jenis Moda Transportasi</FormLabel>
              <Select
                labelId="select-moda-transportasi"
                id="select-moda-transportasi"
                name="jenis_moda_trns"
                sx={{ mb: 3 }}
                value={formData.jenis_moda_trns}
                onChange={handleInputChange}
              >
                <MenuItem value={'kapal'}>Kapal</MenuItem>
                <MenuItem value={'pesawat'}>Pesawat</MenuItem>
                <MenuItem value={'kereta'}>Kereta</MenuItem>
                <MenuItem value={'truck'}>Truck</MenuItem>
              </Select>
              <FormLabel sx={{ color: 'black', mb: 2 }}>Nama Kapal/Pesawat</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder=""
                sx={{ backgroundColor: '#fafafa', mb: 3 }}
                name="nama_kpl_pswt"
                value={formData.nama_kpl_pswt}
                onChange={handleInputChange}
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
              />
              <FormLabel sx={{ color: 'black', mb: 2 }}>Jenis Kegiatan</FormLabel>
              <Select
                labelId="jenis-kegiatan"
                id="jenis-kegiatan"
                name="jenis_kegiatan"
                sx={{ mb: 3 }}
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
                <MenuItem value="lainnya">Lainnya</MenuItem>
              </Select>
              {lainnyaSelected && (
                <>
                  {/* Additional text field for "Detail Kegiatan (Lainnya)" */}
                  <FormLabel sx={{ color: 'black', mb: 2 }}>Detail Kegiatan (Lainnya)</FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    placeholder=""
                    sx={{ backgroundColor: '#fafafa', mb: 3 }}
                    name="lainnya_detail"
                    value={formData.lainnya_detail}
                    onChange={handleInputChange}
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
              />
              <h2>Muatan</h2>
              <RadioGroup
                row
                aria-label="muatan-options"
                name="muatan-options"
                value={selectedMuatanOption}
                onChange={handleChangeRadio} 
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
                    name="asal_imp"
                    value={formData.asal_imp}
                    onChange={handleInputChange}
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
                    name="tujuan_exp"
                    value={formData.tujuan_exp}
                    onChange={handleInputChange}
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
                    name="asal_antarpulau"
                    value={formData.asal_antarpulau}
                    onChange={handleInputChange}
                  />
                  <FormLabel sx={{ color: 'black', mb: 2 }}>Tujuan</FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    placeholder=""
                    sx={{ backgroundColor: '#fafafa', mb: 3 }}
                    name="tujuan_antarpulau"
                    value={formData.tujuan_antarpulau}
                    onChange={handleInputChange}
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
                    name="asal_antarkota"
                    value={formData.asal_antarkota}
                    onChange={handleInputChange}
                  />
                  <FormLabel sx={{ color: 'black', mb: 2 }}>Tujuan</FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    placeholder=""
                    sx={{ backgroundColor: '#fafafa', mb: 3 }}
                    name="tujuan_antarkota"
                    value={formData.tujuan_antarkota}
                    onChange={handleInputChange}
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
                  />
                </>
              )}

              <FormLabel sx={{ color: 'black', mb: 2 }}>Jumlah Muatan</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                name="jml_in_out"
                value={totalVolume} // Display the total volume
                readOnly // Make the field read-only
                sx={{ backgroundColor: '#fafafa', mb: 3 }}
              />
              <FormLabel sx={{ color: 'black', mb: 2 }}>Upload Surat Penunjukan Tally</FormLabel>
              <TextField
                type="file"
                variant="outlined"
                name="surat"
                multiple
                onChange={handleFileChange}
                sx={{ backgroundColor: '#fafafa', mb: 3 }}
              />
              <Button variant="contained" type="submit" sx={{ mt: 2 }} color="success">
                Submit
              </Button>
            </FormControl>
            <ToastContainer />
          </form>
          <ToastContainer />
        </Card>
      </Container>
    </>
  );
}
