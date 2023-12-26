import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Stack, Typography, Card, FormControl, FormLabel } from '@mui/material';
// components
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useToken from '../config/useRequireAuth';

export default function EditAdminPage() {
  const { id } = useParams();
  const [admin, setAdmin] = useState({});
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const { token, checkAndLogin } = useToken();
  useEffect(() => {
    checkAndLogin();
    getAdmin();
  }, []);
  const getAdmin = async () => {
    const response = await axios.get(`http://localhost:3001/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAdmin(response.data.data);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/admin/${id}`,
        {
          nama_perusahaan: nama,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/dashboard/admin');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };
  return (
    <>
      <Helmet>
        <title> Admin | Sistem Pelayaran </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Edit Admin
          </Typography>
        </Stack>

        <Card>
          <form onSubmit={submitHandler}>
            <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 530 }}>
              <FormLabel sx={{ color: 'black' }}>Nama Admin</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder={admin.nama}
                sx={{ backgroundColor: '#fafafa' }}
                onChange={(e) => setNama(e.target.value)}
              />
              <FormLabel sx={{ color: 'black' }}>Email</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder={admin.email}
                sx={{ backgroundColor: '#fafafa' }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button variant="contained" sx={{ mt: 2 }} type="submit">
                Submit
              </Button>
            </FormControl>
          </form>
        </Card>
      </Container>
    </>
  );
}
