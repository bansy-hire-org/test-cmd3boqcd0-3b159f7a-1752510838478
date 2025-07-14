import React from 'react';

function TaskItem({ task, toggleComplete, deleteTask }) {
  return (
    <li>
      <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
}

export default TaskItem;