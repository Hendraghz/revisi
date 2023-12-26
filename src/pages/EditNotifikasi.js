import { Helmet } from 'react-helmet-async';
import * as React from 'react';
// @mui
import { Button, Container, Stack, Typography, Card, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
// components
import TextField from '@mui/material/TextField';

export default function EditPerusahaanPage() {

    const [tujuan, setTujuan] = React.useState('');

    const handleChange = (event) => {
        setTujuan(event.target.value);
    };


    return (
        <>
            <Helmet>
                <title> Notifikasi | Sistem Pelayaran </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Edit Notifikasi
                    </Typography>
                </Stack>

                <Card>
                    <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 530 }}>
                        <FormLabel sx={{ color: "black" }}>Id Notifikasi</FormLabel>
                        <TextField type="text" variant='outlined' defaultValue="IF-100" disabled sx={{ backgroundColor: "#f5f6fa" }} />
                        <FormLabel sx={{ color: "black" }}>Isi Notifikasi</FormLabel>
                        <TextField type="text" variant='outlined' defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s " multiline rows={4} sx={{ backgroundColor: "#fafafa" }} />
                        <FormLabel sx={{ color: "black" }}>Tujuan</FormLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={tujuan}
                            onChange={handleChange}
                            autoWidth
                        >
                            <MenuItem value="">
                                <em>Tidak ada</em>
                            </MenuItem>
                            <MenuItem value={"pt insa"}>PT Insa Cell Indonesia</MenuItem>
                            <MenuItem value={"pt next innovation"}>PT Next Innovation</MenuItem>
                            <MenuItem value={"cv mekar jaya"}>CV Mekar Jaya</MenuItem>
                            <MenuItem value={"pt pejuang nusantara"}>PT Pejuang Nusantara</MenuItem>
                            
                        </Select>
                        <Button variant="contained" sx={{ mt: 2 }} >Submit</Button>
                    </FormControl>

                </Card>

            </Container>
        </>
    );
}
