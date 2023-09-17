// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'User List',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Inventory Product List',
    path: '/dashboard/InventoryPage',
    icon: icon('ic_cart'),
  },
  {
    title: 'View Reports Page',
    path: '/viewReportsPage',
    icon: icon('ic_lock'),
  },
  {
    title: 'Add Inventory Items',
    path: '/AddItems',
    icon: icon('ic_cart'),
  },
  {
    title: 'Add Category',
    path: '/AddCategory',
    icon: icon('ic_cart'),
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  {
    title: 'Procurer Login',
    path: '/procurerlogin',
    icon: icon('ic_lock'),
  },
  {
    title: 'Procurer Home',
    path: '/procurerhome',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
