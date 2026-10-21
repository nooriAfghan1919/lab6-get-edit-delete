
import { useEffect, useState } from "react";
import {
  getCourses,
  updateCourse,
  deleteCourse,
} from "../services/courseApi";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    code: "",
    title: "",
    credits: "",
  });

  async function loadCourses() {
    try {
      setError("");
      const response = await getCourses();
      const data = response.data;

      if (!Array.isArray(data)) {
        throw new Error("Invalid courses response");
      }

      setCourses(data);
    } catch (err) {
      console.error("Error loading courses:", err);
      setError("Unable to load courses. Check the backend and try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCourses();
  }, []);

  function handleEdit(course) {
    setEditingId(course.id);
    setForm({
      code: String(course.code ?? ""),
      title: String(course.title ?? ""),
      credits: String(course.credits ?? ""),
    });
    setMessage("");
    setError("");
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ code: "", title: "", credits: "" });
    setError("");
  }

  async function handleUpdate(event) {
    event.preventDefault();

    const code = String(form.code ?? "").trim();
    const title = String(form.title ?? "").trim();
    const creditsText = String(form.credits ?? "").trim();
    const credits = Number(creditsText);

    if (!code || !title || !creditsText) {
      setError("Please fill in all fields.");
      return;
    }

    if (!Number.isInteger(credits) || credits < 1) {
      setError("Credits must be a positive whole number.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      await updateCourse(editingId, {
        code,
        title,
        credits,
      });

      await loadCourses();
      setEditingId(null);
      setForm({ code: "", title: "", credits: "" });
      setMessage("Course updated successfully.");
    } catch (err) {
      console.error("Error updating course:", err);
      setError(
        err.response?.data?.message ||
          "Unable to update course. Please check the backend."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");
      setMessage("");

      await deleteCourse(id);

      setCourses((previous) =>
        previous.filter((course) => course.id !== id)
      );

      if (editingId === id) {
        cancelEdit();
      }

      setMessage("Course deleted successfully.");
    } catch (err) {
      console.error("Error deleting course:", err);
      setError(
        err.response?.data?.message ||
          "Unable to delete course. Please check the backend."
      );
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return <p className="message">Loading courses...</p>;
  }

  return (
    <main className="container">
      <h1>Course Management</h1>

      <p className="count">Total Courses: {courses.length}</p>

      {message && <p className="message">{message}</p>}
      {error && <p className="message error">{error}</p>}

      {editingId !== null && (
        <section className="edit-section">
          <h2>Edit Course</h2>

          <form onSubmit={handleUpdate}>
            <div>
              <label htmlFor="code">Course Code</label>
              <input
                id="code"
                name="code"
                value={form.code}
                onChange={handleChange}
                required
                maxLength={50}
              />
            </div>

            <div>
              <label htmlFor="title">Course Title</label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                maxLength={200}
              />
            </div>

            <div>
              <label htmlFor="credits">Credits</label>
              <input
                id="credits"
                name="credits"
                type="number"
                min="1"
                step="1"
                value={form.credits}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" disabled={saving}>
              {saving ? "Updating..." : "Update Course"}
            </button>

            <button type="button" onClick={cancelEdit} disabled={saving}>
              Cancel
            </button>
          </form>
        </section>
      )}

      {courses.length === 0 ? (
        <p className="message">No courses available.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Title</th>
                <th>Credits</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.code}</td>
                  <td>{course.title}</td>
                  <td>{course.credits}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleEdit(course)}
                      disabled={saving || deletingId !== null}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(course.id)}
                      disabled={saving || deletingId !== null}
                    >
                      {deletingId === course.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
