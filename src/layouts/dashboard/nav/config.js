// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_home'),
  },
  {
    title: 'admin',
    path: '/dashboard/admin',
    icon: icon('ic_user'),
  },
  {
    title: 'laporan',
    path: '/dashboard/laporan',
    icon: icon('ic_analytics'),
  },
  {
    title: 'perusahaan',
    path: '/dashboard/perusahaan',
    icon: icon('ic_company'),
  },
  // {
  //   title: 'notifikasi',
  //   path: '/dashboard/notifikasi',
  //   icon: icon('ic_notifikasi'),
  // },
  {
    title: 'logout',
    path: '/login',
    icon: icon('ic_exit'),
  },
];

export default navConfig;
