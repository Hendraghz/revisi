import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import DashboardLayoutUser from './layoutUser/dashboard';
import SimpleLayoutUser from './layoutUser/simple';
//
import PerusahaanPage from './pages/PerusahaanPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import LaporanPage from './pages/LaporanPage';
import DashboardAppPage from './pages/DashboardAppPage';
import NotifikasiPage from './pages/NotifikasiPage';
import TambahAdminPage from './pages/TambahAdmin';
import EditAdminPage from './pages/EditAdmin';
import TambahPerusahaanPage from './pages/TambahPerusahaan';
import EditPerusahaanPage from './pages/EditPerusahaan';
import TambahNotifikasiPage from './pages/TambahNotifikasi';
import EditNotifikasiPage from './pages/EditNotifikasi';
import TambahLaporanPengurusan from './pages/TambahLaporanPengurusan';
import LaporanPengurusan from './pages/LaporanPengurusan';
import EditLaporanPage from './pages/EditLaporan';
import LaporanBongkar from './pages/LaporanBongkar';
import LaporanAngkutan from './pages/LaporanAngkutan';
import TambahLaporanBongkar from './pages/TambahLaporanBongkar';
import TambahLaporanAngkutan from './pages/TambahLaporanAngkutan';
import LaporanTally from './pages/LaporanTally';
import TambahLaporanTally from './pages/TambahLaporanTally';
import LaporanDepo from './pages/LaporanDepo';
import TambahLaporanDepo from './pages/TambahLaporanDepo';
import LaporanPenyewaan from './pages/LaporanPenyewaan';
import TambahLaporanPenyewaan from './pages/TambahLaporanPenyewaan';
import Registration from './pages/User/Registration';
import DetailPerusahaan from './pages/DetailPerusahaan';

import DashboardUser from './pages/DashboardUser';
import LaporanUser from './pages/User/LaporanPage';
import InputLaporanBongkarUser from './pages/User/input/TambahLaporanBongkar';
import InputLaporanDepoUser from './pages/User/input/TambahLaporanDepo';
import InputLaporanAngkutanUser from './pages/User/input/TambahLaporanAngkutan';
import InputLaporanPengurusanUser from './pages/User/input/TambahLaporanPengurusan';
import InputLaporanPenyewaanUser from './pages/User/input/TambahLaporanPenyewaan';
import InputLaporanTallyUser from './pages/User/input/TambahLaporanTally';
import Profile from './pages/User/Profile';


import EditLaporanAngkutan from './pages/User/edit/EditLaporanAngkutan';
import EditLaporanBongkar from './pages/User/edit/EditLaporanBongkar';
import EditLaporanDepo from './pages/User/edit/EditLaporanDepo';
import EditLaporanPenyewa from './pages/User/edit/EditLaporanPenyewaan';
import EditLaporanTally from './pages/User/edit/EditLaporanTally';
import EditLaporanPengurusan from './pages/User/edit/EditLaporanPengurusan';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
      children: [{ element: <Navigate to="/login" />, index: true }],
    },
    {
      path: '/regis',
      element: <Registration />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'admin', element: <AdminPage /> },
        { path: 'laporan', element: <LaporanPage /> },
        { path: 'perusahaan', element: <PerusahaanPage /> },
        { path: 'notifikasi', element: <NotifikasiPage /> },
        { path: 'tambah-admin', element: <TambahAdminPage /> },
        { path: 'edit-admin/:id', element: <EditAdminPage /> },
        { path: 'tambah-perusahaan', element: <TambahPerusahaanPage /> },
        { path: 'detail-perusahaan', element: <DetailPerusahaan/>},
        { path: 'edit-perusahaan/:id', element: <EditPerusahaanPage /> },
        { path: 'tambah-notifikasi', element: <TambahNotifikasiPage /> },
        { path: 'edit-notifikasi', element: <EditNotifikasiPage /> },
        { path: 'edit-laporan', element: <EditLaporanPage /> },
        { path: 'laporan-bongkar', element: <LaporanBongkar /> },
        { path: 'laporan-pengurusan', element: <LaporanPengurusan /> },
        { path: 'tambah-laporan-bongkar', element: <TambahLaporanBongkar /> },
        { path: 'tambah-laporan-pengurusan', element: <TambahLaporanPengurusan /> },
        { path: 'laporan-angkutan', element: <LaporanAngkutan /> },
        { path: 'tambah-laporan-angkutan', element: <TambahLaporanAngkutan /> },
        { path: 'laporan-tally', element: <LaporanTally /> },
        { path: 'tambah-laporan-tally', element: <TambahLaporanTally /> },
        { path: 'laporan-depo', element: <LaporanDepo /> },
        { path: 'tambah-laporan-depo', element: <TambahLaporanDepo /> },
        { path: 'laporan-penyewaan', element: <LaporanPenyewaan /> },
        { path: 'tambah-laporan-penyewaan', element: <TambahLaporanPenyewaan /> },
      ],
    },
    {
      path: '/dashboard-user',
      element: <DashboardLayoutUser />,
      children: [
        { element: <Navigate to="/dashboard-user/app" />, index: true },
        { path: 'app', element: <DashboardUser /> },
        { path: 'profile-user', element: <Profile/>},
        { path: 'laporan-user', element: <LaporanUser /> },
        { path: 'tambah-laporan-bongkar-user', element: <InputLaporanBongkarUser /> },
        { path: 'tambah-laporan-depo-user', element: <InputLaporanDepoUser /> },
        { path: 'tambah-laporan-angkutan-user', element: <InputLaporanAngkutanUser /> },
        { path: 'tambah-laporan-pengurusan-user', element: <InputLaporanPengurusanUser /> },
        { path: 'tambah-laporan-tally-user', element: <InputLaporanTallyUser /> },
        { path: 'tambah-laporan-penyewaan-user', element: <InputLaporanPenyewaanUser /> },
        { path: 'edit-laporan-bongkar-user/:id', element: <EditLaporanBongkar /> },
        { path: 'edit-laporan-depo-user/:id', element: <EditLaporanDepo/>},
        { path: 'edit-laporan-angkutan-user/:id', element: <EditLaporanAngkutan/>},
        { path: 'edit-laporan-pengurusan-user/:id', element: <EditLaporanPengurusan/>},
        { path: 'edit-laporan-tally-user/:id', element: <EditLaporanTally/>},
        { path: 'edit-laporan-penyewaan-user/:id', element: <EditLaporanPenyewa/>}
        
      ],
    },

    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      element: <SimpleLayoutUser />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
