import styled from 'styled-components/native';

export const InputContainer = styled.TouchableOpacity`
  background: #ffffff;
  border: 2px solid #8c59b5;
  border-radius: 8px;
  width: 100%;
  justify-content: space-between;
  padding: 5px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #8c59b5;
  margin-left: 5px;
`;
export const OptionsList = styled.FlatList`
  width: 100%;
`;

export const OptionButton = styled.TouchableOpacity``;

export const Option = styled.Text`
  font-size: 20px;
  padding: 10px;
`;
