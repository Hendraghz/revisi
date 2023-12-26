import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Container, Table, Row } from 'react-bootstrap';
import { Stack, Typography, Button } from '@mui/material';
import Iconify from '../components/iconify';
import useToken from '../config/useRequireAuth';

export default function LaporanPage() {
  const [ppal, setPpal] = useState([]);
  const { token, checkAndLogin } = useToken();
  useEffect(() => {
    checkAndLogin();
    getPpal();
  }, []);

  const getPpal = async () => {
    const response = await axios.get('http://localhost:3001/ppal', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPpal(response.data.data);
  };

  const handleExport = async () => {
    try {
      // Send a DELETE request to your API endpoint using fetch
      const response = await axios.get('http://localhost:3001/downloadppal', {
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
          {/* <Link to="/dashboard/tambah-laporan-penyewaan">
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
