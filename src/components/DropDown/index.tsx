import {View, Text, FlatList} from 'react-native';
import React, {useReducer, useState} from 'react';
import {
  InputContainer,
  Option,
  OptionsList,
  Title,
  OptionButton,
  Header,
} from './styles';
import {IconProps, Icon} from '../Icon';
import {motify} from 'moti';

export const DropDown = ({title, options, onSelected}) => {
  const [isSelecting, toggleDropDown] = useReducer(s => !s, false);
  const [selectedOption, setSelectedOption] = useState<string>();

  const handleOptionSelect = option => () => {
    onSelected(option.value);
    setSelectedOption(option.label);
    toggleDropDown();
  };

  return (
    <InputContainer onPress={toggleDropDown}>
      <Header>
        <Title>{selectedOption ?? title}</Title>
        <Icon
          name="arrow"
          size={40}
          color="#8c59b5"
          style={{transform: [{rotate: isSelecting ? '180deg' : '0deg'}]}}
        />
      </Header>
      {isSelecting && (
        <OptionsList
          data={options}
          renderItem={({item: option}) => (
            <OptionButton onPress={handleOptionSelect(option)}>
              <Option>{option.label}</Option>
            </OptionButton>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </InputContainer>
  );
};
