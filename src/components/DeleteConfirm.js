import { useState, useEffect } from "react";

export default function DeleteConfirm({ task, onCancel, onConfirm, onEdit }) {
  const [form, setForm] = useState({ ...task });

  useEffect(() => {
    setForm({ ...task });
  }, [task]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-header text-red-600">Edit or Delete Task</h2>
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
          <button className="primary" onClick={() => onEdit(form)}>Save Changes</button>
          <button className="danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}