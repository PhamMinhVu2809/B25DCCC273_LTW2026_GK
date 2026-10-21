import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <header className="site-header">
    <div className="nav-inner">
      <NavLink className="brand" to="/" end>
        <span className="brand-mark" aria-hidden="true">₫</span>
        <span>Chi tiêu cá nhân</span>
      </NavLink>
      <nav className="main-nav" aria-label="Menu chính">
        <NavLink to="/" end>Trang chủ</NavLink>
        <NavLink to="/expenses" end>Danh sách</NavLink>
        <NavLink to="/expenses/new" end>Thêm mới</NavLink>
      </nav>
    </div>
  </header>
);

export default NavBar;
