import {useDispatch} from 'react-redux';

import {actions as userActions} from './slices/user.slice';
import {actions as treeActions} from './slices/tree.slice';

type KeysType<T> = keyof T;

type GenericFunction = (...args: any[]) => any;

type GenericFunctionType = {[key: string]: GenericFunction};

type ActionsType<T extends GenericFunctionType> = {
  [key in KeysType<T>]: (...args: Parameters<T[key]>) => void;
};

type GmiActionsType = typeof userActions | typeof treeActions;

type ForceFunction<T> = T & GenericFunction;

type Params<T> = Parameters<ForceFunction<T>>;

export const useActions = <T extends GmiActionsType>(actions: T) => {
  const dispatch = useDispatch();

  const actionsMapped = Object.keys(actions).reduce((all, current) => {
    const currentAction = actions[current as keyof T];
    return {
      ...all,
      [current]: async (...args: Params<typeof currentAction>) => {
        return await dispatch(currentAction(...args));
      },
    };
  }, {} as ActionsType<T>);

  return actionsMapped;
};
