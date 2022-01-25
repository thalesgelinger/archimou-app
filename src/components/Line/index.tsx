import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

const ITEM_SIZE = 100;

interface Point {
  x: number;
  y: number;
}

interface Props {
  from: Point;
  to: Point;
}

export function Line({from, to}: Props) {
  const [width, setWidth] = useState(0);
  const [angle, setAngle] = useState(0);
  const isFromBackwardTo = from.x < to.x;
  const isFromAboveTo = from.y < to.y;

  const [center, setCenter] = useState<{x: number; y: number}>(
    {} as {x: number; y: number},
  );

  useEffect(() => {
    buildLineFromCoordinates();
  }, []);

  function buildLineFromCoordinates() {
    const oppositeLegg = getOppositeLegg();
    const adjascentLegg = getAdjascentLegg();

    const centerPoint = getCenterLinePoint(oppositeLegg, adjascentLegg);
    const lineWidth = getLineWidth(oppositeLegg, adjascentLegg);
    const lineAngle = getLineAngle(oppositeLegg, adjascentLegg);

    setAngle(lineAngle);
    setCenter(centerPoint);
    setWidth(lineWidth);
  }

  function getOppositeLegg() {
    return Math.abs(from.y - to.y);
  }

  function getAdjascentLegg() {
    return Math.abs(from.x - to.x);
  }

  function getCenterLinePoint(oppositeLegg: number, adjascentLegg: number) {
    const xEndCenter = to.x - ITEM_SIZE / 2;
    const yEndCenter = to.y - ITEM_SIZE / 2;

    let x = xEndCenter + adjascentLegg / 2 - 1;
    let y = yEndCenter + oppositeLegg;

    if (isFromBackwardTo) {
      x -= adjascentLegg;
    }
    if (isFromAboveTo) {
      y -= oppositeLegg;
    }

    const centerPoint = {x, y};
    return centerPoint;
  }

  function getLineWidth(oppositeLegg: number, adjascentLegg: number) {
    const adjascentSquare = Math.pow(adjascentLegg, 2);
    const oppositeSquare = Math.pow(oppositeLegg, 2);
    return Math.sqrt(adjascentSquare + oppositeSquare);
  }

  function getLineAngle(oppositeLegg: number, adjascentLegg: number) {
    const radAngle = Math.atan(oppositeLegg / adjascentLegg);
    let angle = radiansToDegrees(radAngle);

    if (isFromBackwardTo) {
      angle = 180 - angle;
    }
    if (isFromAboveTo) {
      angle = 180 - angle;
    }
    return angle;
  }

  function radiansToDegrees(radians: number) {
    return radians * (180 / Math.PI);
  }

  return (
    <>
      {!!width ? (
        <View
          style={
            {
              height: 2,
              width,
              backgroundColor: 'black',
              transform: [
                {
                  translateX: center.x,
                },
                {
                  translateY: center.y,
                },
                {
                  rotate: `${angle}deg`,
                },
              ],
            } as StyleSheet.NamedStyles<{}>
          }
        />
      ) : null}
    </>
  );
}
