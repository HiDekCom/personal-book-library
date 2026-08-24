import { useEffect, useState } from "react";

import {
  getBooks,
  getAuthors,
  getCategories,
  createBook,
  updateBook,
  deleteBook,
} from "../api/book.api";

import BookList from "../components/BookList";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
import BookForm from "../components/BookForm";

import { useAuth } from "../context/AuthContext";

function Books() {
  const { user, logout } = useAuth();

  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [authorId, setAuthorId] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // =========================
  // Load Books / Authors / Categories
  // =========================
  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        booksResponse,
        authorsResponse,
        categoriesResponse,
      ] = await Promise.all([
        getBooks(),
        getAuthors(),
        getCategories(),
      ]);

      setBooks(
        booksResponse.data || booksResponse
      );

      setAuthors(
        authorsResponse.data ||
          authorsResponse
      );

      setCategories(
        categoriesResponse.data ||
          categoriesResponse
      );
    } catch (err) {
      console.error(
        "Load data error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "ไม่สามารถโหลดข้อมูลได้"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Load data ตอนเปิดหน้า
  // =========================
  useEffect(() => {
    loadData();
  }, []);

  // =========================
  // Add Book
  // =========================
  const handleAdd = () => {
    setEditingBook(null);
    setShowForm(true);
    setError("");
  };

  // =========================
  // Edit Book
  // =========================
  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
    setError("");
  };

  // =========================
  // Submit Add / Edit
  // =========================
  const handleFormSubmit = async (bookData) => {
    try {
      setFormLoading(true);
      setError("");

      if (editingBook) {
        // UPDATE
        await updateBook(
          editingBook.id,
          bookData
        );
      } else {
        // CREATE
        await createBook(bookData);
      }

      // ปิด Form
      setShowForm(false);
      setEditingBook(null);

      // โหลดข้อมูลใหม่
      await loadData();
    } catch (err) {
      console.error(
        "Save book error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "ไม่สามารถบันทึกข้อมูลหนังสือได้"
      );
    } finally {
      setFormLoading(false);
    }
  };

  // =========================
  // Cancel Form
  // =========================
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingBook(null);
    setError("");
  };

  // =========================
  // Delete Book
  // =========================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "คุณต้องการลบหนังสือเล่มนี้หรือไม่?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteBook(id);

      await loadData();
    } catch (err) {
      console.error(
        "Delete book error:",
        err
      );

      alert(
        err.response?.data?.message ||
          "ไม่สามารถลบหนังสือได้"
      );
    }
  };

  // =========================
  // Filter Books
  // =========================
  const filteredBooks = books.filter(
    (book) => {
      const keyword = search
        .trim()
        .toLowerCase();

      // Search จากชื่อหนังสือ
      const matchSearch =
        !keyword ||
        book.title
          ?.toLowerCase()
          .includes(keyword);

      // Backend ส่ง category_id
      const matchCategory =
        !categoryId ||
        String(book.category_id) ===
          String(categoryId);

      // Backend ส่ง Authors
      const matchAuthor =
        !authorId ||
        book.Authors?.some(
          (author) =>
            String(author.id) ===
            String(authorId)
        );

      return (
        matchSearch &&
        matchCategory &&
        matchAuthor
      );
    }
  );

  // =========================
  // Loading
  // =========================
  if (loading) {
    return <Loading />;
  }

  // =========================
  // Render
  // =========================
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {/* =========================
          Header
      ========================== */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1>
            Personal Book Library
          </h1>

          <p>
            Welcome,{" "}
            {user?.username || "User"}
          </p>
        </div>

        <button onClick={logout}>
          Logout
        </button>
      </header>

      {/* =========================
          Error
      ========================== */}
      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {/* =========================
          Books Header
      ========================== */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Books</h2>

        <button onClick={handleAdd}>
          + เพิ่มหนังสือ
        </button>
      </div>

      {/* =========================
          Book Form
      ========================== */}
      {showForm && (
        <BookForm
          book={editingBook}
          authors={authors}
          categories={categories}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelForm}
          loading={formLoading}
        />
      )}

      {/* =========================
          Filter
      ========================== */}
      <Filter
        search={search}
        setSearch={setSearch}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        authorId={authorId}
        setAuthorId={setAuthorId}
        categories={categories}
        authors={authors}
      />

      {/* =========================
          Result Count
      ========================== */}
      <p>
        พบหนังสือ{" "}
        <strong>
          {filteredBooks.length}
        </strong>{" "}
        รายการ
      </p>

      {/* =========================
          Book List
      ========================== */}
      <BookList
        books={filteredBooks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Books;