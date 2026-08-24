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
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        flexWrap: "wrap",
      }}
    >
      <input
        type="text"
        placeholder="ค้นหาชื่อหนังสือ..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <select
        value={categoryId}
        onChange={(e) =>
          setCategoryId(e.target.value)
        }
      >
        <option value="">ทุกหมวดหมู่</option>

        {categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>

      <select
        value={authorId}
        onChange={(e) =>
          setAuthorId(e.target.value)
        }
      >
        <option value="">ทุกผู้เขียน</option>

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
  );
}

export default Filter;