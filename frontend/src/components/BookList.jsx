function BookList({
  books,
  onEdit,
  onDelete,
}) {
  if (!books || books.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📚</div>

        <h3>ไม่พบหนังสือ</h3>

        <p>
          ลองเปลี่ยนคำค้นหาหรือตัวกรอง
          หรือเพิ่มหนังสือใหม่
        </p>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <article
          className="book-card"
          key={book.id}
        >
          <div className="book-card-top">
            <div className="book-icon">
              📖
            </div>

            <span className="book-id">
              #{book.id}
            </span>
          </div>

          <div className="book-content">
            <h3 className="book-title">
              {book.title}
            </h3>

            <div className="book-info">
              <div className="info-row">
                <span className="info-label">
                  ISBN
                </span>

                <span>
                  {book.isbn || "-"}
                </span>
              </div>

              <div className="info-row">
                <span className="info-label">
                  ผู้เขียน
                </span>

                <span>
                  {book.Authors &&
                  book.Authors.length > 0
                    ? book.Authors
                        .map(
                          (author) =>
                            author.name
                        )
                        .join(", ")
                    : "-"}
                </span>
              </div>

              <div className="info-row">
                <span className="info-label">
                  หมวดหมู่
                </span>

                <span>
                  {book.Category
                    ? book.Category.name
                    : "-"}
                </span>
              </div>
            </div>

            <div className="description">
              {book.description ||
                "ไม่มีรายละเอียดหนังสือ"}
            </div>
          </div>

          <div className="book-actions">
            <button
              className="edit-button"
              onClick={() => onEdit(book)}
            >
              ✏️ แก้ไข
            </button>

            <button
              className="delete-button"
              onClick={() =>
                onDelete(book.id)
              }
            >
              🗑️ ลบ
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default BookList;