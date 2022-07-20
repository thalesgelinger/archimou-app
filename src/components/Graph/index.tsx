import React, {
  ElementRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {ActivityIndicator, Dimensions, Text, View} from 'react-native';
import Svg from 'react-native-svg';
import {ConnectionLine} from '../ConnectionLine';
import {InteractiveView} from './InteractiveView';
import {useNavigation} from '@react-navigation/native';
import {Container, TitleButton} from './styles';
import {GraphButton} from '../GraphButton';
import {ITEM_SIZE, Node} from '../Node';
import {useNodes} from '../../hooks/useNodes';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {Node as NodeType} from '../../store/slices/tree.slice';

type interactiveViewHandler = ElementRef<typeof InteractiveView>;

export function Graph() {
  const interactiveViewRef = useRef<interactiveViewHandler>();
  const {width, height} = Dimensions.get('window');
  const {nodes, lines, isFetchingGraph} = useSelector(
    (state: RootState) => state.tree,
  );
  const {distributeNodes} = useNodes();

  const [nodePressed, setNodePressed] = useState<NodeType | null>();

  const {navigate, addListener} = useNavigation();

  const initialPositionCenter = {
    x: -height + width / 2,
    y: -height + height / 2,
  };

  const isMoving = !!interactiveViewRef.current?.isMoving;

  console.log({isMoving});

  useEffect(() => {
    if (interactiveViewRef.current) {
      interactiveViewRef.current.pan.x.set(initialPositionCenter.x);
      interactiveViewRef.current.pan.y.set(initialPositionCenter.y);
    }
  }, [interactiveViewRef]);

  useEffect(() => {
    if (isMoving) {
      setNodePressed(null);
    }
  }, [isMoving]);

  function addFamiliarNodes(node: NodeType) {
    return () => {
      centerNode(node);
      distributeNodes(node);
    };
  }

  const centerNode = (node: NodeType) => {
    const screenCenter = {
      x: width / 2 - ITEM_SIZE / 2,
      y: height / 2 - ITEM_SIZE / 2,
    };

    interactiveViewRef.current?.pan.x.set(-node.x + screenCenter.x);
    interactiveViewRef.current?.pan.y.set(-node.y + screenCenter.y);
  };

  const handleLongPress = (node: NodeType) => {
    return () => {
      setNodePressed(node);
    };
  };

  const handleAddNewFamiliar = () => {
    navigate('Kinship', {node: nodePressed});
    setNodePressed(null);
  };

  const getRandomKey = useCallback(Math.random, []);

  return (
    <InteractiveView size={height * 2} ref={interactiveViewRef}>
      {nodes.map((node, index) => (
        <>
          {!!nodePressed && !isMoving && (
            <GraphButton
              x={nodePressed.x}
              y={nodePressed.y - 150}
              originX={nodePressed.x}
              originY={nodePressed.y}
              color="#8c59b5">
              <TitleButton>Perfil</TitleButton>
            </GraphButton>
          )}
          <Node
            key={index}
            name={node.name}
            x={node.x}
            y={node.y}
            gender={node.gender}
            originX={node.originX}
            originY={node.originY}
            onLongPress={handleLongPress(node)}
            onPress={addFamiliarNodes(node)}
          />
          {!!nodePressed && !isMoving && (
            <GraphButton
              x={nodePressed.x}
              y={nodePressed.y + 150}
              originX={nodePressed.x}
              originY={nodePressed.y}
              color="#8c59b5"
              onPress={handleAddNewFamiliar}>
              <TitleButton>+</TitleButton>
            </GraphButton>
          )}
        </>
      ))}
      <Svg height={height * 2} width={height * 2}>
        {lines.map(line => (
          <ConnectionLine key={line.to.x / line.to.y} {...line} />
        ))}
      </Svg>
    </InteractiveView>
  );
}
