import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// @mui
import { Stack, IconButton, InputAdornment, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from '../../../components/iconify';
import { useAuth } from '../../../config/AuthContext';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const [namaPerusahaan, setNamaPerusahaan] = useState('');
  const [lokasiPerusahaan, setLokasiPerusahaan] = useState('');
  const [alamatPerusahaan, setAlamatPerusahaan] = useState('');
  const [Kode, setKode] = useState('');
  const [Latitude, setlatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [modal, setModal] = useState('');
  const [jmlTKI, setJmlTki] = useState('');
  const [kbli, setKbli] = useState('');
  const [nib, setNib] = useState('');
  const [telp, setTelp] = useState('');

  const [jenis, setJenis] = useState('');
  const [provinsi, setProvinsi] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedKabkota, setSelectedKabkota] = useState('');
  const [kabkota, setKabkota] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState('');
  const [kelurahan, setKelurahan] = useState([]);
  const [selectedKelurahan, setSelectedKelurahan] = useState('');

  const [np, setNp] = useState('');

  const handleChange = (event) => {
    setJenis(event.target.value);
  };

  useEffect(() => {
    // Fetch provinsi saat komponen dimount
    fetch('https://kanglerian.github.io/api-wilayah-indonesia/api/provinces.json')
      .then((response) => response.json())
      .then((data) => setProvinsi(data));
  }, []);

  useEffect(() => {
    // Fetch kabupaten/kota berdasarkan provinsi yang dipilih
    if (selectedProvince !== '') {
      fetch(`https://kanglerian.github.io/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`)
        .then((response) => response.json())
        .then((data) => setKabkota(data));
    }
  }, [selectedProvince]);

  useEffect(() => {
    // Fetch kabupaten/kota berdasarkan provinsi yang dipilih
    if (selectedKabkota !== '') {
      fetch(`https://kanglerian.github.io/api-wilayah-indonesia/api/districts/${selectedKabkota}.json`)
        .then((response) => response.json())
        .then((data) => setKecamatan(data));
    }
  }, [selectedKabkota]);

  useEffect(() => {
    // Fetch kabupaten/kota berdasarkan provinsi yang dipilih
    if (selectedKecamatan !== '') {
      fetch(`https://kanglerian.github.io/api-wilayah-indonesia/api/villages/${selectedKecamatan}.json`)
        .then((response) => response.json())
        .then((data) => setKelurahan(data));
    }
  }, [selectedKecamatan]);

  // useEffect(() => {
  //   console.log(`Provinsi terpilih: ${selectedProvince}`);
  // }, [selectedProvince]);

  const handleProvinceChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedProvince(selectedValue);
  };

  const getProvinceNameById = (id) => {
    const selectedProvinceObj = provinsi.find((province) => province.id === id);
    return selectedProvinceObj ? selectedProvinceObj.name : '';
  };

  const handleRegencyChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedKabkota(selectedValue);
  };

  const getRegencyNameById = (id) => {
    const selectedRegencyObj = kabkota.find((regency) => regency.id === id);
    return selectedRegencyObj ? selectedRegencyObj.name : '';
  };

  const handleKecamatanChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedKecamatan(selectedValue);
  };

  const getDistrictNameById = (id) => {
    const selectedDistrictObj = kecamatan.find((district) => district.id === id);
    return selectedDistrictObj ? selectedDistrictObj.name : '';
  };

  const handleKelurahanChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedKelurahan(selectedValue);
  };

  const getVillageNameById = (id) => {
    const selectedVillageObj = kelurahan.find((village) => village.id === id);
    return selectedVillageObj ? selectedVillageObj.name : '';
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers (e.g., authorization token) if needed
        },
        body: JSON.stringify({
          nama_perusahaan: namaPerusahaan,
          // eslint-disable-next-line object-shorthand
          email: email,
          // eslint-disable-next-line object-shorthand
          jenis: jenis,
          lokasi: lokasiPerusahaan,
          alamat: alamatPerusahaan,
          no_telp: telp,
          provinsi: getProvinceNameById(selectedProvince),
          kota: getRegencyNameById(selectedKabkota),
          kecamatan: getDistrictNameById(selectedKecamatan),
          kelurahan: getVillageNameById(selectedKelurahan),
          kode: Kode,
          lat: Latitude,
          long: longitude,
          // eslint-disable-next-line object-shorthand
          modal: modal,
          jumlah_tki: jmlTKI,
          // eslint-disable-next-line object-shorthand
          kbli: kbli,
          // eslint-disable-next-line object-shorthand
          nib: nib,
          // eslint-disable-next-line object-shorthand
          role: 'user',
          // eslint-disable-next-line object-shorthand
          password: password,
          // eslint-disable-next-line object-shorthand
          confPassword: confPassword,
        }),
      });
      if (response.status === 201) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registrasi Berhasil',
          showConfirmButton: false,
          timer: 1500,
        });

        navigate('/login');
      }

      // Handle the response as needed
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      });
      console.error('Error submitting registration:', error);
      setMsg('Registration failed');
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {msg && <p className="alert alert-danger">{msg}</p>}
      <form onSubmit={handleFormSubmit}>
        <Stack spacing={3}>
          <TextField
            name="namaPerusahaan"
            label="Nama Perusahaan"
            value={namaPerusahaan}
            onChange={(e) => setNamaPerusahaan(e.target.value)}
            required
          />
          <TextField
            name="lokasiPerusahaan"
            label="Lokasi Kegiatan Usaha"
            value={lokasiPerusahaan}
            onChange={(e) => setLokasiPerusahaan(e.target.value)}
            required
          />
          <TextField
            name="email"
            label="Email Perusahaan"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            name="alamatPerusahaan"
            label="Alamat Perusahaan"
            value={alamatPerusahaan}
            onChange={(e) => setAlamatPerusahaan(e.target.value)}
            required
          />
          <TextField
            name="notelpPerusahaan"
            label="No Telp Perusahaan"
            value={telp}
            onChange={(e) => setTelp(e.target.value)}
            required
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Jenis Perusahaan</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={jenis}
              label="Jenis Perusahaan"
              onChange={handleChange}
              required
            >
              <MenuItem value={'usaha bongkar muat barang'}>usaha bongkar muat barang</MenuItem>
              <MenuItem value={'usaha jasa pengurusan transportasi'}>usaha jasa pengurusan transportasi</MenuItem>
              <MenuItem value={'penyelenggaraan depo peti kemas'}>penyelenggaraan depo peti kemas</MenuItem>
              <MenuItem value={'penyelenggaraan Tally mandiri'}>penyelenggaraan Tally mandiri</MenuItem>
              <MenuItem
                value={
                  'penyelenggaraan penyewaan peralatan angkutan laut atau peralatan jasa terkait dengan angkutan laut'
                }
              >
                penyelenggaraan penyewaan peralatan angkutan laut atau peralatan jasa terkait dengan angkutan laut
              </MenuItem>
              <MenuItem value={'usaha angkutan perairan Pelabuhan'}>usaha angkutan perairan Pelabuhan</MenuItem>
            </Select>
          </FormControl>
          <Stack direction={'row'}>
            <FormControl sx={{ width: 270 }}>
              <InputLabel>Provinsi</InputLabel>
              <Select
                label="Provinsi"
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                onChange={handleProvinceChange}
                value={selectedProvince}
                required
              >
                {provinsi.map((provins) => (
                  <MenuItem key={provins.id} value={provins.id}>
                    {provins.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedProvince && (
              <FormControl sx={{ width: 270, marginLeft: 3 }}>
                <InputLabel>Kota/Kabupaten</InputLabel>
                <Select
                  label="Kota/Kabupaten"
                  onChange={handleRegencyChange}
                  value={selectedKabkota}
                  inputProps={{ 'aria-label': 'Without label' }}
                  required
                >
                  {kabkota.map((kabkot) => (
                    <MenuItem key={kabkot.id} value={kabkot.id}>
                      {kabkot.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Stack>
          <Stack direction={'row'}>
            {selectedKabkota && (
              <FormControl sx={{ width: 270 }}>
                <InputLabel>Kecamatan</InputLabel>
                <Select
                  label="Kecamatan"
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  value={selectedKecamatan}
                  onChange={handleKecamatanChange}
                  required
                >
                  {kecamatan.map((Kecamatan) => (
                    <MenuItem key={Kecamatan.id} value={Kecamatan.id}>
                      {Kecamatan.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {selectedKecamatan && (
              <FormControl sx={{ width: 270, marginLeft: 3 }}>
                <InputLabel>Kelurahan</InputLabel>
                <Select
                  label="Kelurahan"
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  required
                  value={selectedKelurahan}
                  onChange={handleKelurahanChange}
                >
                  {kelurahan.map((keluraha) => (
                    <MenuItem key={keluraha.id} value={keluraha.id}>
                      {keluraha.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Stack>
          <TextField
            name="Kode"
            label="Kode POS"
            value={Kode}
            onChange={(e) => setKode(e.target.value)}
            type="number"
            required
          />
          <TextField
            name="modal"
            label="Modal Usaha"
            value={modal}
            onChange={(e) => setModal(e.target.value)}
            type="number"
            required
          />
          <TextField
            name="jmlTKI"
            label=" Jumlah Tenaga Kerja Indonesia"
            value={jmlTKI}
            onChange={(e) => setJmlTki(e.target.value)}
            type="number"
            required
          />
          <TextField
            name="kbli"
            label="KBLI"
            value={kbli}
            onChange={(e) => setKbli(e.target.value)}
            type="number"
            required
          />
          <TextField
            name="nib"
            label="NIB"
            value={nib}
            onChange={(e) => setNib(e.target.value)}
            type="number"
            required
          />
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
          <TextField
            name="password"
            label="Ketik Ulang Password"
            type={showPassword ? 'text' : 'password'}
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
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
          <LoadingButton fullWidth size="large" type="submit" variant="contained">
            Login
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
}
