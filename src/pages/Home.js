import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

const Home = ({ expenses }) => {
  const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const unpaidAmount = expenses.reduce(
    (total, expense) => total + (expense.paid ? 0 : expense.amount),
    0
  );

  return (
    <section className="home-page">
      <div className="hero-panel">
        <div>
          <p className="eyebrow">TỔNG QUAN TÀI CHÍNH</p>
          <h1>Chi tiêu cá nhân</h1>
          <p className="hero-copy">Theo dõi các khoản chi, kiểm soát thanh toán và chủ động hơn với ngân sách của bạn.</p>
          <Link className="button button-primary" to="/expenses">Xem danh sách khoản chi</Link>
        </div>
        <div className="hero-illustration" aria-hidden="true">
          <div className="illustration-circle circle-one" />
          <div className="wallet-card"><span>CHI TIÊU</span><strong>₫</strong><i /></div>
          <div className="illustration-circle circle-two" />
        </div>
      </div>

      <section className="stats-section" aria-labelledby="stats-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">BỨC TRANH HIỆN TẠI</p>
            <h2 id="stats-title">Thống kê nhanh</h2>
          </div>
          <Link className="text-link" to="/expenses/new">+ Thêm khoản chi</Link>
        </div>
        <div className="stats-grid">
          <article className="stat-card">
            <span className="stat-icon icon-blue" aria-hidden="true">▤</span>
            <p>Tổng số khoản chi</p>
            <strong>{expenses.length}</strong>
            <span className="stat-caption">Khoản chi đang được quản lý</span>
          </article>
          <article className="stat-card">
            <span className="stat-icon icon-green" aria-hidden="true">↗</span>
            <p>Tổng số tiền đã chi</p>
            <strong>{formatMoney(totalAmount)}</strong>
            <span className="stat-caption">Tổng giá trị các khoản chi</span>
          </article>
          <article className="stat-card">
            <span className="stat-icon icon-orange" aria-hidden="true">◷</span>
            <p>Tổng số tiền chưa thanh toán</p>
            <strong>{formatMoney(unpaidAmount)}</strong>
            <span className="stat-caption">Khoản tiền cần thanh toán</span>
          </article>
        </div>
      </section>
    </section>
  );
};

export default Home;
