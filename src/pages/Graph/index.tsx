import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import graph from '../../../mocks/family_tree.json';
import {Line, Node} from '../../components';
import {useNodes} from '../../hooks/useNodes';
import {InteractiveView} from './InteractiveView';

const ITEM_SIZE = 100;

export function Graph() {
  const interactiveViewRef = useRef();
  const {width, height} = Dimensions.get('window');
  const {nodes, lines} = useNodes();

  useEffect(() => {
    if (interactiveViewRef.current) {
      interactiveViewRef.current.pan.x.setValue(-height + width / 2);
      interactiveViewRef.current.pan.y.setValue(-height + height / 2);
    }
  }, [interactiveViewRef]);

  return (
    <InteractiveView size={height * 2} ref={interactiveViewRef}>
      {nodes.map(({x, y, name}) => (
        <Node key={name} x={x} y={y} name={name} />
      ))}
      {lines.map(({from, to}) => (
        <Line from={from} to={to} />
      ))}
    </InteractiveView>
  );
}
