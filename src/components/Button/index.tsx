import React from 'react';
import {ButtonBox, ButtonText, ImageIcon} from './styles';

interface Props {
  label: string;
  icon?: any;
}

export const Button = ({label, icon, ...rest}: Props) => {
  return (
    <ButtonBox {...rest}>
      {icon && <ImageIcon source={icon} />}
      <ButtonText>{label}</ButtonText>
    </ButtonBox>
  );
};
