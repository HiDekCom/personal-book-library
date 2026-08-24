function BookList({
  books,
  onEdit,
  onDelete,
}) {
  if (!books || books.length === 0) {
    return (
      <p>
        ไม่พบหนังสือ
      </p>
    );
  }

  return (
    <div>
      {books.map((book) => (
        <div
          key={book.id}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "8px",
            backgroundColor: "#fff",
          }}
        >
          <h3>{book.title}</h3>

          <p>
            <strong>ISBN:</strong>{" "}
            {book.isbn || "-"}
          </p>

          <p>
            <strong>รายละเอียด:</strong>{" "}
            {book.description || "-"}
          </p>

          <p>
            <strong>Authors:</strong>{" "}
            {book.Authors &&
            book.Authors.length > 0
              ? book.Authors
                  .map((author) => author.name)
                  .join(", ")
              : "-"}
          </p>

          <p>
            <strong>Category:</strong>{" "}
            {book.Category
              ? book.Category.name
              : "-"}
          </p>

          <button
            onClick={() => onEdit(book)}
          >
            Edit
          </button>

          {" "}

          <button
            onClick={() => onDelete(book.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default BookList;