import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Stack, Typography, Button, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import { Container, Table, Row } from 'react-bootstrap';
import Iconify from '../components/iconify';
import useToken from '../config/useRequireAuth';
import baseURL from '../config/url';

export default function LaporanPage() {
  const [ppal, setPpal] = useState([]);
  const { token, checkAndLogin } = useToken();
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const yearsArray = Array.from({ length: 22 }, (_, index) => 2013 + index);

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  useEffect(() => {
    checkAndLogin();
    getPpal();
    if (selectedMonth !== '' && selectedYear !== '') {
      getPpal();
    }
  }, [selectedMonth, selectedYear]);

  const getPpal = async () => {
    const response = await axios.get(`${baseURL}/ppal?month=${selectedMonth}&year=${selectedYear}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPpal(response.data.data);
  };

  const handleExport = async () => {
    try {
      // Send a DELETE request to your API endpoint using fetch
      const response = await axios.get(`${baseURL}/downloadppal`, {
        responseType: 'arraybuffer',
      });

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'PenyewaanPeralatanAngkatanLaut.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Handle successful response
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Data Exported Successfully',
        confirmButtonText: 'OK',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to your API endpoint using fetch
      const response = await fetch(`${baseURL}/ppal/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // Handle error response
        console.error('Error deleting data:', response.statusText);
        return;
      }

      // Handle successful response
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Data deleted Successfully',
        confirmButtonText: 'OK',
        showConfirmButton: false,
        timer: 1500,
      });
      getPpal();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleValid = async (id) => {
    try {
      // Send a DELETE request to your API endpoint using fetch
      const response = await fetch(`${baseURL}/ppal/${id}/valid`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // Handle error response
        console.error('Error Validasi data:', response.statusText);
        return;
      }

      // Handle successful response
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Data validated Successfully',
        confirmButtonText: 'OK',
        showConfirmButton: false,
        timer: 1500,
      });
      getPpal();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  return (
    <>
      <Helmet>
        <title>Laporan | Sistem Pelayaran</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h6" gutterBottom>
            Laporan Penyewaan Peralatan Angkutan Laut atau Peralatan Jasa Terkait Dengan Angkutan Laut
          </Typography>
          {/* <Link to="/dashboard/tambah-laporan-penyewaan">
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Tambah Laporan
            </Button>
          </Link> */}
        </Stack>
        <Typography sx={{ mb: 2, mt: 3, color: 'red' }}>*Untuk Filter data silahkan pilih Bulan dan Tahun</Typography>
        <Container fluid>
          <FormControl sx={{ mb: 2, minWidth: 180 }} size="small">
            <InputLabel id="demo-select-small-label">Filter Bulan</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectedMonth}
              label="Filter Bulan"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="01">Januari</MenuItem>
              <MenuItem value="02">Februari</MenuItem>
              <MenuItem value="03">Maret</MenuItem>
              <MenuItem value="04">April</MenuItem>
              <MenuItem value="05">Mei</MenuItem>
              <MenuItem value="06">Juni</MenuItem>
              <MenuItem value="07">Juli</MenuItem>
              <MenuItem value="08">Agustus</MenuItem>
              <MenuItem value="09">September</MenuItem>
              <MenuItem value="10">Oktober</MenuItem>
              <MenuItem value="11">November</MenuItem>
              <MenuItem value="12">Desember</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ mb: 2, ml: 2, minWidth: 180 }} size="small">
            <InputLabel id="filter-year-label">Filter Tahun</InputLabel>
            <Select
              labelId="filter-year-label"
              id="filter-year"
              value={selectedYear}
              label="Filter Tahun"
              onChange={handleYearChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {yearsArray.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="custom-lebar">
            <Row className="px-4 tab">
              <Table className="tables" Striped bordered hover>
                <thead>
                  <tr>
                    <td rowSpan={3}>No</td>
                    <td rowSpan={3}>Tanggal</td>
                    <td rowSpan={3} className="custom-width">
                      Nama Perusahaan/Perorangan
                    </td>
                    <td rowSpan={3}>Penyewaan Peralatan</td>
                    <td rowSpan={3}>Kegiatan</td>
                    <td rowSpan={1} colSpan={2}>
                      Peralatan Angkutan Laut
                    </td>
                    <td rowSpan={1} colSpan={2}>
                      Peralatan Jasa Terkait
                    </td>
                    <td rowSpan={3}>Masa Sewa (Hari)</td>
                    <td rowSpan={1} colSpan={2}>
                      Jangka Waktu (Tgl /Bulan /Tahun)
                    </td>
                    <td rowSpan={3}>Upload Surat Penunjukan</td>
                    <td rowSpan={3}>Action</td>
                  </tr>
                  <tr>
                    <td>Nama Peralatan</td>
                    <td>Jumlah Peralatan</td>
                    <td>Nama Peralatan</td>
                    <td>Jumlah Peralatan</td>
                    <td className="custom-width">Mulai</td>
                    <td className="custom-width">Selesai</td>
                  </tr>
                  <tr />
                  <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                    <td>11</td>
                    <td>12</td>
                    <td>13</td>
                    <td>14</td>
                  </tr>
                </thead>
                <tbody>
                  {ppal.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.tanggal}</td>
                      <td>{row.nama_perusahaan}</td>
                      <td>{row.penyewaan_peralatan}</td>
                      <td>{row.kegiatan}</td>
                      <td>{row.nama_peralatanAL}</td>
                      <td>{row.jumlah_satuanAL}</td>
                      <td>{row.nama_peralatanJT}</td>
                      <td>{row.jumlah_satuanJT}</td>
                      <td>{row.masa_sewa}</td>
                      <td>{row.jw_mulai}</td>
                      <td>{row.jw_selesai}</td>
                      <td>
                        <Link to={`${baseURL}/dokumen/${row.surat}`} target="_blank" rel="noopener noreferrer">
                          {row.surat}
                        </Link>
                      </td>
                      <td>
                        {row.status !== 'validated' && (
                          <>
                            <Button onClick={() => handleValid(row.id)} variant="outlined" sx={{ mr: 1 }}>
                              Validasi
                            </Button>
                            <Button onClick={() => handleDelete(row.id)} variant="outlined" color="error">
                              Hapus
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>

            <div className="print-button">
              <Button
                variant="contained"
                className="btnDownload"
                onClick={handleExport}
                startIcon={<Iconify icon="file-icons:microsoft-excel" />}
              >
                Download Excel
              </Button>
            </div>
          </div>
        </Container>
      </Container>
    </>
  );
}
