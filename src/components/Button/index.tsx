import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import {ButtonBox, ButtonText, ImageIcon} from './styles';

interface Props {
  label: string;
  icon?: any;
  color: string;
}

export const Button = ({label, icon, color, ...rest}: Props) => {
  return (
    <ButtonBox {...rest}>
      {icon && <ImageIcon source={icon} />}
      <ButtonText style={{color}}>{label}</ButtonText>
    </ButtonBox>
  );
};
