import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  padding: 10px;
`;

export const HeaderQuestion = styled.View`
  background-color: #8c59b5;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
`;

export const HeaderText = styled.Text`
  font-size: 20px;
  color: white;
`;

export const FamiliarTypesContainer = styled.View`
  height: 67%;
  justify-content: space-around;
`;
export const FamiliarTypesRow = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

export const FamiliarNodeButton = styled.Pressable`
  height: 120px;
  width: 120px;
  background-color: #8c59b5;
  opacity: ${props => (props.isSelected ? 0.6 : 1)};
  border-radius: 60px;
  align-items: center;
  justify-content: center;
`;

export const FamiliarNodeType = styled.Text`
  font-size: 20px;
  color: white;
`;
