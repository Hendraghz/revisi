import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Row, Container, Table } from 'react-bootstrap';
import { Stack, Typography, Button, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import Iconify from '../components/iconify';
import useToken from '../config/useRequireAuth';
import baseURL from '../config/url';

export default function LaporanPage() {
  const [transportasi, setTransportasi] = useState([]);
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
    getTransportasi();
    if (selectedMonth !== '' && selectedYear !== '') {
      getTransportasi();
    }
  }, [selectedMonth, selectedYear]);

  const getTransportasi = async () => {
    const response = await axios.get(`${baseURL}/transportasi?month=${selectedMonth}&year=${selectedYear}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTransportasi(response.data.data);
  };

  const handleExport = async () => {
    try {
      // Send a DELETE request to your API endpoint using fetch
      const response = await axios.get(`${baseURL}/downloadtrans`, {
        responseType: 'arraybuffer',
      });

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'LaporanTransportasi.xlsx';
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
      const response = await fetch(`${baseURL}/transportasi/${id}`, {
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
      getTransportasi();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleValid = async (id) => {
    try {
      // Send a DELETE request to your API endpoint using fetch
      const response = await fetch(`${baseURL}/transportasi/${id}/valid`, {
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
      getTransportasi();
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
          <Typography variant="h4" gutterBottom>
            Laporan Kegiatan Perusahaan Jasa Pengurusan Transportasi
          </Typography>
          {/* <Link to="/dashboard/tambah-laporan-pengurusan">
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
              <Table className="tables">
                <thead>
                  <tr>
                    <td rowSpan={3}>No</td>
                    <td rowSpan={3}>Tanggal</td>
                    <td rowSpan={3}>Nama Pemilik Barang</td>
                    <td rowSpan={3}>Nama Barang</td>
                    <td rowSpan={3}>Jenis Moda Transportasi SI</td>
                    <td colSpan={2} rowSpan={2}>
                      Moda Transportasi
                    </td>
                    <td rowSpan={3}>Jenis Kegiatan</td>
                    <td rowSpan={3}>Muatan</td>
                    <td colSpan={10}>Muatan</td>
                    <td rowSpan={3}>Jumlah Muatan (KG/TON)</td>
                    <td rowSpan={3}>Upload Surat Penunjukan (Shipper, Pemilik Barang/Tally Mandiri)</td>
                    <td rowSpan={3}>Action</td>
                  </tr>
                  <tr>
                    <td className="custom-width" colSpan={2}>
                      import
                    </td>
                    <td className="custom-width" colSpan={2}>
                      Export
                    </td>
                    <td className="custom-width" colSpan={3}>
                      Antar Pulau
                    </td>
                    <td className="custom-width" colSpan={3}>
                      Antar Kota
                    </td>
                  </tr>
                  <tr>
                    <td className="custom">Nama Kapal/Pesawat</td>
                    <td className="custom">No Kendaraan</td>
                    <td>Asal Import</td>
                    <td>VOLUME (KG/TON)</td>
                    <td>Tujuan Export</td>
                    <td>VOLUME (KG/TON)</td>
                    <td>Asal</td>
                    <td>Tujuan</td>
                    <td>VOLUME (KG/TON)</td>
                    <td>Asal</td>
                    <td>Tujuan</td>
                    <td>VOLUME (KG/TON)</td>
                  </tr>
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
                    <td>15</td>
                    <td>16</td>
                    <td>17</td>
                    <td>18</td>
                    <td>19</td>
                    <td>20</td>
                    <td>21</td>
                    <td>22</td>
                  </tr>
                </thead>
                <tbody>
                  {transportasi.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.tanggal}</td>
                      <td>{row.nama_pemilik_brg}</td>
                      <td>{row.nama_brg}</td>
                      <td>{row.jenis_moda_trns}</td>
                      <td>{row.nama_kpl_pswt}</td>
                      <td>{row.no_kendaraan}</td>
                      <td>{row.jenis_kegiatan}</td>
                      <td>{row.muatan}</td>
                      <td>{row.imp_asal}</td>
                      <td>{row.imp_voulme}</td>
                      <td>{row.exp_tujuan}</td>
                      <td>{row.exp_voulme}</td>
                      <td>{row.ap_asal}</td>
                      <td>{row.ap_tujuan}</td>
                      <td>{row.ap_voulme}</td>
                      <td>{row.ak_asal}</td>
                      <td>{row.ak_tujuan}</td>
                      <td>{row.ak_voulme}</td>
                      <td>{row.jml_muatan}</td>
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
