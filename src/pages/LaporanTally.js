import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Container, Row, Table } from 'react-bootstrap';
import { Stack, Typography, Button } from '@mui/material';
import Iconify from '../components/iconify';
import useToken from '../config/useRequireAuth';

export default function LaporanPage() {
  const [tally, setTally] = useState([]);
  const { token, checkAndLogin } = useToken();
  useEffect(() => {
    checkAndLogin();
    getTally();
  }, []);

  const getTally = async () => {
    const response = await axios.get('http://localhost:3001/tally', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTally(response.data.data);
  };

  const handleExport = async () => {
    try {
      // Send a DELETE request to your API endpoint using fetch
      const response = await axios.get('http://localhost:3001/downloadtally', {
        responseType: 'arraybuffer',
      });

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'LaporanTally.xlsx';
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
          {/* <Link to="/dashboard/tambah-laporan-tally">
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                            Tambah Laporan
                        </Button>
                    </Link> */}
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
                    <td rowSpan={3}>Action</td>
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
                      <td>{row.upload_surat_penunjukan}</td>
                      <td>
                        <Button onClick={() => handleDelete(row.id)} variant="outlined" color="error">
                          Hapus
                        </Button>
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
