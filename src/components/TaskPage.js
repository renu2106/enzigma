import './Taskpage.css'; 

import { useState } from "react";
import TaskList from "../components/TaskList";
import DeleteConfirm from "../components/DeleteConfirm";
import EditTaskModel from "../components/EditTaskModel";
import NewTaskModal from "../components/NewTaskModal";
import { ClipboardList, RefreshCcw } from "lucide-react";

const initialTasks = [
  { id: 1, user: "User 1", status: "Completed", dueDate: "2024-10-12", priority: "Low", comment: "This task is good" },
  { id: 2, user: "User 2", status: "In Progress", dueDate: "2024-09-14", priority: "High", comment: "This" },
  { id: 3, user: "User 3", status: "Not Started", dueDate: "2024-08-18", priority: "Low", comment: "This" },
  { id: 4, user: "User 4", status: "In Progress", dueDate: "2024-06-12", priority: "Normal", comment: "This task is good" },
  { id: 5, user: "User 5", status: "Not Started", dueDate: "2024-05-10", priority: "High", comment: "Important task" },
  { id: 6, user: "User 6", status: "Completed", dueDate: "2024-04-20", priority: "Normal", comment: "This is finished" },
];

export default function TaskPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const handleSave = (task) => {
    const updatedTasks = [...tasks, { ...task, id: Date.now() }];
    setTasks(updatedTasks);
    setShowForm(false);
    setCurrentPage(Math.ceil(updatedTasks.length / tasksPerPage));
  };

  const handleEdit = (task) => setEditingTask(task);
  const handleDelete = (task) => setDeletingTask(task);

  const confirmDelete = () => {
    const updatedTasks = tasks.filter(t => t.id !== deletingTask.id);
    setTasks(updatedTasks);
    setDeletingTask(null);
    if ((currentPage - 1) * tasksPerPage >= updatedTasks.length) {
      setCurrentPage(prev => Math.max(prev - 1, 1));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-yellow-500" />
          <h1 className="text-2xl font-bold">Tasks</h1>
          <span className="text-sm text-gray-500">({tasks.length} total)</span>
        </div>
        <div className="flex gap-2 ml-auto"> {/* Pushes these elements to the right */}
          <button className="bg-yellow-300 text-sm px-4 py-2 rounded shadow" onClick={() => setShowForm(true)}>
            New Task
          </button>
          <button className="bg-gray-100 px-3 py-2 rounded border border-gray-300 hover:bg-gray-200">
            <RefreshCcw size={16} />
          </button>
        </div>
      </div>

      <TaskList tasks={currentTasks} onEdit={handleEdit} onDelete={handleDelete} userColor="text-blue-700 font-semibold hover:underline" />

    
      <div className="flex justify-end items-center mt-4 gap-4"> {/* Aligned to the right */}
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>

      {showForm && !editingTask && (
        <NewTaskModal
          onCancel={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}

      {editingTask && (
        <EditTaskModel
          task={editingTask}
          onCancel={() => setEditingTask(null)}
          onSave={(updatedTask) => {
            setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
            setEditingTask(null);
          }}
        />
      )}

      {deletingTask && (
        <DeleteConfirm
          task={deletingTask}
          onCancel={() => setDeletingTask(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
