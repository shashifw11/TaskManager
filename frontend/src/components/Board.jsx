import React from 'react';
import Column from './Column';
import { useTasks } from '../context/TaskContext';

const Board = () => {
    const {columns} = useTasks();
  return (
    <div className="flex justify-around mt-4"> 
      {columns.map(column => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
};

export default Board;














































