import {RootState} from './../store/store';
import {useSelector, useDispatch} from 'react-redux';
import {api} from './../services/api';
import {Dimensions} from 'react-native';
import {useState, useEffect, useCallback, useReducer} from 'react';
import {Storage} from '../services/Storage';
import {useTreeActions} from './useTreeActions';
import {fetchGraphArray} from '../store/slices/tree.slice';

const ITEM_SIZE = 100;

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

export const useNodes = () => {
  const [hash, setHash] = useState('');
  const [isCalculatingNodes, toggleIsLoading] = useReducer(s => !s, true);

  const {user, idToken} = useSelector((state: RootState) => state.user);

  const {nodes, lines} = useSelector((state: RootState) => state.tree);

  const graphData = useSelector((state: RootState) => state.tree.graph);

  const {setNodes, setLines} = useTreeActions();
  const [mainNode, setMainNode] = useState<Node>({} as Node);
  const {height} = Dimensions.get('window');

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('FIRST EFFECT');
    if (!!idToken) {
      setHash(user.idHash);
    }
  }, [idToken]);

  useEffect(() => {
    console.info('FETCH GRAPH', {hash});
    if (!!hash) {
      fetchGraph(hash);
    }
  }, [hash]);

  useEffect(() => {
    console.info('CHAMOU AQUI COM GRAPH DATA', {
      graphData: graphData.find(({descendant}) => descendant.length > 0),
      mainNode,
    });
    if (!!graphData?.length) {
      const mainNode = getMainNodePosition();
      const nodeUpdated = graphData.find(
        ({idHash}) => idHash === mainNode.idHash,
      )!;

      const node = {
        ...mainNode,
        ...nodeUpdated,
      };

      setMainNode(node);
    }
  }, [graphData]);

  useEffect(() => {
    console.log({mainNode});
    const distributedNodes = distributeNodes(mainNode);
    console.log({nodes, distributedNodes});
    setNodes([...nodes, ...distributedNodes].filter(n => !!n.idHash));
  }, [mainNode]);

  useEffect(() => {
    if (!!nodes.length) {
      console.log({nodes});

      const familiarNodesToConsider = (node: Node) => {
        const idsArray = [
          ...mainNode.parents.map(({idHash}) => idHash),
          ...mainNode.descendant.map(({idHash}) => idHash),
        ];

        return idsArray.includes(node.idHash);
      };

      const nodesToConsider = nodes.filter(familiarNodesToConsider);

      const relationLinesMainNode = getRelationsLinesFromNode(
        mainNode,
        nodesToConsider,
      );

      const linesToConsider = relationLinesMainNode.filter(newLine => {
        return !lines.some(line => {
          return (
            line.from.id === newLine.from.id && line.to.id === newLine.to.id
          );
        });
      });

      setLines([...lines, ...linesToConsider]);
    }
  }, [nodes]);

  useEffect(() => {
    if (!!lines.length) {
      toggleIsLoading();
    }
  }, [lines]);

  async function fetchGraph(idHash: string) {
    await dispatch(fetchGraphArray({idHash, idToken}));
  }

  function getMainNodePosition() {
    if (nodes.some(({idHash}) => idHash === hash)) {
      return nodes.find(({idHash}) => idHash === hash);
    }

    const me = graphData.find(({idHash}) => idHash === hash);

    const node = {
      ...me,
      x: height - ITEM_SIZE / 2,
      y: height - ITEM_SIZE / 2,
    } as Node;
    return node;
  }

  const distributeNodes = (node: Node) => {
    let partnerNode = getPartnerNode(node);
    const parentsNodes = getParentsNode(node);
    const childrenNodes = getChildrenNode(node);
    // const siblingsNodes = getSiblingsNode(node);

    const familiarNodes: Node[] = [];
    if (!nodes.map(({idHash}) => idHash).includes(hash)) {
      familiarNodes.push(mainNode);
    }
    // partnerNode && familiarNodes.push(partnerNode);
    parentsNodes.length && familiarNodes.push(...parentsNodes);
    childrenNodes.length && familiarNodes.push(...childrenNodes);

    return familiarNodes;
  };

  function getPartnerNode(node: Node) {
    const partner = findPartnerNode(node);
    if (!partner) return;
    const partnerNode = {
      ...partner,
      x: node.x + ITEM_SIZE,
      y: node.y,
      originX: node.x,
      originY: node.y,
    } as Node;
    return partnerNode;
  }

  function findPartnerNode(node: Node) {
    return graphData.find(({idHash}) => idHash === node.partner?.idHash);
  }

  function getParentsNode(node: Node) {
    const parents = findParentsNodes(node);

    const parentsNotAdded = parents.filter(
      parent => !nodes.some(({idHash}) => idHash === parent.idHash),
    );

    const parentsWithPosition = parentsNotAdded.map(parent => {
      const gendersPosition = {
        M: node.x - ITEM_SIZE / 2,
        F: node.x + ITEM_SIZE / 2,
      } as {[key: string]: number};

      return {
        ...parent,
        y: node.y - ITEM_SIZE * 2,
        x: gendersPosition[parent.gender],
        originX: node.x,
        originY: node.y,
      };
    });

    return parentsWithPosition;
  }

  function findParentsNodes(node: Node) {
    return graphData.filter(({idHash}) =>
      node.parents.some(parent => parent.idHash === idHash),
    );
  }

  function getChildrenNode(node: Node) {
    const allChildren = findChildrenNodes(node);

    const children = allChildren.filter(
      child => !nodes.some(({idHash}) => idHash === child.idHash),
    );

    const especificChildrenXPosition = isOdd(children.length)
      ? ITEM_SIZE * (children.length - 1)
      : (children.length - 1) * ITEM_SIZE;
    const childrenWithPosition = children.map((child, index) => {
      const xDefault = node.x + ITEM_SIZE * index * 2;
      const x = xDefault - especificChildrenXPosition;
      const yDefault = node.y + ITEM_SIZE * 2;
      const half = Math.floor((children.length - 1) / 2);
      const specificY =
        index <= half
          ? index * ITEM_SIZE
          : (children.length - 1 - index) * ITEM_SIZE;
      const y = yDefault + specificY;
      return {
        ...child,
        y,
        x,
        originX: node.x,
        originY: node.y,
      };
    });

    return childrenWithPosition;
  }

  function findChildrenNodes(node: Node) {
    return graphData.filter(({idHash}) =>
      node.descendant.some(children => children.idHash === idHash),
    );
  }

  function getRelationsLinesFromNode(node: Node, familiars: Node[]) {
    console.log({familiars});

    const familiarsLines = familiars.map(familiar => {
      console.log(`familiar ${familiar.idHash}: `, {
        from: {
          x: node.x,
          y: node.y,
          id: node.idHash,
        },
        to: {
          x: familiar.x,
          y: familiar.y,
          id: familiar.idHash,
        },
      });

      return {
        from: {
          x: node.x,
          y: node.y,
          id: node.idHash,
        },
        to: {
          x: familiar.x,
          y: familiar.y,
          id: familiar.idHash,
        },
      };
    });
    return familiarsLines;
  }

  function isOdd(num: number) {
    return num % 2 === 0;
  }

  return {isCalculatingNodes, distributeNodes, setNodeHash: setHash};
};
