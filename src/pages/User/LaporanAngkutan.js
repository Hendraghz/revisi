import * as React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Container, Row, Table } from 'react-bootstrap';
import { Stack, Typography, Button } from '@mui/material';
import useToken from '../../config/useRequireAuth';
import Iconify from '../../components/iconify';

export default function LaporanPageAngkutan() {
  const [pelabuhan, setPelabuhan] = useState([]);
  const { token, checkAndLogin } = useToken();
  useEffect(() => {
    checkAndLogin();
    getPelabuhan();
  }, []);

  const getPelabuhan = async () => {
    const response = await axios.get('http://localhost:3001/pelabuhan/show', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPelabuhan(response.data.data);
  };
  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to your API endpoint using fetch
      const response = await fetch(`http://localhost:3001/pelabuhan/${id}`, {
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
      getPelabuhan();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  const handleExport = async () => {
    try {
      // Send a DELETE request to your API endpoint using fetch
      const response = await axios.get('http://localhost:3001/downloadpelabuhan', {
        responseType: 'arraybuffer',
      });

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'pelabuhan.xlsx';
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
  return (
    <>
      <Helmet>
        <title>Laporan | Sistem Pelayaran</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Laporan Kegiatan Angkutan Perairan Pelabuhan
          </Typography>
          <Link to="/dashboard-user/tambah-laporan-angkutan-user">
            <Button variant="contained" color="success" startIcon={<Iconify icon="eva:plus-fill" />}>
              Tambah Laporan
            </Button>
          </Link>
        </Stack>

        <Container fluid>
          <div className="custom-lebar">
            <Row className="px-4 tab">
              <Table className="tables">
                <thead>
                  <tr>
                    <td rowSpan={3}>No</td>
                    <td rowSpan={3}>Tanggal</td>
                    <td rowSpan={3}>Nama Perusahaan</td>
                    <td rowSpan={3}>Nama Kapal / MV</td>
                    <td rowSpan={3}>Type Kapal</td>
                    <td rowSpan={3}>Kegiatan</td>
                    <td rowSpan={2} colSpan={2} className="custom-width">
                      Jumlah Penumpang Orang
                    </td>
                    <td rowSpan={2} colSpan={2}>
                      Jumlah Barang TON/M3
                    </td>
                    <td rowSpan={3}>Kapal Tujuan</td>
                    <td rowSpan={3}>Pelabuhan</td>
                    <td colSpan={2} rowSpan={2}>
                      Terminal
                    </td>
                    <td rowSpan={3}>Upload Surat Penunjukan</td>
                    <td rowSpan={3}>Action</td>
                  </tr>
                  <tr />
                  <tr>
                    <td className="custom-width">Naik</td>
                    <td className="custom-width">Turun</td>
                    <td className="custom-width">Bongkar</td>
                    <td className="custom-width">Muat</td>
                    <td className="custom-width">Asal</td>
                    <td className="custom-width">Tujuan</td>
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
                  </tr>
                </thead>
                <tbody>
                  {pelabuhan.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.tanggal}</td>
                      <td>{row.nama_perusahaan}</td>
                      <td>{row.nama_kapal}</td>
                      <td>{row.tipe}</td>
                      <td>{row.kegiatan}</td>
                      <td>{row.jml_penumpang_naik}</td>
                      <td>{row.jml_penumpang_turun}</td>
                      <td>{row.jml_barang_bongkar}</td>
                      <td>{row.jml_barang_muat}</td>
                      <td>{row.kapal_tujuan}</td>
                      <td>{row.pelabuhan}</td>
                      <td>{row.terminal_asal}</td>
                      <td>{row.terminal_tujuan}</td>
                      <td>{row.surat}</td>
                      <td>
                        <Link to={`/dashboard-user/edit-laporan-angkutan-user/${row.id}`}>
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
                className="btnDownload"
                color="success"
                onClick={handleExport}
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
