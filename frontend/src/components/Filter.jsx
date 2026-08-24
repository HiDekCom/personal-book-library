function Filter({
  search,
  setSearch,
  categoryId,
  setCategoryId,
  authorId,
  setAuthorId,
  categories,
  authors,
}) {
  return (
    <div className="filter-container">
      <div className="search-wrapper">
        <span className="search-icon">
          🔍
        </span>

        <input
          className="search-input"
          type="text"
          placeholder="ค้นหาชื่อหนังสือ..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div className="select-wrapper">
        <label>หมวดหมู่</label>

        <select
          className="filter-select"
          value={categoryId}
          onChange={(e) =>
            setCategoryId(e.target.value)
          }
        >
          <option value="">
            ทุกหมวดหมู่
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="select-wrapper">
        <label>ผู้เขียน</label>

        <select
          className="filter-select"
          value={authorId}
          onChange={(e) =>
            setAuthorId(e.target.value)
          }
        >
          <option value="">
            ทุกผู้เขียน
          </option>

          {authors.map((author) => (
            <option
              key={author.id}
              value={author.id}
            >
              {author.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filter;