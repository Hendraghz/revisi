import * as React from "react";
import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Stack, Typography, Card, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
// components
import TextField from '@mui/material/TextField';

export default function TambahAdminPage() {
    const [kegiatan, setKegiatan] = React.useState('');

    const handleChange = (event) => {
        setKegiatan(event.target.value);
    };

    const [lokasi, setLokasi] = React.useState('');

    const handleLokasi = (event) => {
        setLokasi(event.target.value);
    };

    return (
        <>
            <Helmet>
                <title> Laporan | Sistem Pelayaran </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Tambah Laporan Kegiatan Angkutan Perairan Pelabuhan
                    </Typography>
                </Stack>

                <Card>
                    <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 530 }}>
                        <FormLabel sx={{ color: 'black' }}>Tanggal</FormLabel>
                        <TextField type="date" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Nama Perusahaan Penunjuk</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Nama Kapal</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Type Kapal</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Bendera</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Kegiatan</FormLabel>
                        <Select
                            labelId="select-kegiatan"
                            id="select-kegiatan"
                            value={kegiatan}
                            label="Kegiatan"
                            onChange={handleChange}
                        >
                            <MenuItem value={"stevedoring"}>Stevedoring</MenuItem>
                            <MenuItem value={"cargodoring"}>Cargodoring</MenuItem>
                            <MenuItem value={"receiving"}>Receiving</MenuItem>
                            <MenuItem value={"delivery"}>Delivery</MenuItem>
                            <MenuItem value={"stuffing"}>Stuffing</MenuItem>
                            <MenuItem value={"stripping"}>Stripping</MenuItem>
                        </Select>
                        <h2>Kegiatan Tally Mandiri</h2>
                        <h3>Jumlah</h3>
                        <FormLabel sx={{ color: 'black' }}>Bongkar</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Muat</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <h3>Mulai (jam)</h3>
                        <FormLabel sx={{ color: 'black' }}>Bongkar</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Muat</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <h3>Selesai (jam)</h3>
                        <FormLabel sx={{ color: 'black' }}>Bongkar</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Muat</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Lokasi Kegiatan</FormLabel>
                        <Select
                            labelId="select-lokasi"
                            id="select-lokasi"
                            value={lokasi}
                            label="Lokasi"
                            onChange={handleLokasi}
                        >
                            <MenuItem value={"pelabuhan"}>Pelabuhan</MenuItem>
                            <MenuItem value={"cargodoring"}>Terminal</MenuItem>
                            <MenuItem value={"receiving"}>Depo Petikemas</MenuItem>
                            <MenuItem value={"delivery"}>Gudang</MenuItem>
                        </Select>
                        <FormLabel sx={{ color: 'black' }}>Muatan</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Upload Surat Penunjukan</FormLabel>
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
