import React, {useCallback, useState} from 'react';
import {
  Container,
  FamiliarNodeButton,
  FamiliarNodeType,
  FamiliarTypesContainer,
  FamiliarTypesRow,
  HeaderQuestion,
  HeaderText,
} from './styles';
import {BackButton, Dock} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {ContinueButton} from '../Register/styles';

export const KinshipSelection = ({route}) => {
  const {node} = route.params;

  const navigation = useNavigation();

  const [selectedKinship, setSelectedKinship] = useState('');

  const handleSelectFamiliarType = useCallback(
    (type: string) => () => {
      setSelectedKinship(type);
    },
    [],
  );

  const handleContinue = async () => {
    navigation.replace('Register', {
      kinship: selectedKinship,
      nodePressed: node,
    });
  };

  return (
    <>
      <Container>
        <BackButton navigate={navigation} />

        <HeaderQuestion>
          <HeaderText>
            Qual o parentesco dessa pessoa com {node.name}?
          </HeaderText>
        </HeaderQuestion>

        <FamiliarTypesContainer>
          <FamiliarTypesRow>
            <FamiliarNodeButton
              isSelected={selectedKinship === 'FATHER'}
              onPress={handleSelectFamiliarType('FATHER')}>
              <FamiliarNodeType>Pai</FamiliarNodeType>
            </FamiliarNodeButton>
            <FamiliarNodeButton
              isSelected={selectedKinship === 'MOTHER'}
              onPress={handleSelectFamiliarType('MOTHER')}>
              <FamiliarNodeType>Mãe</FamiliarNodeType>
            </FamiliarNodeButton>
          </FamiliarTypesRow>
          <FamiliarTypesRow>
            <FamiliarNodeButton
              isSelected={selectedKinship === 'BROTHER'}
              onPress={handleSelectFamiliarType('BROTHER')}>
              <FamiliarNodeType>Irmão</FamiliarNodeType>
            </FamiliarNodeButton>
            <FamiliarNodeButton
              isSelected={selectedKinship === 'SISTER'}
              onPress={handleSelectFamiliarType('SISTER')}>
              <FamiliarNodeType>Irmã</FamiliarNodeType>
            </FamiliarNodeButton>
          </FamiliarTypesRow>
          <FamiliarTypesRow>
            <FamiliarNodeButton
              isSelected={selectedKinship === 'SON'}
              onPress={handleSelectFamiliarType('SON')}>
              <FamiliarNodeType>Filho</FamiliarNodeType>
            </FamiliarNodeButton>
            <FamiliarNodeButton
              isSelected={selectedKinship === 'DAUGHTER'}
              onPress={handleSelectFamiliarType('DAUGHTER')}>
              <FamiliarNodeType>Filha</FamiliarNodeType>
            </FamiliarNodeButton>
          </FamiliarTypesRow>
        </FamiliarTypesContainer>

        <ContinueButton
          color="white"
          label="Continuar"
          onPress={handleContinue}
        />
      </Container>
      <Dock />
    </>
  );
};
