import { atom } from 'recoil';
import { loadState, saveState } from '..';


const savedTasks = loadState('tasksState');
const savedName = loadState('nameState');

export const tasksState = atom({
  key: 'tasksState',
  default: savedTasks || [],
});

export const nameState = atom({
    key: 'nameState',
    default: savedName || '',
  });

  