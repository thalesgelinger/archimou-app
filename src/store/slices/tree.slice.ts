import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';
import {UserState} from './user.slice';

export interface TreeState {
  nodes: Node[];
  lines: Line[];
  graph: [];
  isFetchingGraph: boolean;
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
  },
  extraReducers: builder => {
    builder.addCase(fetchGraphArray.fulfilled, (state, {payload: graph}) => {
      state.graph = graph;
    });
  },
});

export const fetchGraphArray = createAsyncThunk(
  'tree/fetchGraph',
  async ({user, idToken}: UserState, thunkApi) => {
    try {
      thunkApi.dispatch(actions.setIsFetching(true));
      const {data: graph} = await api.get(`/myTree/${user.idHash}`, {
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
      console.error({error});
    }
  },
);

export const actions = treeSlice.actions;

export default treeSlice.reducer;
