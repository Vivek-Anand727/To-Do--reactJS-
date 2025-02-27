import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../context/authStore";
import useTaskStore from "../context/taskStore";

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { tasks, addTask, removeTask, toggleComplete } = useTaskStore();
  const [taskTitle, setTaskTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [alertMessage, setAlertMessage] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(""), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;

    if (editingTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id ? { ...task, title: taskTitle } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setEditingTask(null);
      showAlert("Task updated successfully! ✅"); 
    } else {
      addTask({ id: Date.now(), title: taskTitle, completed: false });
      showAlert("Task added successfully! ✅"); 
    }
    setTaskTitle("");
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskTitle(task.title);
  };

  const handleRemoveTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      removeTask(id);
      showAlert("Task deleted! 🗑️");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-8">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-center mb-6 text-blue-400">Welcome, {user?.name}!</h1>

        {alertMessage && (
          <div className="bg-green-600 text-white p-3 rounded mb-5 text-center font-medium">
            {alertMessage}
          </div>
        )}

        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300 absolute top-6 right-6"
        >
          Logout
        </button>

        <div className="p-6 rounded-lg bg-gray-700 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Task List</h2>

          {/* Task Input */}
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Enter task..."
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="border border-gray-600 bg-gray-900 text-white p-3 rounded-l-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-500 text-white px-6 py-3 rounded-r-lg hover:bg-blue-600 transition duration-300"
            >
              {editingTask ? "Update" : "Add"}
            </button>
          </div>

          {/* Filter Dropdown */}
          <div className="flex justify-center space-x-4 mb-6">
            {["all", "completed", "incomplete"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-3 rounded-lg font-medium transition duration-300 ${
                  filter === type
                    ? "bg-blue-500 text-white"
                    : "bg-gray-600 text-gray-200 hover:bg-gray-500"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Task List */}
          {filteredTasks.length === 0 && (
            <p className="text-center text-gray-400">No tasks found.</p>
          )}

          <ul className="space-y-4">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700"
              >
                <span
                  className={`flex-1 cursor-pointer text-lg ${
                    task.completed ? "line-through text-gray-400" : "text-white"
                  }`}
                  onClick={() => {
                    if (window.confirm("Mark as completed/incomplete?")) {
                      toggleComplete(task.id);
                      showAlert("Task updated! ✅"); 
                    }
                  }}
                >
                  {task.title}
                </span>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEditTask(task)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveTask(task.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
