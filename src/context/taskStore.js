import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],

  addTask: (task) =>
    set((state) => {
      const updatedTasks = [...state.tasks, task];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    }),

  removeTask: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    }),

  toggleComplete: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    }),
}));

export default useTaskStore;
