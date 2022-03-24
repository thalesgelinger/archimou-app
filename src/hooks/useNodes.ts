import {RootState} from './../store/store';
import {useSelector} from 'react-redux';
import {api} from './../services/api';
import {Dimensions} from 'react-native';
import {useState, useEffect} from 'react';
import {Storage} from '../services/Storage';
import {useTreeActions} from './useTreeActions';

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
  const user = useSelector((state: RootState) => state.user.user);

  const {nodes, lines} = useSelector((state: RootState) => state.tree);

  const {setNodes, setLines} = useTreeActions();

  const [graphData, setGraphData] = useState<Person[]>([]);
  const [mainNode, setMainNode] = useState<Node>({} as Node);
  const {height} = Dimensions.get('window');

  useEffect(() => {
    getGraphArray();
  }, []);

  useEffect(() => {
    if (!!graphData.length) {
      const mainNode = getMainNodePosition();
      setMainNode(mainNode);
      setNodes([mainNode]);
    }
  }, [graphData]);

  useEffect(() => {
    if (!!nodes.length) {
      const nodesToConsider = nodes.filter(
        node => node.idHash !== mainNode.idHash,
      );
      const relationLinesMainNode = getRelationsLinesFromNode(mainNode, [
        ...nodesToConsider,
      ]);
      setLines([...relationLinesMainNode]);
    }
  }, [nodes]);

  const getGraphArray = async () => {
    try {
      const token = await Storage.getStorageItem('token');

      const {data: graph} = await api.get(`/myTree/${user.idHash}`, {
        headers: {Authorization: 'Bearer ' + token},
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

      setGraphData(graphDataWithMappedParents);
    } catch ({response: error}) {
      console.error({error});
    }
  };

  function getMainNodePosition() {
    const me = graphData.find(({idHash}) => idHash === user.idHash);

    const node = {
      ...me,
      x: height - ITEM_SIZE / 2,
      y: height - ITEM_SIZE / 2,
    } as Node;
    return node;
  }

  async function distributeNodes(node: Node) {
    let partnerNode = getPartnerNode(node);
    const parentsNodes = getParentsNode(node);
    const childrenNodes = getChildrenNode(node);
    // const siblingsNodes = getSiblingsNode(node);

    const familiarNodes: Node[] = [];
    familiarNodes.push(mainNode);
    // partnerNode && familiarNodes.push(partnerNode);
    parentsNodes.length && familiarNodes.push(...parentsNodes);
    childrenNodes.length && familiarNodes.push(...childrenNodes);

    setNodes(familiarNodes);
  }

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

    const parentsWithPosition = parents.map(parent => {
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
    const children = findChildrenNodes(node);
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
    const familiarsLines = familiars.map(familiar => ({
      from: {
        x: node.x,
        y: node.y,
      },
      to: {
        x: familiar.x,
        y: familiar.y,
      },
    }));
    return familiarsLines;
  }

  function isOdd(num: number) {
    return num % 2 === 0;
  }

  return {nodes, lines, distributeNodes, getGraphArray};
};
