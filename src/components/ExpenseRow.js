import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

const ExpenseRow = ({ expense, onDelete, onTogglePaid }) => (
  <tr>
    <td data-label="Khoản chi">
      <Link className="expense-link" to={`/expenses/${expense.id}`}>{expense.title}</Link>
    </td>
    <td data-label="Số tiền" className="money-cell">{formatMoney(expense.amount)}</td>
    <td data-label="Danh mục" className="col-category">{expense.category}</td>
    <td data-label="Ngày" className="col-date">{expense.date}</td>
    <td data-label="Trạng thái">
      <span className={`status ${expense.paid ? 'status-paid' : 'status-unpaid'}`}>
        {expense.paid ? 'Đã thanh toán' : 'Chưa thanh toán'}
      </span>
    </td>
    <td data-label="Thao tác">
      <div className="row-actions">
        <button className="button button-small button-secondary" type="button" onClick={() => onTogglePaid(expense.id)}>
          {expense.paid ? 'Đánh dấu chưa trả' : 'Đánh dấu đã trả'}
        </button>
        <button className="button button-small button-danger" type="button" onClick={() => onDelete(expense.id)}>
          Xóa
        </button>
      </div>
    </td>
  </tr>
);

export default ExpenseRow;
