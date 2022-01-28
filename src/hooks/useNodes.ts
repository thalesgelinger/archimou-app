import {Dimensions} from 'react-native';
import {useState, useEffect} from 'react';
import graph from '../../mocks/family_tree.json';

const ITEM_SIZE = 100;

interface Node {
  id: number;
  name: string;
  gender: 'M' | 'F';
  parents: number[];
  children: number[];
  partner: number;
  x: number;
  y: number;
  originX?: number;
  originY?: number;
}

interface Point {
  x: number;
  y: number;
}

interface Line {
  from: Point;
  to: Point;
}

export const useNodes = () => {
  const [mainNode, setMainNode] = useState<Node>({} as Node);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const {height} = Dimensions.get('window');

  useEffect(() => {
    const mainNode = getMainNodePosition();
    setMainNode(mainNode);
    setNodes([mainNode]);
  }, []);

  useEffect(() => {
    if (!!nodes.length) {
      const nodesToConsider = [...nodes].splice(2);
      const relationLinesMainNode = getRelationsLinesFromNode(mainNode, [
        ...nodesToConsider,
      ]);
      setLines([...relationLinesMainNode]);
    }
  }, [nodes]);

  function getMainNodePosition() {
    const node = {
      ...graph[0],
      x: height - ITEM_SIZE / 2,
      y: height - ITEM_SIZE / 2,
    } as Node;
    return node;
  }

  function distributeNodes(node: Node) {
    const partnerNode = getPartnerNode(node);
    const parentsNodes = getParentsNode(node);
    const childrenNodes = getChildrenNode(node);
    // const siblingsNodes = getSiblingsNode(node);

    setNodes([
      mainNode,
      partnerNode,
      ...parentsNodes,
      ...childrenNodes,
      // ...siblingsNodes
    ]);
  }

  function getPartnerNode(node: Node) {
    const partner = findPartnerNode(node);
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
    return graph.find(({id}) => id === node.partner);
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
    return graph.filter(({id}) => node.parents.includes(id));
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
    return graph.filter(({id}) => node.children.includes(id));
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

  return {nodes, lines, distributeNodes};
};
