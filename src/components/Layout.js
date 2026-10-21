import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading, error }) => (
  <div className="app-shell">
    <NavBar />
    <main className="page-container">
      {loading ? (
        <p className="notice" role="status">Đang tải...</p>
      ) : error ? (
        <p className="notice notice-error" role="alert">Không tải được dữ liệu</p>
      ) : (
        <Outlet />
      )}
    </main>
  </div>
);

export default Layout;
