import ExpenseRow from './ExpenseRow';

const ExpenseTable = ({ expenses, onDelete, onTogglePaid }) => (
  <table className="expense-table">
    <thead>
      <tr>
        <th scope="col">Khoản chi</th>
        <th scope="col">Số tiền</th>
        <th scope="col" className="col-category">Danh mục</th>
        <th scope="col" className="col-date">Ngày</th>
        <th scope="col">Trạng thái</th>
        <th scope="col">Thao tác</th>
      </tr>
    </thead>
    <tbody>
      {expenses.length > 0 ? expenses.map((expense) => (
        <ExpenseRow
          key={expense.id}
          expense={expense}
          onDelete={onDelete}
          onTogglePaid={onTogglePaid}
        />
      )) : (
        <tr>
          <td colSpan="6" className="empty-cell">Không có dữ liệu</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default ExpenseTable;
