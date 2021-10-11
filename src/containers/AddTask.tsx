import React from 'react';
import { useDispatch } from 'react-redux';
import { addTaskAction } from '../store/actions/tasksActions';
import { v4 as uuidv4 } from 'uuid';

export default function AddTask(): JSX.Element {
  const dispatch = useDispatch();
  let input: HTMLInputElement | null;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input?.value.trim()) {
            return;
          }
          dispatch(
            addTaskAction({
              data: {
                id: uuidv4(),
                name: input.value,
                description: 'Lorem',
                deadline: new Date(),
                completed: false,
              },
            }),
          );
          input.value = '';
        }}
      >
        <input ref={(node) => (input = node)} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}
