// import React from 'react';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import Svg from 'react-native-svg';
import {NodeType} from '../../@types';
import {ConnectionLine} from '../ConnectionLine';
import {InteractiveView} from './InteractiveView';
import {useNavigation} from '@react-navigation/native';
import {TitleButton} from './styles';
import {GraphButton} from '../GraphButton';
import {Node} from '../Node';
import {useNodes} from '../../hooks/useNodes';

export function Graph() {
  const interactiveViewRef = useRef();
  const {width, height} = Dimensions.get('window');
  const {nodes, lines, distributeNodes, getGraphArray} = useNodes();

  const [nodePressed, setNodePressed] = useState<NodeType | null>();
  const [isMoving, setIsMoving] = useState(false);

  const {navigate, addListener} = useNavigation();

  useEffect(() => {
    // addListener('focus', getGraphArray);
    console.info('CHAMOU GRAPH ARRAY');
    getGraphArray();
  }, []);

  useEffect(() => {
    if (interactiveViewRef.current) {
      interactiveViewRef.current.pan.x.setValue(-height + width / 2);
      interactiveViewRef.current.pan.y.setValue(-height + height / 2);
    }
  }, [interactiveViewRef]);

  useEffect(() => {
    if (isMoving) {
      setNodePressed(null);
    }
  }, [isMoving]);

  function addFamiliarNodes(node: NodeType) {
    return () => {
      distributeNodes(node);
    };
  }

  const handleLongPress = (node: NodeType) => {
    return () => {
      setNodePressed(node);
    };
  };

  const handleAddNewFamiliar = () => {
    navigate('Kinship', {node: nodePressed});
    setNodePressed(null);
  };

  return (
    <InteractiveView
      size={height * 2}
      ref={interactiveViewRef}
      onMoving={setIsMoving}>
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
            {...node}
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
        {lines.map((line, index) => (
          <ConnectionLine key={index} {...line} />
        ))}
      </Svg>
    </InteractiveView>
  );
}
