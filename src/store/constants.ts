export enum taskTypes {
  LOAD_TASKS = 'LOAD_TASKS',
  TASKS_LOADED = 'TASKS_LOADED',
  LOAD_TASKS_FAILURE = 'LOAD_TASKS_FAILURE',

  ADD_TASK = 'ADD_TASK',
  TASK_ADDED = 'TASK_ADDED',
  ADD_TASK_FAILURE = 'ADD_TASK_FAILURE',

  TOGGLE_TASK = 'TOGGLE_TASK',
  TASK_TOGGLED = 'TASK_TOGGLED',
  TOGGLE_TASK_FAILURE = 'TOGGLE_TASK_FAILURE',

  SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER',
}

export enum VisibilityFilters {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
  SHOW_ACTIVE = 'SHOW_ACTIVE',
  SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER',
}
