import * as React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Stack, Typography, Button, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { Row, Table, Container } from 'react-bootstrap';
import Iconify from '../../components/iconify';
import '../../css/tableBongkar.css';
import useToken from '../../config/useRequireAuth';

export default function LaporanPageBongkar() {
  const [bm, setBm] = useState([]);
  const { token, checkAndLogin } = useToken();
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const yearsArray = Array.from({ length: 22 }, (_, index) => 2013 + index);
  const isMonthRequired = selectedYear !== '';
  const isYearRequired = selectedMonth !== '';

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  useEffect(() => {
    checkAndLogin();
    getBm();
    if (selectedMonth !== '' && selectedYear !== '') {
      getBm();
    }
  }, [selectedMonth, selectedYear]);

  const getBm = async () => {
    const response = await axios.get(
      `http://localhost:3001/bongkarMuat/show?month=${selectedMonth}&year=${selectedYear}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setBm(response.data.data);
  };
  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to your API endpoint using fetch
      const response = await fetch(`http://localhost:3001/bongkarMuat/${id}`, {
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
      getBm();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getUTCFullYear();
    const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getUTCDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  return (
    <>
      <Helmet>
        <title>Laporan | Sistem Pelayaran</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Laporan Kegiatan Perusahaan Bongkar Muat
          </Typography>
          <Link to="/dashboard-user/tambah-laporan-bongkar-user">
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
              required={isYearRequired}
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
              required={isMonthRequired}
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
                    <td rowSpan={3}>Kegiatan</td>
                    <td rowSpan={3}>Nomor RKBM</td>
                    <td rowSpan={3}>Nama Kapal</td>
                    <td rowSpan={3}>Bendera</td>
                    <td rowSpan={3}>Ukuran DWT/GT/HP</td>
                    <td rowSpan={3}>Nama Perusahaan Angkutan Laut/Agen</td>
                    <td colSpan={2} rowSpan={2}>
                      Jenis Muatan
                    </td>
                    <td colSpan={7}>Kegiatan Bongkar Muat</td>
                    <td rowSpan={3}>Pelabuhan Muat</td>
                    <td rowSpan={3}>Tujuan</td>
                    <td rowSpan={3}>Penunjukan PBM</td>
                    <td rowSpan={3}>Upload Surat Penunjukan TALLY</td>
                    <td rowSpan={3}>Action</td>
                  </tr>
                  <tr>
                    <td className="custom" colSpan={2}>
                      Jumlah
                    </td>
                    <td className="custom" colSpan={2}>
                      Mulai Jam
                    </td>
                    <td className="custom-width" colSpan={2}>
                      Selesai Jam
                    </td>
                    <td className="custom-width" colSpan={1} rowSpan={2}>
                      Jumlah Buruh
                    </td>
                  </tr>
                  <tr>
                    <td className="custom">Bongkar</td>
                    <td className="custom">Muat</td>
                    <td>Bongkar</td>
                    <td>Muat </td>
                    <td>Bongkar</td>
                    <td>Muat</td>
                    <td>Bongkar</td>
                    <td>Muat</td>
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
                  {bm.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{formatDate(row.tanggal)}</td>
                      <td>{row.kegiatan}</td>
                      <td>{row.no_rkmb}</td>
                      <td>{row.nama_kapal}</td>
                      <td>{row.bendera}</td>
                      <td>{row.ukuran}</td>
                      <td>{row.nama_perusahaan_al}</td>
                      <td>{row.jenis_bongkar}</td>
                      <td>{row.jenis_muat}</td>
                      <td>{row.jml_bongkar}</td>
                      <td>{row.jml_muat}</td>
                      <td>{row.mulai_jam_bongkar}</td>
                      <td>{row.mulai_jam_muat}</td>
                      <td>{row.selesai_jam_bongkar}</td>
                      <td>{row.selesai_jam_muat}</td>
                      <td>{row.jml_buruh}</td>
                      <td>{row.pelabuhan_muat}</td>
                      <td>{row.tujuan}</td>
                      <td>{row.pdok_pbm}</td>
                      <td>{row.surat_penunjukan_tally}</td>
                      <td>
                        <Link to={`/dashboard-user/edit-laporan-bongkar-user/${row.id}`}>
                          <Button variant="outlined" color="primary">
                            Edit
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
                                className="btnDownload"
                                color='success'
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
