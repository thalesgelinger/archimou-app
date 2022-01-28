import {
  View,
  Text,
  Dimensions,
  Touchable,
  Pressable,
  TouchableOpacityBase,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Image} from 'moti';

import searchImg from '../../assets/search.png';
import chatImg from '../../assets/chat.png';
import treeImg from '../../assets/tree.png';

export function Dock() {
  const {width} = Dimensions.get('window');
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
      }}>
      <View
        style={{
          flex: 1,
          display: 'flex',
          height: 50,
          width: width - 20,
          backgroundColor: '#8C59B5',
          borderRadius: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          paddingHorizontal: 16,
          position: 'relative',
          overflow: 'visible',
          elevation: 5,
        }}>
        <TouchableOpacity>
          <Image source={searchImg} style={{height: 30, width: 30}} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            elevation: 5,
            backgroundColor: '#8C59B5',
            padding: 10,
            height: 80,
            width: 80,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
            position: 'absolute',
            left: width / 2 - 50,
            top: -50,
            zIndex: 10,
            overflow: 'visible',
          }}>
          <Image source={treeImg} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={chatImg} style={{height: 30, width: 30}} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
