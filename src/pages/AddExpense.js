import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddExpense = ({ onAdd }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Ăn uống');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!title.trim() || amount === '' || !category || !date) {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const numericAmount = Number(amount);
    if (!Number.isInteger(numericAmount) || numericAmount < 1000 || numericAmount > 100000000) {
      setErrorMessage('Số tiền phải từ 1.000 đến 100.000.000');
      return;
    }

    onAdd({
      title: title.trim(),
      amount: numericAmount,
      category,
      date,
      paid: false
    });
    navigate('/expenses', { replace: true });
  };

  return (
    <section className="form-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">GHI NHẬN GIAO DỊCH</p>
          <h1>Thêm khoản chi mới</h1>
          <p className="muted-copy">Nhập đầy đủ thông tin để lưu khoản chi của bạn.</p>
        </div>
        <Link className="button button-ghost" to="/expenses">← Danh sách</Link>
      </div>

      <form className="expense-form" onSubmit={handleSubmit} noValidate>
        <div className="form-intro">
          <span className="form-icon" aria-hidden="true">＋</span>
          <div>
            <h2>Thông tin khoản chi</h2>
            <p>Các trường thông tin đều cần được nhập.</p>
          </div>
        </div>

        <div className="field">
          <label htmlFor="expense-title">Tên khoản chi</label>
          <input
            id="expense-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ví dụ: Mua đồ dùng học tập"
          />
        </div>

        <div className="form-grid">
          <div className="field">
            <label htmlFor="expense-amount">Số tiền</label>
            <div className="amount-input-wrap">
              <input
                id="expense-amount"
                type="number"
                min="1000"
                max="100000000"
                step="1"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Ví dụ: 45000"
              />
              <span>đ</span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="expense-category">Danh mục</label>
            <select id="expense-category" value={category} onChange={(event) => setCategory(event.target.value)}>
              {CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="expense-date">Ngày chi</label>
          <input id="expense-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>

        {errorMessage && <p className="form-error" role="alert">{errorMessage}</p>}

        <div className="form-actions">
          <button className="button button-primary" type="submit">Thêm</button>
          <Link className="button button-ghost" to="/expenses">Hủy</Link>
        </div>
      </form>
    </section>
  );
};

export default AddExpense;
