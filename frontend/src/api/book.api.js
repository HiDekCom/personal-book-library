import api from "./axios";

// =========================
// Books
// =========================

export const getBooks = async (params = {}) => {
  const response = await api.get("/books", {
    params,
  });

  return response.data;
};

export const getBookById = async (id) => {
  const response = await api.get(`/books/${id}`);

  return response.data;
};

export const createBook = async (bookData) => {
  const response = await api.post(
    "/books",
    bookData
  );

  return response.data;
};

export const updateBook = async (id, bookData) => {
  const response = await api.put(
    `/books/${id}`,
    bookData
  );

  return response.data;
};

export const deleteBook = async (id) => {
  const response = await api.delete(
    `/books/${id}`
  );

  return response.data;
};

// =========================
// Authors
// =========================

export const getAuthors = async () => {
  const response = await api.get("/authors");

  return response.data;
};

export const createAuthor = async (authorData) => {
  const response = await api.post(
    "/authors",
    authorData
  );

  return response.data;
};

// =========================
// Categories
// =========================

export const getCategories = async () => {
  const response = await api.get(
    "/categories"
  );

  return response.data;
};

export const createCategory = async (
  categoryData
) => {
  const response = await api.post(
    "/categories",
    categoryData
  );

  return response.data;
};