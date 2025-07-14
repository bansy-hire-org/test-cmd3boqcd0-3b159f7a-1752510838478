import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('App Component', () => {
  test('renders Task Manager title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Task Manager/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('adds a task to the list', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a task/i);
    const addButtonElement = screen.getByText(/Add Task/i);

    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.click(addButtonElement);

    const taskElement = screen.getByText(/New Task/i);
    expect(taskElement).toBeInTheDocument();
  });

  test('can toggle complete a task', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a task/i);
    const addButtonElement = screen.getByText(/Add Task/i);

    fireEvent.change(inputElement, { target: { value: 'Another Task' } });
    fireEvent.click(addButtonElement);

    const taskElement = screen.getByText(/Another Task/i);
    const checkboxElement = screen.getByRole('checkbox');
    fireEvent.click(checkboxElement);
    expect(taskElement).toHaveStyle('text-decoration: line-through');
  });

   test('deletes a task', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add a task/i);
    const addButtonElement = screen.getByText(/Add Task/i);

    fireEvent.change(inputElement, { target: { value: 'Task to Delete' } });
    fireEvent.click(addButtonElement);

    const taskElement = screen.getByText(/Task to Delete/i);
    const deleteButtonElement = taskElement.closest('li').querySelector('button');
    fireEvent.click(deleteButtonElement);

    expect(screen.queryByText(/Task to Delete/i)).toBeNull();
  });
});