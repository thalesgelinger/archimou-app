import {useActions} from './../store/useActions';
import {actions} from '../store/slices/tree.slice';

export const useTreeActions = () => {
  const treeActions = useActions(actions);
  return treeActions;
};
