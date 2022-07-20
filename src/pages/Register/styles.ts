import styled from 'styled-components/native';
import {Button, EditButton} from '../../components';

export const Container = styled.SafeAreaView`
  padding: 10px;
`;

export const ContinueButton = styled(Button)`
  background-color: #8c59b5;
  justify-content: center;
  align-items: center;
`;

export const ProfileContainer = styled.TouchableOpacity`
  height: 236px;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const ProfilePicture = styled.Image`
  border-radius: 118px;
  position: absolute;
  z-index: -10;
  flex: 1;
  height: 200px;
  width: 200px;
`;

export const EditProfilePicture = styled(EditButton)`
  z-index: 10;
`;

export const FormContainer = styled.View`
  height: 45%;
  justify-content: space-evenly;
`;
