// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard-user/app',
    icon: icon('ic_home'),
  },
  {
    title: 'laporan',
    path: '/dashboard-user/laporan-user',
    icon: icon('ic_analytics'),
  },
  {
    title: 'logout',
    path: '/login',
    icon: icon('ic_exit'),
  },
];

export default navConfig;
