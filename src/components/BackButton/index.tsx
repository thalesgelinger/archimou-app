import React from 'react';
import {Icon} from '../Icon';
import {BackButtonContainer} from './styles';
import {NavigationProp} from '@react-navigation/native';
import {useUserActions} from '../../hooks/useUserActions';

interface Props {
  navigate: NavigationProp<any>;
}

export const BackButton = ({navigate}: Props) => {
  const {backToLogin} = useUserActions();

  const handleBackButtonPress = () => {
    if (navigate?.canGoBack()) {
      navigate.goBack();
    } else {
      backToLogin();
    }
  };

  return (
    <BackButtonContainer onPress={handleBackButtonPress}>
      <Icon
        name="arrow"
        size={40}
        color="#8c59b5"
        style={{transform: [{rotate: '90deg'}]}}
      />
    </BackButtonContainer>
  );
};
