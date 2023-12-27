import * as React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Container, Table, Row } from 'react-bootstrap';
import { Stack, Typography, Button, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import Iconify from '../../components/iconify';
import useToken from '../../config/useRequireAuth';

export default function LaporanPagePenyewaan() {
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
  }, []);

  const getPpal = async () => {
    const response = await axios.get('http://localhost:3001/ppal/show', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPpal(response.data.data);
  };

  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to your API endpoint using fetch
      const response = await fetch(`http://localhost:3001/ppal/${id}`, {
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
          <Link to="/dashboard-user/tambah-laporan-penyewaan-user">
            <Button variant="contained" color="success" startIcon={<Iconify icon="eva:plus-fill" />}>
              Tambah Laporan
            </Button>
          </Link>
        </Stack>

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
              <MenuItem value="Januari">Januari</MenuItem>
              <MenuItem value="Februari">Februari</MenuItem>
              <MenuItem value="Maret">Maret</MenuItem>
              <MenuItem value="April">April</MenuItem>
              <MenuItem value="Mei">Mei</MenuItem>
              <MenuItem value="Juni">Juni</MenuItem>
              <MenuItem value="Juli">Juli</MenuItem>
              <MenuItem value="Agustus">Agustus</MenuItem>
              <MenuItem value="September">September</MenuItem>
              <MenuItem value="Oktober">Oktober</MenuItem>
              <MenuItem value="November">November</MenuItem>
              <MenuItem value="November">November</MenuItem>
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
                      <td>{row.surat}</td>
                      <td>
                        <Link to={`/dashboard-user/edit-laporan-penyewaan-user/${row.id}`}>
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
              <Button
                variant="contained"
                className="btnDownload" color='success'
                startIcon={<Iconify icon="file-icons:microsoft-excel" />}
              >
                Download Excel
              </Button>
            </div> */}
          </div>
        </Container>
      </Container>
    </>
  );
}
