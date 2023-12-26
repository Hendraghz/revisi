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
                        <FormLabel sx={{ color: 'black' }}>Nama Perusahaan</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Nama Kapal</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Type Kapal</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Kegiatan</FormLabel>
                        <Select
                            labelId="select-kegiatan"
                            id="select-kegiatan"
                            value={kegiatan}
                            label="Kegiatan"
                            onChange={handleChange}
                        >
                            <MenuItem value={"penumpang"}>Memindahkan Penumpang</MenuItem>
                            <MenuItem value={"barang"}>Memindahkan Barang</MenuItem>
                        </Select>
                        <h3>Jumlah Penumpang (orang)</h3>
                        <FormLabel sx={{ color: 'black' }}>Naik</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Turun</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <h3>Jumlah Barang (ton/M3)</h3>
                        <FormLabel sx={{ color: 'black' }}>Bongkar</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Muat</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Kapal Tujuan</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Pelabuhan</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <h3>Terminal</h3>
                        <FormLabel sx={{ color: 'black' }}>Asal</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Tujuan</FormLabel>
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
