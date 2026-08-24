import { useEffect, useState } from "react";

function BookForm({
  book,
  authors,
  categories,
  onSubmit,
  onCancel,
  loading,
}) {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [authorIds, setAuthorIds] = useState([]);

  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setIsbn(book.isbn || "");
      setDescription(book.description || "");

      // รองรับทั้ง categoryId และ category_id
      setCategoryId(
        book.categoryId ||
          book.category_id ||
          book.Category?.id ||
          ""
      );

      // รองรับข้อมูล authors จาก API
      setAuthorIds(
        book.Authors?.map((author) =>
          String(author.id)
        ) || []
      );
    } else {
      setTitle("");
      setIsbn("");
      setDescription("");
      setCategoryId("");
      setAuthorIds([]);
    }
  }, [book]);

  const handleAuthorChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions
    );

    setAuthorIds(
      selectedOptions.map(
        (option) => option.value
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // เตรียมข้อมูลให้ตรงกับ Backend API
    const bookData = {
      title: title.trim(),
      isbn: isbn.trim() || null,
      description: description.trim() || "",
      categoryId: categoryId
        ? Number(categoryId)
        : null,
      authorIds: authorIds.map(Number),
    };

    onSubmit(bookData);
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        marginBottom: "20px",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <h2>
        {book
          ? "แก้ไขหนังสือ"
          : "เพิ่มหนังสือ"}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* =========================
            Title
        ========================== */}
        <div style={{ marginBottom: "12px" }}>
          <label>
            ชื่อหนังสือ *
          </label>

          <br />

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="กรอกชื่อหนังสือ"
            required
          />
        </div>

        {/* =========================
            ISBN
        ========================== */}
        <div style={{ marginBottom: "12px" }}>
          <label>
            ISBN
          </label>

          <br />

          <input
            type="text"
            value={isbn}
            onChange={(e) =>
              setIsbn(e.target.value)
            }
            placeholder="กรอก ISBN"
          />
        </div>

        {/* =========================
            Description
        ========================== */}
        <div style={{ marginBottom: "12px" }}>
          <label>
            รายละเอียด
          </label>

          <br />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="กรอกรายละเอียดหนังสือ"
            rows={4}
            style={{
              width: "300px",
              resize: "vertical",
            }}
          />
        </div>

        {/* =========================
            Category
        ========================== */}
        <div style={{ marginBottom: "12px" }}>
          <label>
            หมวดหมู่
          </label>

          <br />

          <select
            value={categoryId}
            onChange={(e) =>
              setCategoryId(e.target.value)
            }
          >
            <option value="">
              เลือกหมวดหมู่
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

        {/* =========================
            Authors
        ========================== */}
        <div style={{ marginBottom: "12px" }}>
          <label>
            ผู้เขียน
          </label>

          <br />

          <select
            multiple
            value={authorIds}
            onChange={handleAuthorChange}
            style={{
              minWidth: "250px",
              minHeight: "100px",
            }}
          >
            {authors.map((author) => (
              <option
                key={author.id}
                value={author.id}
              >
                {author.name}
              </option>
            ))}
          </select>

          <div
            style={{
              marginTop: "5px",
              fontSize: "12px",
              color: "#666",
            }}
          >
            กด Ctrl ค้างไว้เพื่อเลือกผู้เขียนหลายคน
          </div>
        </div>

        {/* =========================
            Buttons
        ========================== */}
        <div>
          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "กำลังบันทึก..."
              : book
              ? "บันทึกการแก้ไข"
              : "เพิ่มหนังสือ"}
          </button>

          {" "}

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookForm;