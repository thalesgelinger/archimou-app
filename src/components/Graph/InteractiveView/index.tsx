import React, {forwardRef, ReactNode, useImperativeHandle, useRef} from 'react';
import {Animated, PanResponder, SafeAreaView, StyleSheet} from 'react-native';
import {PinchGestureHandler} from 'react-native-gesture-handler';

export const InteractiveView = forwardRef(
  ({children, size, onMoving}: {children: ReactNode}, ref) => {
    const pan = useRef(new Animated.ValueXY()).current;
    const scale = new Animated.Value(1);

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          onMoving(true);
          pan.setOffset({
            x: pan.x._value,
            y: pan.y._value,
          });
        },
        onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
        onPanResponderRelease: (_, gesture) => {
          pan.flattenOffset();
        },
        onPanResponderEnd: () => {
          onMoving(false);
        },
      }),
    ).current;

    useImperativeHandle(ref, () => ({
      pan,
    }));

    const onPinchEvent = Animated.event(
      [
        {
          nativeEvent: {scale},
        },
      ],
      {
        useNativeDriver: true,
      },
    );

    return (
      <SafeAreaView>
        <PinchGestureHandler onGestureEvent={onPinchEvent}>
          <Animated.View
            style={
              {
                transform: [{translateX: pan.x}, {translateY: pan.y}, {scale}],
                backgroundColor: 'white',
                width: size,
                height: size,
              } as StyleSheet.NamedStyles<{}>
            }
            {...panResponder.panHandlers}>
            {children}
          </Animated.View>
        </PinchGestureHandler>
      </SafeAreaView>
    );
  },
);
