import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Stack, Typography, Button } from '@mui/material';
import Swal from 'sweetalert2';
import { Row, Table, Container } from 'react-bootstrap';
import Iconify from '../components/iconify';
import '../css/tableBongkar.css';
import useToken from '../config/useRequireAuth';

export default function LaporanPage() {
  const [bm, setBm] = useState([]);
  const { token, checkAndLogin } = useToken();
  useEffect(() => {
    checkAndLogin();
    getBm();
  }, []);

  const getBm = async () => {
    const response = await axios.get('http://localhost:3001/bongkarMuat', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setBm(response.data.data);
  };

  const handleExport = async () => {
    try {
      // Send a DELETE request to your API endpoint using fetch
      const response = await axios.get('http://localhost:3001/downloadbm', {
        responseType: 'arraybuffer',
      });

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'BongkarMuat.xlsx';
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
          {/* <Link to="/dashboard/tambah-laporan-bongkar">
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Tambah Laporan
            </Button>
          </Link> */}
        </Stack>

        <Container fluid>
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
                    <td rowSpan={3}>Upload Surat Penunjukan</td>
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
                    <td>23</td>
                  </tr>
                </thead>
                <tbody>
                  {bm.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.tanggal}</td>
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
                      <td>{row.surat_penunjukan}</td>
                      <td>{row.surat_penunjukan_tally}</td>
                      <td>
                        <Button onClick={() => handleDelete(row.id)} variant="outlined" color="error">
                          Hapus
                        </Button>
                        <Button onClick={() => handleDelete(row.id)} variant="outlined" color="primary">
                          Validasi
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
