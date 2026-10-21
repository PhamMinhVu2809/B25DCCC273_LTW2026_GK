import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import ExpenseTable from '../components/ExpenseTable';

const ExpenseList = ({ expenses, onDelete, onTogglePaid }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [width, setWidth] = useState(window.innerWidth);

  // Tên hàm bắt buộc theo đề: handleQueryShift.
  const handleQueryShift = (value) => setQuery(value);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = width < 768;
  const normalizedQuery = query.trim().toLocaleLowerCase('vi');
  const filteredExpenses = expenses.filter((expense) => {
    const matchesQuery = expense.title.toLocaleLowerCase('vi').includes(normalizedQuery);
    const matchesCategory = category === 'Tất cả' || expense.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <section className="list-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">QUẢN LÝ CÁC KHOẢN CHI</p>
          <h1>Danh sách khoản chi</h1>
          <p className="muted-copy">Tìm kiếm, lọc và cập nhật trạng thái các khoản chi của bạn.</p>
        </div>
        <Link className="button button-primary" to="/expenses/new">+ Thêm khoản chi</Link>
      </div>

      <FilterBar
        query={query}
        category={category}
        onQueryChange={handleQueryShift}
        onCategoryChange={setCategory}
      />

      <div className="list-meta">
        <p>Tìm thấy <strong>{filteredExpenses.length}</strong> khoản chi</p>
        <span className="mode-label">Chế độ: {isMobile ? 'Điện thoại' : 'Máy tính'}</span>
      </div>

      <div className={`table-wrap ${isMobile ? 'mobile' : ''}`}>
        <ExpenseTable
          expenses={filteredExpenses}
          onDelete={onDelete}
          onTogglePaid={onTogglePaid}
        />
      </div>
    </section>
  );
};

export default ExpenseList;
