import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';
import {UserState, actions as userActions} from './user.slice';

export interface TreeState {
  nodes: Node[];
  lines: Line[];
  graph: [];
  isFetchingGraph: boolean;
  isLoading: boolean;
}

interface Person {
  idHash: string;
  name: string;
  gender: 'M' | 'F';
  partner: {idHash: string};
  mother: {idHash: string};
  father: {idHash: string};
  parents: {idHash: string}[];
  sibling: {idHash: string}[];
  descendant: {idHash: string}[];
}

interface Positions {
  x: number;
  y: number;
  originX?: number;
  originY?: number;
}

export interface Node extends Person, Positions {}

interface Point {
  x: number;
  y: number;
}

interface Line {
  from: Point;
  to: Point;
}

const initialState: TreeState = {
  nodes: [],
  lines: [],
  graph: [],
  isFetchingGraph: false,
  isLoading: false,
};

export const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    setNodes(state, {payload: nodes}) {
      state.nodes = nodes;
    },
    setLines(state, {payload: lines}) {
      state.lines = lines;
    },
    setIsFetching(state, {payload: isFetching}) {
      state.isFetchingGraph = isFetching;
    },
    setIsLoading(state, {payload: isLoading}) {
      state.isLoading = isLoading;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchGraphArray.fulfilled, (state, {payload: graph}) => {
      state.graph = graph;
    });
  },
});

export const fetchGraphArray = createAsyncThunk(
  'tree/fetchGraph',
  async ({idHash, idToken}: {idHash: string; idToken: string}, thunkApi) => {
    try {
      thunkApi.dispatch(actions.setIsFetching(true));
      console.log({idTokenNOFETCH: idToken});

      console.log({idToken});

      const {data: graph} = await api.get(`/myTree/${idHash}`, {
        headers: {Authorization: 'Bearer ' + idToken},
      });

      const graphDataWithMappedParents = graph.map(person => {
        const parents = [];
        person?.father && parents.push(person.father);
        person?.mother && parents.push(person.mother);

        return {
          ...person,
          parents,
        };
      });

      thunkApi.dispatch(actions.setIsFetching(false));
      return graphDataWithMappedParents;
    } catch ({response: error}) {
      thunkApi.dispatch(userActions.backToLogin());
      console.error({error});
    }
  },
);

export const actions = treeSlice.actions;

export default treeSlice.reducer;
