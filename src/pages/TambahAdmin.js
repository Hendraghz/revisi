import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Stack, Typography, Card, FormControl, FormLabel } from '@mui/material';
// components
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useToken from '../config/useRequireAuth';
import baseURL from '../config/url';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function TambahAdminPage() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const { token, checkAndLogin } = useToken();
  useEffect(() => {
    checkAndLogin();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseURL}/admin`,
        {
          nama,
          email,
          password,
          confPassword,
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
            Tambah Admin
          </Typography>
        </Stack>

        <Card>
          <form onSubmit={submitHandler}>
            <FormControl sx={{ ml: 5, mt: 3, mb: 3, width: 530 }}>
              <FormLabel sx={{ color: 'black' }}>Nama Admin</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder="Admin 2"
                sx={{ backgroundColor: '#fafafa' }}
                onChange={(e) => setNama(e.target.value)}
              />
              <FormLabel sx={{ color: 'black' }}>Email</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder="admin2@yahoo.com"
                sx={{ backgroundColor: '#fafafa' }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel sx={{ color: 'black' }}>Password</FormLabel>
              <TextField
                type="text"
                variant="outlined"
                placeholder="admin2@yahoo.com"
                sx={{ backgroundColor: '#fafafa' }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormLabel sx={{ color: 'black' }}>Confirm Password</FormLabel>
              <TextField
                type="password"
                variant="outlined"
                placeholder="********"
                sx={{ backgroundColor: '#fafafa' }}
                onChange={(e) => setConfPassword(e.target.value)}
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
