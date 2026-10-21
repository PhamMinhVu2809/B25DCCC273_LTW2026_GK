import { useNavigate, useParams } from 'react-router-dom';
import { formatMoney } from '../data';

const ExpenseDetail = ({ expenses }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);
  const expense = expenses.find((item) => item.id === numericId);

  if (!Number.isFinite(numericId) || !expense) {
    return (
      <section className="not-found-panel">
        <span className="not-found-icon" aria-hidden="true">?</span>
        <h1>Không tìm thấy khoản chi</h1>
        <p className="muted-copy">Khoản chi bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
        <button className="button button-primary" type="button" onClick={() => navigate(-1)}>Quay lại</button>
      </section>
    );
  }

  return (
    <section className="detail-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">CHI TIẾT GIAO DỊCH</p>
          <h1>Chi tiết khoản chi</h1>
          <p className="muted-copy">Thông tin đầy đủ của khoản chi đã chọn.</p>
        </div>
        <button className="button button-ghost" type="button" onClick={() => navigate(-1)}>← Quay lại</button>
      </div>
      <article className="detail-card">
        <div className="detail-card-heading">
          <span className="detail-icon" aria-hidden="true">₫</span>
          <div>
            <p className="eyebrow">KHOẢN CHI #{expense.id}</p>
            <h2>{expense.title}</h2>
            <strong className="detail-amount">{formatMoney(expense.amount)}</strong>
          </div>
        </div>
        <div className="detail-rows">
          <p><strong>Tên khoản chi:</strong> {expense.title}</p>
          <p><strong>Số tiền:</strong> {formatMoney(expense.amount)}</p>
          <p><strong>Danh mục:</strong> {expense.category}</p>
          <p><strong>Ngày:</strong> {expense.date}</p>
          <p>
            <strong>Trạng thái:</strong>{' '}
            <span className={`status ${expense.paid ? 'status-paid' : 'status-unpaid'}`}>
              {expense.paid ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </span>
          </p>
        </div>
      </article>
    </section>
  );
};

export default ExpenseDetail;
