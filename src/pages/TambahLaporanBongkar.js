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

    const [jumlahBongkar, setjumlahBongkar] = React.useState('');

    const handleBongkar = (event) => {
        setjumlahBongkar(event.target.value);
    };

    const [jumlahMuat, setjumlahMuat] = React.useState('');

    const handleMuat = (event) => {
        setjumlahMuat(event.target.value);
    };


    return (
        <>
            <Helmet>
                <title> Laporan | Sistem Pelayaran </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Tambah Laporan Kegiatan Perusahaan Bongkar Muat
                    </Typography>
                </Stack>

                <Card>
                    <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 530 }}>
                        <FormLabel sx={{ color: 'black' }}>Tanggal</FormLabel>
                        <TextField type="date" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
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
                            <MenuItem value={"receiving/delivery"}>Receiving/Delivery</MenuItem>
                        </Select>
                        <FormLabel sx={{ color: 'black' }}>Nomor RKBM</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Nama Kapal</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Bendera</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Ukuran DWT/GT/HP</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Nama Perusahaan Angkutan Laut/Agen</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <h3>Jenis Muatan</h3>
                        <FormLabel sx={{ color: 'black' }}>Jumlah Bongkar</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Jumlah Muat</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <h2>Kegiatan Bongkar Muat</h2>
                        <h3>Jumlah</h3>
                        <FormLabel sx={{ color: 'black' }}>Jumlah Bongkar</FormLabel>
                        <Select
                            labelId="select-jumlah-bongkar"
                            id="select-jumlah-bongkar"
                            value={jumlahBongkar}
                            label="jumlah-bongkar"
                            onChange={handleBongkar}
                        >
                            <MenuItem value={"curah cair"}>Curah Cair</MenuItem>
                            <MenuItem value={"curah kering"}>Curah Kering</MenuItem>
                            <MenuItem value={"general cargo"}>General Cargo</MenuItem>
                            <MenuItem value={"life stock"}>Life Stock</MenuItem>
                        </Select>
                        <FormLabel sx={{ color: 'black' }}>Jumlah Muat</FormLabel>
                        <Select
                            labelId="select-jumlah-muat"
                            id="select-jumlah-muat"
                            value={jumlahMuat}
                            label="jumlah-muat"
                            onChange={handleMuat}
                        >
                            <MenuItem value={"curah cair"}>Curah Cair</MenuItem>
                            <MenuItem value={"curah kering"}>Curah Kering</MenuItem>
                            <MenuItem value={"general cargo"}>General Cargo</MenuItem>
                            <MenuItem value={"life stock"}>Life Stock</MenuItem>
                        </Select>
                        <h3>Mulai (jam)</h3>
                        <FormLabel sx={{ color: 'black' }}>Jumlah Bongkar</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Jumlah Muat</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <h3>Selesai (jam)</h3>
                        <FormLabel sx={{ color: 'black' }}>Jumlah Bongkar</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Jumlah Muat</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa', mb: 7 }} />
                        <FormLabel sx={{ color: 'black' }}>Jumlah Buruh</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Pelabuhan Muat</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Tujuan</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Penunjukan PBM</FormLabel>
                        <TextField type="text" variant="outlined" placeholder="" sx={{ backgroundColor: '#fafafa' }} />
                        <FormLabel sx={{ color: 'black' }}>Upload Surat Penunjukan</FormLabel>
                        <TextField type="file" variant="outlined" sx={{ backgroundColor: '#fafafa' }} />
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
