import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: String,
  status: String,
  dueDate: String,
  priority: String,
  comment: String,
});

const Task = mongoose.model("Task", taskSchema);
export default Task;