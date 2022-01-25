import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {PinchGestureHandler} from 'react-native-gesture-handler';

export const InteractiveView = forwardRef(
  ({children, size}: {children: ReactNode}, ref) => {
    const pan = useRef(new Animated.ValueXY()).current;
    const scale = new Animated.Value(1);
    const {width, height} = Dimensions.get('window');

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          pan.setOffset({
            x: pan.x._value,
            y: pan.y._value,
          });
        },
        onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
        onPanResponderRelease: (_, gesture) => {
          pan.flattenOffset();
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
                backgroundColor: 'red',
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
