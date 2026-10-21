const BUILD_TAG = "mv-3358";
/* eslint-disable import/first */

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ExpenseList from './pages/ExpenseList';
import AddExpense from './pages/AddExpense';
import ExpenseDetail from './pages/ExpenseDetail';

// Gắn mã phiên bản lên trang để hằng số bắt buộc cũng được sử dụng.
document.documentElement.dataset.buildTag = BUILD_TAG;

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Khi mở ứng dụng: ưu tiên dữ liệu đã lưu, nếu chưa có mới gọi API.
  useEffect(() => {
    const controller = new AbortController();

    const loadExpenses = async () => {
      try {
        const savedData = window.localStorage.getItem('gk_expenses');
        if (savedData !== null) {
          const parsedData = JSON.parse(savedData);
          if (Array.isArray(parsedData)) {
            setExpenses(parsedData);
            setLoading(false);
            return;
          }
        }
      } catch {
        // Nếu dữ liệu lưu bị hỏng, thử tải lại từ API.
      }

      try {
        const response = await axios.get('/data/expenses.json', {
          signal: controller.signal
        });
        setExpenses(response.data);
      } catch (requestError) {
        if (axios.isCancel(requestError) || requestError.code === 'ERR_CANCELED') {
          return;
        }
        setError(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadExpenses();
    return () => controller.abort();
  }, []);

  // Chỉ ghi localStorage sau khi đã tải xong, tránh ghi đè dữ liệu bằng mảng rỗng.
  useEffect(() => {
    if (!loading && !error) {
      try {
        window.localStorage.setItem('gk_expenses', JSON.stringify(expenses));
      } catch {
        // Ứng dụng vẫn hoạt động trong trường hợp trình duyệt chặn localStorage.
      }
    }
  }, [expenses, loading, error]);

  const handleAddExpense = (newExpense) => {
    setExpenses((currentExpenses) => {
      const largestId = currentExpenses.reduce(
        (maximum, expense) => Math.max(maximum, expense.id),
        0
      );
      return [...currentExpenses, { ...newExpense, id: largestId + 1 }];
    });
  };

  const handleDeleteExpense = (id) => {
    setExpenses((currentExpenses) => currentExpenses.filter((expense) => expense.id !== id));
  };

  const handleTogglePaid = (id) => {
    setExpenses((currentExpenses) => currentExpenses.map((expense) => (
      expense.id === id ? { ...expense, paid: !expense.paid } : expense
    )));
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route index element={<Home expenses={expenses} />} />
        <Route
          path="expenses"
          element={(
            <ExpenseList
              expenses={expenses}
              onDelete={handleDeleteExpense}
              onTogglePaid={handleTogglePaid}
            />
          )}
        />
        <Route
          path="expenses/new"
          element={<AddExpense onAdd={handleAddExpense} />}
        />
        <Route
          path="expenses/:id"
          element={<ExpenseDetail expenses={expenses} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
