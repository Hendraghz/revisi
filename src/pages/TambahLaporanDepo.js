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

    const [ukuran, setUkuran] = React.useState('');

    const handleUkuran = (event) => {
        setUkuran(event.target.value);
    };

    const [status, setStatus] = React.useState('');

    const handleStatus = (event) => {
        setStatus(event.target.value);
    };

    return (
        <>
            <Helmet>
                <title> Laporan | Sistem Pelayaran </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Tambah Laporan Kegiatan Depo Petikemas
                    </Typography>
                </Stack>

                <Card>
                    <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 530 }}>
                        <FormLabel sx={{ color: 'black' }}>Tanggal</FormLabel>
                        <TextField type="date" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Nama Perusahaan (Pengguna Depo)</FormLabel>
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
                        <FormLabel sx={{ color: 'black' }}>Kegiatan Lain</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Lokasi Depo Petikemas</FormLabel>
                        <Select
                            labelId="select-lokasi"
                            id="select-lokasi"
                            value={lokasi}
                            label="Lokasi"
                            onChange={handleLokasi}
                        >
                            <MenuItem value={"diluar-pelabuhan"}>Diluar Pelabuhan</MenuItem>
                            <MenuItem value={"didalam-pelabuhan"}>Didalam Terminal</MenuItem>
                        </Select>
                        <FormLabel sx={{ color: 'black' }}>Nomor Petikemas</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Ukuran Petikemas</FormLabel>
                        <Select
                            labelId="select-ukuran"
                            id="select-ukuran"
                            value={ukuran}
                            label="Uokasi"
                            onChange={handleUkuran}
                        >
                            <MenuItem value={"20feet"}>20 Feet</MenuItem>
                            <MenuItem value={"40feet"}>40 Feet</MenuItem>
                            <MenuItem value={"40hc"}>40 HC</MenuItem>
                            <MenuItem value={"20feet"}>20 Refeer</MenuItem>
                            <MenuItem value={"iso tank"}>ISO TANK</MenuItem>
                            <MenuItem value={"ot"}>OT</MenuItem>
                            <MenuItem value={"ft"}>FT</MenuItem>
                        </Select>
                        <FormLabel sx={{ color: 'black' }}>Status Petikemas</FormLabel>
                        <Select
                            labelId="select-status"
                            id="select-status"
                            value={status}
                            label="Uokasi"
                            onChange={handleStatus}
                        >
                            <MenuItem value={"in"}>In</MenuItem>
                            <MenuItem value={"out"}>Out</MenuItem>
                        </Select>
                        <FormLabel sx={{ color: 'black' }}>Bendera</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <h3>Posisi Petikemas</h3>
                        <FormLabel sx={{ color: 'black' }}>Row</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Tier</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Kapasitas Depo (YOR)</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Kapasitas YOR yang digunakan</FormLabel>
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
