import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import jwtDecoded from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Table } from 'react-bootstrap';
import { Stack, Typography, Button, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import Iconify from '../../components/iconify';
import useToken from '../../config/useRequireAuth';
import baseURL from '../../config/url';

export default function LaporanPageTally() {
  const [namaPerusahaan, setNamaPerusahaan] = useState('');
  const [tally, setTally] = useState([]);
  const [setNumber] = useState(0);
  const [expire, setExpire] = useState('');
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
    getTally();
    if (selectedMonth !== '' && selectedYear !== '') {
      getTally();
    }
  }, [selectedMonth, selectedYear]);

  const getTally = async () => {
    const response = await axios.get(`${baseURL}/tally/show?month=${selectedMonth}&year=${selectedYear}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTally(response.data.data);
  };

  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to your API endpoint using fetch
      const response = await fetch(`${baseURL}/tally/${id}`, {
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
      getTally();
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
            Laporan Kegiatan Tally Mandiri
          </Typography>
          <Link to="/dashboard-user/tambah-laporan-tally-user">
            <Button variant="contained" color="success" startIcon={<Iconify icon="eva:plus-fill" />}>
              Tambah Laporan
            </Button>
          </Link>
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
                    <td rowSpan={3}>Nama Perusahaan Penunjuk</td>
                    <td rowSpan={3}>Nama Kapal</td>
                    <td rowSpan={3}>Type Kapal</td>
                    <td rowSpan={3}>Bendera</td>
                    <td rowSpan={3}>Kegiatan</td>
                    <td colSpan={6}>Kegiatan Tally Mandiri</td>
                    <td rowSpan={3}>Lokasi Kegiatan</td>
                    <td rowSpan={3}>Muatan</td>
                    <td rowSpan={3}>Upload Surat Penunjukan</td>
                    <td rowSpan={3}>Aksi</td>
                  </tr>
                  <tr>
                    <td className="custom-width" colSpan={2}>
                      Jumlah
                    </td>
                    <td className="custom-width" colSpan={2}>
                      Mulai(Jam)
                    </td>
                    <td className="custom-width" colSpan={2}>
                      Selesai(Jam)
                    </td>
                  </tr>
                  <tr>
                    <td className="custom-width">Bongkar</td>
                    <td className="custom-width">Muat</td>
                    <td className="custom-width">Bongkar</td>
                    <td className="custom-width">Muat</td>
                    <td className="custom-width">Bongkar</td>
                    <td className="custom-width">Muat</td>
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
                  </tr>
                </thead>
                <tbody>
                  {tally.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.tanggal}</td>
                      <td>{row.nama_perusahaan_penunjuk}</td>
                      <td>{row.nama_kapal}</td>
                      <td>{row.type_kapal}</td>
                      <td>{row.bendera}</td>
                      <td>{row.kegiatan}</td>
                      <td>{row.jumlah_bongkar}</td>
                      <td>{row.jumlah_muat}</td>
                      <td>{row.jam_bongkar}</td>
                      <td>{row.jam_muat}</td>
                      <td>{row.selesai_bongkar}</td>
                      <td>{row.selesai_muat}</td>
                      <td>{row.lokasi_kegiatan}</td>
                      <td>{row.muatan}</td>
                      <td>
                        <a href="">{row.upload_surat_penunjukan}</a>
                      </td>
                      <td>
                        <Link to={`/dashboard-user/edit-laporan-tally-user/${row.id}`}>
                          <Button variant="outlined" sx={{ mr: 1 }}>
                            Ubah
                          </Button>
                        </Link>
                        <Button onClick={() => handleDelete(row.id)} variant="outlined" color="error">
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>

            {/* <div className="print-button">
                            <Button variant='contained' color='success' className="btnDownload" startIcon={<Iconify icon="file-icons:microsoft-excel" />}>
                                Download Excel
                            </Button>
                        </div> */}
          </div>
        </Container>
      </Container>
    </>
  );
}
