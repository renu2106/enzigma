import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function TaskList({ tasks, onEdit, onDelete }) {
  const [dropdownTaskId, setDropdownTaskId] = useState(null);

  const toggleDropdown = (taskId) => {
    setDropdownTaskId(dropdownTaskId === taskId ? null : taskId);
  };

  return (
    <table className="w-full bg-white border border-[#e0e0e0] rounded text-sm shadow-sm">
      <thead className="bg-[#f9f9f9] text-gray-800">
        <tr className="text-left">
          <th className="p-2 border-b border-[#e0e0e0]"><input type="checkbox" disabled /></th>
          <th className="p-2 border-b border-[#e0e0e0]">Assigned To</th>
          <th className="p-2 border-b border-[#e0e0e0]">Status</th>
          <th className="p-2 border-b border-[#e0e0e0]">Due Date</th>
          <th className="p-2 border-b border-[#e0e0e0]">Priority</th>
          <th className="p-2 border-b border-[#e0e0e0]">Comments</th>
          <th className="p-2 border-b border-[#e0e0e0]"></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id} className="border-b border-[#e0e0e0] hover:bg-[#f1f1f1]">
            <td className="p-2"><input type="checkbox" /></td>
            <td className="p-2">
              <span className="text-blue-600 hover:underline cursor-pointer">{task.user}</span>
            </td>
            <td className="p-2">{task.status}</td>
            <td className="p-2">
              {new Date(task.dueDate).toLocaleDateString("en-GB")}
            </td>
            <td className="p-2">{task.priority}</td>
            <td className="p-2">{task.comment}</td>
            <td className="p-2 relative">
              <button onClick={() => toggleDropdown(task.id)}>
                <ChevronDown size={16} className="text-gray-700" />
              </button>
              {dropdownTaskId === task.id && (
                <div className="absolute right-0 mt-1 w-24 bg-[#FFE28A] border border-yellow-300 rounded shadow z-10">
                  <button
                    onClick={() => {
                      setDropdownTaskId(null);
                      onEdit(task);
                    }}
                    className="block w-full text-left px-4 py-2 text-[#333] hover:bg-yellow-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setDropdownTaskId(null);
                      onDelete(task);
                    }}
                    className="block w-full text-left px-4 py-2 text-[#333] hover:bg-yellow-200"
                  >
                    Delete
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
