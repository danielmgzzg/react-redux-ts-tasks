import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import format from 'date-fns/format';

import { useForm, UseFormRegister, Control, UseFormHandleSubmit } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Task, TaskErrors, taskSchema } from '../models/task';
import { addTaskAction, editTaskAction } from '../store/actions';
import { RootState } from '../store/rootReducer';
import { getVisibleTasks } from './filterHooks';
import { EditTaskRequest, AddTaskRequest } from '../store/types';

export interface FormTypes<T, E> {
  add?: boolean;
  register: UseFormRegister<T>;
  submitting: boolean;
  onSubmit: (
    data: Task & { date: string },
  ) => AddTaskRequest | EditTaskRequest | undefined;
  errors: E;
  currentData?: Task;
  control: Control<Task>;
  handleSubmit: UseFormHandleSubmit<Task>;
}

export const useGetVisibleTasks = (): Task[] => {
  return useSelector((state: RootState) => getVisibleTasks(state.tasks, state.filters));
};

export const useAddTask = (): FormTypes<Task, TaskErrors> => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors, isSubmitted },
    control,
    handleSubmit,
  } = useForm<Task>({ resolver: yupResolver(taskSchema) });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!errors?.name && isSubmitted) {
      setSubmitting(true);
    } else {
      setSubmitting(false);
    }
  }, [errors, isSubmitted]);

  return {
    control,
    handleSubmit,
    add: true,
    register,
    submitting,
    onSubmit: (data: Task & { date: string }) => {
      return (
        data &&
        dispatch(
          addTaskAction({
            data: {
              name: data.name,
              description: data.description,
              deadline: data?.date && format(new Date(data?.date), 'yyyy-MM-dd'),
              completed: false,
            },
          }),
        )
      );
    },
    errors,
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCurrentTask = () => {
  return useSelector((state: RootState) => state.modal.currentTask);
};

export const useEditTask = (): FormTypes<Task, TaskErrors> => {
  const dispatch = useDispatch();
  const currentTask = useCurrentTask();

  const {
    register,
    formState: { errors, isSubmitted },
    control,
    handleSubmit,
  } = useForm<Task>({
    resolver: yupResolver(taskSchema),
    defaultValues: { ...currentTask },
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!errors?.name && isSubmitted) {
      setSubmitting(true);
    } else {
      setSubmitting(false);
    }
  }, [errors, isSubmitted]);

  return {
    control,
    handleSubmit,
    currentData: currentTask,
    add: false,
    register,
    submitting,
    onSubmit: (data: Task & { date: string }) => {
      console.log(data?.date);

      return (
        currentTask &&
        data &&
        dispatch(
          editTaskAction({
            id: currentTask._id,
            data: {
              name: data.name,
              description: data.description,
              deadline: data?.date && format(new Date(data?.date), 'yyyy-MM-dd'),
              completed: currentTask.completed,
            },
          }),
        )
      );
    },

    errors,
  };
};
