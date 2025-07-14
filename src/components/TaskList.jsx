import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, toggleComplete, deleteTask }) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} toggleComplete={toggleComplete} deleteTask={deleteTask} />
      ))}
    </ul>
  );
}

export default TaskList;