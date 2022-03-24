import {createSlice} from '@reduxjs/toolkit';

export interface TreeState {
  nodes: Node[];
  lines: Line[];
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

interface Node extends Person, Positions {}

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
  },
});

export const actions = treeSlice.actions;

export default treeSlice.reducer;
