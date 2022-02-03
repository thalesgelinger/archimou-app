import React, {useState} from 'react';
import {DropDown, Icon, InputText} from '../../components';
import {Container} from './styles';
export const Register = () => {

  const handleSelectedOption =(optionValue) => {
    console.log({optionValue})
  }

  return (
    <Container>
      <InputText
        placeholder={'Name*'}
        icon={{name: 'person', size: 50, color: '#8c59b5'}}
      />
      <InputText
        placeholder={'Data de nascimento*'}
        icon={{name: 'person', size: 50, color: '#8c59b5'}}
      />
      <DropDown
        title={'Genero'}
        options={[
          {label: 'oi', value: '3'},
          {label: 'Tchau', value: '10'},
        ]}
        onSelected={handleSelectedOption}
      />
    </Container>
  );
};
