import * as React from "react";
import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Stack, Typography, Card, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
// components
import TextField from '@mui/material/TextField';

export default function TambahAdminPage() {

    const [transportasi, setTransportasi] = React.useState('');

    const handleTransportasi = (event) => {
        setTransportasi(event.target.value);
    };

    const [jenisKegiatan, setJenisKegiatan] = React.useState('');

    const handleJenisKegiatan = (event) => {
        setJenisKegiatan(event.target.value);
    };

    return (
        <>
            <Helmet>
                <title> Laporan | Sistem Pelayaran </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Tambah Laporan Kegiatan Perusahaan Jasa Pengurusan Transportasi
                    </Typography>
                </Stack>

                <Card>
                    <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 530 }}>
                        <FormLabel sx={{ color: 'black' }}>Tanggal</FormLabel>
                        <TextField type="date" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Nama Pemilik Barang</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Nama Barang</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Jenis Moda Transportasi</FormLabel>
                        <Select
                            labelId="select-moda-transportasi"
                            id="select-moda-transportasi"
                            value={transportasi}
                            label="moda-transportasi"
                            onChange={handleTransportasi}
                        >
                            <MenuItem value={"kapal"}>Kapal</MenuItem>
                            <MenuItem value={"pesawat"}>Pesawat</MenuItem>
                            <MenuItem value={"kereta"}>Kereta</MenuItem>
                            <MenuItem value={"truck"}>Truck</MenuItem>
                        </Select>
                        <FormLabel sx={{ color: 'black' }}>Nama Kapal/Pesawat</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Nomor Kendaraan</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Jenis Kegiatan</FormLabel>
                        <Select
                            labelId="jenis-kegiatan"
                            id="jenis-kegiatan"
                            value={jenisKegiatan}
                            label="Jenis Kegiatan"
                            onChange={handleJenisKegiatan}
                        >
                            <MenuItem value="penerimaan">Penerimaan</MenuItem>
                            <MenuItem value="pengelolaan-penyimpanan">Pengelolaan Penyimpanan</MenuItem>
                            <MenuItem value="sortasi">Sortasi</MenuItem>
                            <MenuItem value="pengepakan">Pengepakan</MenuItem>
                            <MenuItem value="penandaan">Penandaan</MenuItem>
                            <MenuItem value="pengukuran">Pengukuran</MenuItem>
                            <MenuItem value="penimbangan">Penimbangan</MenuItem>
                            <MenuItem value="pengelolaan-transportasi">Pengelolaan Transportasi</MenuItem>
                            <MenuItem value="penerbitan-dokumen">Penerbitan Dokumen Angkutan Barang melalui Moda Transportasi Darat, Laut, dan/atau Udara</MenuItem>
                            <MenuItem value="pengurusan-penyelesaian-dokumen">Pengurusan Penyelesaian Dokumen</MenuItem>
                            <MenuItem value="pemesanan-ruangan-pengangkut">Pemesanan Ruangan Pengangkut</MenuItem>
                            <MenuItem value="pengiriman">Pengiriman</MenuItem>
                            <MenuItem value="pengelolaan-pendistribusian">Pengelolaan Pendistribusian</MenuItem>
                            <MenuItem value="perhitungan-biaya">Perhitungan Biaya Angkutan dan Logistik</MenuItem>
                            <MenuItem value="klaim">Klaim</MenuItem>
                            <MenuItem value="asuransi">Asuransi atas Pengiriman Barang</MenuItem>
                            <MenuItem value="penyelesaian-tagihan">Penyelesaian Tagihan dan Biaya Lainnya yang Diperlukan</MenuItem>
                            <MenuItem value="penyediaan-sistem-informasi">Penyediaan Sistem Informasi dan Komunikasi</MenuItem>
                            <MenuItem value="layanan-logistik">Layanan Logistik Penyediaan Layanan Logistik di Pasar Nasional dan Internasional Secara Konvensional dan/atau Elektronik</MenuItem>
                        </Select>
                        <FormLabel sx={{ color: 'black' }}>Muatan</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <h1>Inklaring</h1>
                        <h2>Impor</h2>
                        <FormLabel sx={{ color: 'black' }}>Nomor PIB</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Volume (Kg/Ton)</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <h2>Antar Pulau</h2>
                        <FormLabel sx={{ color: 'black' }}>Nomor PBB</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Volume (Kg/Ton)</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <h1>Outklaring</h1>
                        <h2>Ekspor</h2>
                        <FormLabel sx={{ color: 'black' }}>Nomor PEB</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Volume (Kg/Ton)</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <h2>Antar Pulau</h2>
                        <FormLabel sx={{ color: 'black' }}>Nomor PMB</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Volume (Kg/Ton)</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa', mb: 7 }} />
                        <FormLabel sx={{ color: 'black' }}>Jumlah Inklaring + Outklaring</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Upload Surat Penunjukan Tally</FormLabel>
                        <TextField type="file" variant="outlined" sx={{ backgroundColor: '#fafafa' }} />
                        <Button variant="contained" sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </FormControl>

                </Card>

            </Container>
        </>
    );
}
