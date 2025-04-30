// File: src/components/NewTaskModal.jsx
import { useState } from "react";

export default function NewTaskModal({ onCancel, onSave }) {
  const [form, setForm] = useState({
    user: "",
    status: "Not Started",
    dueDate: "",
    priority: "Normal",
    comment: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newTask = { ...form, id: Date.now() };
    onSave(newTask);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-header text-green-600">Add New Task</h2>
        <div className="form-group">
          <label>Assigned To</label>
          <input name="user" value={form.user} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option>Low</option>
            <option>Normal</option>
            <option>High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Comment</label>
          <textarea name="comment" value={form.comment} onChange={handleChange} />
        </div>
        <div className="modal-actions">
          <button className="secondary" onClick={onCancel}>Cancel</button>
          <button className="primary" onClick={handleSubmit}>Add Task</button>
        </div>
      </div>
    </div>
  );
}
