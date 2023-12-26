/* eslint-disable object-shorthand */
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { useAuth } from '../../../config/AuthContext';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { login, token } = useAuth();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      // Attempt to login with admin credentials
      const adminResponse = await axios.post(
        'http://localhost:3001/admin/login',
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      const adminJwtToken = adminResponse.data.accessToken;
      login(adminJwtToken);
      navigate('/dashboard');
    } catch (adminError) {
      try {
        // If admin login fails, attempt to login as a regular user
        const userResponse = await axios.post(
          'http://localhost:3001/login',
          {
            email: email,
            password: password,
          },
          {
            withCredentials: true,
          }
        );
        const userJwtToken = userResponse.data.accessToken;
        login(userJwtToken);
        navigate('/dashboard-user');
      } catch (userError) {
        // Handle errors for both admin and user logins
        if (userError.response) {
          setMsg(userError.response.data.message);
        }
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {msg && <p className="alert alert-danger">{msg}</p>}
      <form onSubmit={Auth}>
        <Stack spacing={3}>
          <TextField name="email" label="Alamat email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <RouterLink to="/regis">
            <Link variant="subtitle2" underline="hover">
              Registrasi Akun Perusahaan?
            </Link>
          </RouterLink>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Login
        </LoadingButton>
      </form>
    </>
  );
}
