import { Helmet } from 'react-helmet-async';
import * as React from 'react';
// @mui
import { Button, Container, Stack, Typography, Card, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
// components
import TextField from '@mui/material/TextField';

export default function EditLaporanPage() {

    const [jenis, setJenis] = React.useState('');

    const handleChange = (event) => {
        setJenis(event.target.value);
    };

    return (
        <>
            <Helmet>
                <title> Laporan | Sistem Pelayaran </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Edit Laporan
                    </Typography>
                </Stack>

                <Card>
                    <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 530 }}>
                        <FormLabel sx={{ color: "black" }}>Tanggal</FormLabel>
                        <TextField size="small" type="text" variant='outlined' placeholder="12/10/2022" sx={{ backgroundColor: "#fafafa" }} />
                        <FormLabel sx={{ color: "black" }}>Nama Pemilik Barang</FormLabel>
                        <TextField size="small" type="text" variant='outlined' placeholder="Abdul Somad" sx={{ backgroundColor: "#fafafa" }} />
                        <FormLabel sx={{ color: "black" }}>Nama Barang</FormLabel>
                        <TextField size="small" type="password" variant='outlined' placeholder="Laptop" sx={{ backgroundColor: "#fafafa" }} />
                        <h4>Moda Transportasi</h4>
                        <FormLabel sx={{ color: "black" }}>Nama Kapal</FormLabel>
                        <TextField size="small" type="text" variant='outlined' placeholder="Everforest" sx={{ backgroundColor: "#fafafa" }} />
                        <FormLabel sx={{ color: "black" }}>Nomor Kendaraan</FormLabel>
                        <TextField size="small" type="text" variant='outlined' placeholder="IP2020202" sx={{ backgroundColor: "#fafafa" }} />
                        <FormLabel sx={{ color: "black" }}>Muatan</FormLabel>
                        <TextField size="small" type="password" variant='outlined' placeholder="Laptop" sx={{ backgroundColor: "#fafafa" }} />
                        <FormLabel sx={{ color: "black" }}>Jenis Kegiatan</FormLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={jenis}
                            onChange={handleChange}
                            autoWidth
                            size='small'
                        >
                            <MenuItem value="">
                                <em>Tidak ada</em>
                            </MenuItem>
                            <MenuItem value={"import"}>Import</MenuItem>
                            <MenuItem value={"export"}>Export</MenuItem>
                        </Select>
                        <h4>Inklaring</h4>
                        <h5>Import</h5>
                        <FormLabel sx={{ color: "black" }}>Nomor PIB</FormLabel>
                        <TextField size="small" type="text" variant='outlined' placeholder="000000001" sx={{ backgroundColor: "#fafafa" }} />
                        <FormLabel sx={{ color: "black" }}>Volume</FormLabel>
                        <TextField size="small" type="text" variant='outlined' placeholder="1.233" sx={{ backgroundColor: "#fafafa" }} />
                        <h5>Antar Pulau</h5>
                        <FormLabel sx={{ color: "black" }}>Nomor PBB</FormLabel>
                        <TextField size="small" type="text" variant='outlined' placeholder="200202000" sx={{ backgroundColor: "#fafafa" }} />
                        <FormLabel sx={{ color: "black" }}>Volume</FormLabel>
                        <TextField size="small" type="text" variant='outlined' placeholder="186.50" sx={{ backgroundColor: "#fafafa" }} />
                        <h4>Outklaring</h4>
                        <h5>Export</h5>
                        <FormLabel sx={{ color: "black" }}>Nomor PEB</FormLabel>
                        <TextField size="small" type="text" variant='outlined' placeholder="000000000" sx={{ backgroundColor: "#fafafa" }} />
                        <FormLabel sx={{ color: "black" }}>Volume</FormLabel>
                        <TextField size="small" type="text" variant='outlined' placeholder="222.4" sx={{ backgroundColor: "#fafafa" }} />
                        <h5>Antar Pulau</h5>
                        <FormLabel sx={{ color: "black" }}>Nomor PMB</FormLabel>
                        <TextField size="small" type="text" variant='outlined' placeholder="222222222" sx={{ backgroundColor: "#fafafa" }} />
                        <FormLabel sx={{ color: "black" }}>Volume</FormLabel>
                        <TextField size="small" type="text" variant='outlined' placeholder="3666.1" sx={{ backgroundColor: "#fafafa" }} />
                        <FormLabel sx={{ color: "black" }}>Jumlah Inklaring/Outklaring</FormLabel>
                        <TextField size="small" type="text" variant='outlined' placeholder="4446.1" sx={{ backgroundColor: "#fafafa" }} />
                        <FormLabel sx={{ color: "black" }}>Upload File</FormLabel>
                        <TextField size="small" type="file" variant='outlined' placeholder="4446.1" sx={{ backgroundColor: "#fafafa" }} />

                        <Button variant="contained" sx={{ mt: 2 }}>Submit</Button>
                    </FormControl>

                </Card>

            </Container>
        </>
    );
}
