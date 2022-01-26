import {MotiView} from 'moti';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import Svg, {Line} from 'react-native-svg';
import graph from '../../../mocks/family_tree.json';
import {NodeType} from '../../@types';
import {Node} from '../../components';
import {ConnectionLine} from '../../components/ConnectionLine';
import {useNodes} from '../../hooks/useNodes';
import {InteractiveView} from './InteractiveView';

export function Graph() {
  const interactiveViewRef = useRef();
  const {width, height} = Dimensions.get('window');
  const {nodes, lines, distributeNodes} = useNodes();

  useEffect(() => {
    if (interactiveViewRef.current) {
      interactiveViewRef.current.pan.x.setValue(-height + width / 2);
      interactiveViewRef.current.pan.y.setValue(-height + height / 2);
    }
  }, [interactiveViewRef]);

  function addFamiliarNodes(node: NodeType) {
    return () => {
      distributeNodes(node);
    };
  }

  return (
    <InteractiveView size={height * 2} ref={interactiveViewRef}>
      {nodes.map((node, index) => (
        <Node
          key={index}
          {...node}
          onLongPress={() => {}}
          onPress={addFamiliarNodes(node)}
        />
      ))}
      <Svg height={height * 2} width={height * 2}>
        {lines.map((line, index) => (
          <ConnectionLine key={index} {...line} />
        ))}
      </Svg>
    </InteractiveView>
  );
}
