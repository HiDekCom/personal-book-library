import { useState } from "react";

function CategoryForm({
  onSubmit,
  onCancel,
  loading,
}) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoryName = name.trim();

    if (!categoryName) {
      return;
    }

    onSubmit({
      name: categoryName,
    });
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <div>
          <h2>เพิ่มหมวดหมู่</h2>

          <p>
            เพิ่มหมวดหมู่ใหม่สำหรับจัดเก็บหนังสือ
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            ชื่อหมวดหมู่ *
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="เช่น Fantasy, Science, History"
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="add-book-button"
            disabled={
              loading || !name.trim()
            }
          >
            {loading
              ? "กำลังบันทึก..."
              : "เพิ่มหมวดหมู่"}
          </button>

          <button
            type="button"
            className="cancel-button"
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

export default CategoryForm;