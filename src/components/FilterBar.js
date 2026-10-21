import { CATEGORIES } from '../data';

const FilterBar = ({ query, category, onQueryChange, onCategoryChange }) => (
  <div className="filter-bar">
    <div className="field filter-search">
      <label htmlFor="expense-search">Tìm kiếm</label>
      <input
        id="expense-search"
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Nhập tên khoản chi..."
      />
    </div>
    <div className="field filter-category">
      <label htmlFor="category-filter">Danh mục</label>
      <select
        id="category-filter"
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="Tất cả">Tất cả</option>
        {CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </div>
  </div>
);

export default FilterBar;
