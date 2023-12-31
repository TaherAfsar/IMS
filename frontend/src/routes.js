import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import ProcurerLoginPage from './pages/ProcurerLoginPage';
import Page404 from './pages/Page404';
import InventoryPage from './pages/InventoryPage';
import DashboardAppPage from './pages/DashboardAppPage';
import AddItems from './pages/AddItems'
import ViewReportsPage from './pages/ViewReportsPage'
import AddCategory from './pages/AddCategory';
import ProcurerHome from './pages/ProcurerHome';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'InventoryPage', element: <InventoryPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'procurerlogin',
      element: <ProcurerLoginPage />,
    },
    {
      path: 'procurerhome',
      element: <ProcurerHome />,
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
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: 'addItems',
      element: <AddItems />
    },
    {
      path: 'addCategory',
      element: <AddCategory />
    },
    {
      path: 'viewReportsPage',
      element: <ViewReportsPage />
    }
  ]);

  return routes;
}
