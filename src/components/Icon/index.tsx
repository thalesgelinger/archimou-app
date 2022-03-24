import React from 'react';
import {SvgProps} from 'react-native-svg';

import {icons} from './iconPack';

export interface IconProps extends SvgProps {
  name: keyof typeof icons;
  size: number;
  color: string;
}

export const Icon = ({name, size, color, ...rest}: IconProps) => {
  const CustomIcom = icons[name];
  return <CustomIcom width={size} height={size} color={color} {...rest} />;
};
