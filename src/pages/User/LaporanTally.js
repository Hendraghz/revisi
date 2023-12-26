import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import jwtDecoded from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Table } from 'react-bootstrap';
import { Stack, Typography, Button } from '@mui/material';
import Iconify from '../../components/iconify';
import useToken from '../../config/useRequireAuth';

export default function LaporanPageTally() {
  const [namaPerusahaan, setNamaPerusahaan] = useState('');
  const [tally, setTally] = useState([]);
  const [setNumber] = useState(0);
  const [expire, setExpire] = useState('');
  const { token, checkAndLogin } = useToken();

  useEffect(() => {
    checkAndLogin();
    getTally();
  }, []);

  const getTally = async () => {
    const response = await axios.get('http://localhost:3001/tally/show', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTally(response.data.data);
  };

  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to your API endpoint using fetch
      const response = await fetch(`http://localhost:3001/tally/${id}`, {
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

        <Container fluid>
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
