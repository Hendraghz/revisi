import * as React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Row, Container, Table } from 'react-bootstrap';
import { Stack, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Iconify from '../../components/iconify';
import useToken from '../../config/useRequireAuth';

export default function LaporanPagePengurusan() {
  const [transportasi, setTransportasi] = useState([]);
  const { token, checkAndLogin } = useToken();
  const [age, setAge] = useState('');

  useEffect(() => {
    checkAndLogin();
    getTransportasi();
  }, []);

  const getTransportasi = async () => {
    const response = await axios.get('http://localhost:3001/transportasi/show', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTransportasi(response.data.data);
  };
  
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to your API endpoint using fetch
      const response = await fetch(`http://localhost:3001/transportasi/${id}`, {
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
          <Link to="/dashboard-user/tambah-laporan-pengurusan-user">
            <Button variant="contained" color="success" startIcon={<Iconify icon="eva:plus-fill" />}>
              Tambah Laporan
            </Button>
          </Link>
        </Stack>

        <Container fluid>
        <FormControl sx={{ minWidth: 220, mb:2}}>
        <InputLabel id="demo-simple-select-helper-label">Filter Bulan</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Filter Bulan"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Pilih Bulan</em>
          </MenuItem>
          <MenuItem value={10}>January</MenuItem>
          <MenuItem value={20}>Februari</MenuItem>
          <MenuItem value={30}>Maret</MenuItem>
        </Select>
      </FormControl>
          <div className="custom-lebar">
            <Row className="tab">
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
                    <td colSpan={4}>Inklaring</td>
                    <td colSpan={4}>Outklaring</td>
                    <td rowSpan={3}>Jumlah Inklaring/Outklaring (KG/TON)</td>
                    <td rowSpan={3}>Upload Surat Penunjukan (Shipper, Pemilik Barang/Tally Mandiri)</td>
                    <td rowSpan={3}>Action</td>
                  </tr>
                  <tr>
                    <td className="custom-width" colSpan={2}>
                      import
                    </td>
                    <td className="custom-width" colSpan={2}>
                      Antar Pulau
                    </td>
                    <td className="custom-width" colSpan={2}>
                      Import
                    </td>
                    <td className="custom-width" colSpan={2}>
                      Antar Pulau
                    </td>
                  </tr>
                  <tr>
                    <td className="custom">Nama Kapal/Pesawat</td>
                    <td className="custom">No Kendaraan</td>
                    <td>Nomor PIB</td>
                    <td>VOLUME (KG/TON)</td>
                    <td>Nomor PBB</td>
                    <td>VOLUME (KG/TON)</td>
                    <td>Nomor PEB</td>
                    <td>VOLUME (KG/TON)</td>
                    <td>Nomor PMB</td>
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
                      <td>{row.in_imp_pib}</td>
                      <td>{row.in_imp_volume}</td>
                      <td>{row.in_ap_pib}</td>
                      <td>{row.in_ap_volume}</td>
                      <td>{row.out_imp_pib}</td>
                      <td>{row.out_imp_volume}</td>
                      <td>{row.out_ap_pib}</td>
                      <td>{row.out_ap_volume}</td>
                      <td>{row.jml_in_out}</td>
                      <td>{row.surat}</td>
                      <td>
                        <Link to={`/dashboard-user/edit-laporan-pengurusan-user/${row.id}`}>
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
