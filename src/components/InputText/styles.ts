import styled from 'styled-components/native';

export const InputContainer = styled.View`
  flex-direction: row;
  background: #ffffff;
  border: 2px solid #8c59b5;
  border-radius: 8px;
  width: 100%;
  justify-content: space-between;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#8c59b5',
})`
  font-size: 24px;
`;
