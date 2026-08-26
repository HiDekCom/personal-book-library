import { useEffect, useState } from "react";

import {
  getBooks,
  getAuthors,
  createBook,
  updateBook,
  deleteBook,
  createAuthor,
} from "../api/book.api";

import {
  getCategories,
  createCategory,
} from "../api/category.api";

import BookList from "../components/BookList";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
import BookForm from "../components/BookForm";
import AuthorForm from "../components/AuthorForm";
import CategoryForm from "../components/CategoryForm";

import { useAuth } from "../context/AuthContext";

function Books() {
  const { user, logout } = useAuth();

  // =========================
  // State
  // =========================

  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [authorId, setAuthorId] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Book Form
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Author Form
  const [showAuthorForm, setShowAuthorForm] =
    useState(false);
  const [authorLoading, setAuthorLoading] = 
    useState(false);
  const [showCategoryForm, setShowCategoryForm] =
    useState(false);
  const [categoryLoading, setCategoryLoading] =
    useState(false);

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
        booksResponse.data || booksResponse || []
      );

      setAuthors(
        authorsResponse.data ||
          authorsResponse ||
          []
      );

      setCategories(
        categoriesResponse.data ||
          categoriesResponse ||
          []
      );
    } catch (err) {
      console.error("Load data error:", err);

      setError(
        err.response?.data?.message ||
          "ไม่สามารถโหลดข้อมูลได้"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Load data when page opens
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
    setShowAuthorForm(false);
    setError("");
  };

  const handleAddCategory = () => {
    setShowCategoryForm(true);
    setError("");
    };

  const handleCategorySubmit = async (
    categoryData
    ) => {
    try {
        setCategoryLoading(true);
        setError("");

        await createCategory(categoryData);

        const categoriesResponse =
        await getCategories();

        setCategories(
        categoriesResponse.data ||
            categoriesResponse
        );

        setShowCategoryForm(false);
    } catch (err) {
        console.error(
        "Create category error:",
        err
        );

        setError(
        err.response?.data?.message ||
            "ไม่สามารถเพิ่มหมวดหมู่ได้"
        );
    } finally {
        setCategoryLoading(false);
    }
    };

    const handleCancelCategory = () => {
        setShowCategoryForm(false);
        setError("");
    };



  // =========================
  // Edit Book
  // =========================

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
    setShowAuthorForm(false);
    setError("");
  };

  // =========================
  // Submit Book
  // =========================

  const handleFormSubmit = async (bookData) => {
    try {
      setFormLoading(true);
      setError("");

      if (editingBook) {
        // Update
        await updateBook(
          editingBook.id,
          bookData
        );
      } else {
        // Create
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
  // Cancel Book Form
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

      // โหลดข้อมูลใหม่หลังลบ
      await loadData();
    } catch (err) {
      console.error(
        "Delete book error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "ไม่สามารถลบหนังสือได้"
      );
    }
  };

  // =========================
  // Add Author
  // =========================

  const handleAddAuthor = () => {
    setShowAuthorForm(true);
    setShowForm(false);
    setEditingBook(null);
    setError("");
  };

  // =========================
  // Submit Author
  // =========================

  const handleAuthorSubmit = async (
    authorData
  ) => {
    try {
      setAuthorLoading(true);
      setError("");

      await createAuthor(authorData);

      // โหลดรายชื่อผู้เขียนใหม่
      const authorsResponse =
        await getAuthors();

      setAuthors(
        authorsResponse.data ||
          authorsResponse ||
          []
      );

      // ปิด Form
      setShowAuthorForm(false);
    } catch (err) {
      console.error(
        "Create author error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "ไม่สามารถเพิ่มผู้เขียนได้"
      );
    } finally {
      setAuthorLoading(false);
    }
  };

  // =========================
  // Cancel Author Form
  // =========================

  const handleCancelAuthor = () => {
    setShowAuthorForm(false);
    setError("");
  };

  // =========================
  // Filter Books
  // =========================

  const filteredBooks = books.filter(
    (book) => {
      const keyword = search
        .trim()
        .toLowerCase();

      // Search
      const matchSearch =
        !keyword ||
        book.title
          ?.toLowerCase()
          .includes(keyword);

      // Category
      const matchCategory =
        !categoryId ||
        String(
          book.category_id ??
            book.Category?.id
        ) === String(categoryId);

      // Author
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
    <div className="books-page">

      {/* =========================
          Header
      ========================== */}

      <header className="dashboard-header">
        <div>
          <div className="brand-title">
            📚 Personal Book Library
          </div>

          <div className="welcome-text">
            ยินดีต้อนรับ,{" "}
            <strong>
              {user?.username || "User"}
            </strong>
          </div>
        </div>

        <button
          className="logout-button"
          onClick={logout}
        >
          Logout
        </button>
      </header>

      {/* =========================
          Main
      ========================== */}

      <main className="books-container">

        {/* =========================
            Page Title
        ========================== */}

        <section className="page-title-section">
          <div>
            <h1>My Books</h1>

            <p>
              จัดการหนังสือทั้งหมดใน Library
              ของคุณ
            </p>
          </div>

          <div className="page-actions">
            <button
                className="add-author-button"
                onClick={handleAddAuthor}
            >
                + เพิ่มผู้เขียน
            </button>

            <button
                className="add-category-button"
                onClick={handleAddCategory}
            >
                + เพิ่มหมวดหมู่
            </button>

            <button
                className="add-book-button"
                onClick={handleAdd}
            >
                + เพิ่มหนังสือ
            </button>
            </div>
        </section>

        {/* =========================
            Error
        ========================== */}

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {/* =========================
            Summary
        ========================== */}

        <section className="summary-grid">

          <div className="summary-card">
            <div className="summary-icon">
              📚
            </div>

            <div>
              <span>หนังสือทั้งหมด</span>
              <strong>
                {books.length}
              </strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              🏷️
            </div>

            <div>
              <span>หมวดหมู่</span>
              <strong>
                {categories.length}
              </strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              ✍️
            </div>

            <div>
              <span>ผู้เขียน</span>
              <strong>
                {authors.length}
              </strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              🔎
            </div>

            <div>
              <span>ผลการค้นหา</span>
              <strong>
                {filteredBooks.length}
              </strong>
            </div>
          </div>

        </section>

        {/* =========================
            Author Form
        ========================== */}

        {showCategoryForm && (
            <section className="form-section">
                <CategoryForm
                onSubmit={handleCategorySubmit}
                onCancel={handleCancelCategory}
                loading={categoryLoading}
                />
            </section>
        )}

        {showAuthorForm && (
          <section className="form-section">
            <AuthorForm
              onSubmit={handleAuthorSubmit}
              onCancel={handleCancelAuthor}
              loading={authorLoading}
            />
          </section>
        )}

        {/* =========================
            Add Book Form
        ========================= */}
        {showForm && !editingBook && (
          <section className="form-section">
            <BookForm
              book={null}
              authors={authors}
              categories={categories}
              onSubmit={handleFormSubmit}
              onCancel={handleCancelForm}
              loading={formLoading}
            />
          </section>
        )}

        {/* =========================
            Edit Book Modal
        ========================= */}
        {showForm && editingBook && (
          <div
            className="modal-overlay"
            onClick={handleCancelForm}
          >
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <h2>✏️ แก้ไขหนังสือ</h2>
                  <p>แก้ไขข้อมูลหนังสือ</p>
                </div>

                <button
                  type="button"
                  className="modal-close-button"
                  onClick={handleCancelForm}
                  disabled={formLoading}
                >
                  ✕
                </button>
              </div>

              <BookForm
                book={editingBook}
                authors={authors}
                categories={categories}
                onSubmit={handleFormSubmit}
                onCancel={handleCancelForm}
                loading={formLoading}
              />
            </div>
          </div>
        )}

        {/* =========================
            Filter
        ========================== */}

        <section className="filter-section">

          <div className="section-heading">

            <div>
              <h2>
                ค้นหาและกรองหนังสือ
              </h2>

              <p>
                ค้นหาจากชื่อ หมวดหมู่
                หรือผู้เขียน
              </p>
            </div>

            {(search ||
              categoryId ||
              authorId) && (
              <button
                className="clear-filter-button"
                onClick={() => {
                  setSearch("");
                  setCategoryId("");
                  setAuthorId("");
                }}
              >
                ล้างตัวกรอง
              </button>
            )}

          </div>

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

        </section>

        {/* =========================
            Book List
        ========================== */}

        <section className="books-section">

          <div className="books-section-header">

            <div>
              <h2>
                รายการหนังสือ
              </h2>

              <p>
                พบ{" "}
                <strong>
                  {filteredBooks.length}
                </strong>{" "}
                รายการ
              </p>
            </div>

          </div>

          <BookList
            books={filteredBooks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        </section>

      </main>
    </div>
  );
}

export default Books;