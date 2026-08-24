import { useState } from "react";

function AuthorForm({
  onSubmit,
  onCancel,
  loading,
}) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const authorName = name.trim();

    if (!authorName) {
      return;
    }

    onSubmit({
      name: authorName,
    });
  };

  return (
    <div className="author-form-card">
      <div className="author-form-header">
        <div>
          <h2>เพิ่มผู้เขียน</h2>

          <p>
            เพิ่มผู้เขียนใหม่เข้าสู่ Library
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="author-name">
            ชื่อผู้เขียน *
          </label>

          <input
            id="author-name"
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="เช่น Robert C. Martin"
            disabled={loading}
            required
          />
        </div>

        <div className="author-form-actions">
          <button
            type="submit"
            className="save-author-button"
            disabled={loading}
          >
            {loading
              ? "กำลังบันทึก..."
              : "บันทึกผู้เขียน"}
          </button>

          <button
            type="button"
            className="cancel-author-button"
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

export default AuthorForm;