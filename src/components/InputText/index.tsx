import {View, Text, TextInputProps} from 'react-native';
import React from 'react';
import {Input, InputContainer} from './styles';
import {IconProps, Icon} from '../Icon';

interface Props extends TextInputProps {
  icon?: IconProps;
}

export const InputText = ({icon, ...rest}: Props) => {
  return (
    <InputContainer>
      <Input {...rest} />
      {!!icon && <Icon name={icon.name} size={icon.size} color={icon.color} />}
    </InputContainer>
  );
};
