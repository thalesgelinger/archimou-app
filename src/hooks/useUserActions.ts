import {useActions} from './../store/useActions';
import {actions} from '../store/slices/user.slice';

export const useUserActions = () => {
  const userActions = useActions(actions);
  return userActions;
};
