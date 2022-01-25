import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import Svg, {Line} from 'react-native-svg';
import graph from '../../../mocks/family_tree.json';
import {Node} from '../../components';
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
      <Svg height={height * 2} width={height * 2}>
        {lines.map(({from, to}, index) => {
          const x1 = from.x + ITEM_SIZE / 2;
          const y1 = from.y + ITEM_SIZE / 2;
          const x2 = to.x + ITEM_SIZE / 2;
          const y2 = to.y + ITEM_SIZE / 2;
          const points = {x1, y1, x2, y2};
          return (
            <Line {...points} key={index} stroke="black" strokeWidth="2" />
          );
        })}
      </Svg>
    </InteractiveView>
  );
}
