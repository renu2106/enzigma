import { useState, useEffect } from "react";

export default function TaskForm({ task = {}, onCancel, onSave }) {
  const [form, setForm] = useState({
    user: "",
    status: "Not Started",
    dueDate: "",
    priority: "Normal",
    comment: "",
  });

  useEffect(() => {
    if (task) setForm(task);
  }, [task]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-lg font-bold mb-4">{task.id ? "Edit Task" : "New Task"}</h2>
        <input className="w-full p-2 mb-2 border rounded" name="user" placeholder="Assigned To" value={form.user} onChange={handleChange} />
        <select className="w-full p-2 mb-2 border rounded" name="status" value={form.status} onChange={handleChange}>
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <input type="date" className="w-full p-2 mb-2 border rounded" name="dueDate" value={form.dueDate} onChange={handleChange} />
        <select className="w-full p-2 mb-2 border rounded" name="priority" value={form.priority} onChange={handleChange}>
          <option>Low</option>
          <option>Normal</option>
          <option>High</option>
        </select>
        <textarea className="w-full p-2 mb-2 border rounded" name="comment" placeholder="Description" value={form.comment} onChange={handleChange} />
        <div className="flex justify-end">
          <button className="mr-2 px-4 py-2 rounded bg-gray-300" onClick={onCancel}>Cancel</button>
          <button className="px-4 py-2 rounded bg-green-600 text-white" onClick={() => onSave({ ...task, ...form })}>Save</button>
        </div>
      </div>
    </div>
  );
}
