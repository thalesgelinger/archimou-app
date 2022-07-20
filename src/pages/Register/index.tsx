import React, {useState} from 'react';
import {BackButton, Dock, DropDown, InputText} from '../../components';
import {
  Container,
  ContinueButton,
  FormContainer,
  ProfileContainer,
  ProfilePicture,
} from './styles';
import defaultUserImage from '../../assets/user-default.png';
import CameraRoll from '@react-native-community/cameraroll';
import {Image, ImageSourcePropType, Modal, ScrollView} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {api} from '../../services/api';
import {Storage} from '../../services/Storage';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {RequestRegisterBody, UserType} from '../../store/slices/user.slice';
import {useUserActions} from '../../hooks/useUserActions';
import {fetchGraphArray} from '../../store/slices/tree.slice';
import {useTreeActions} from '../../hooks/useTreeActions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
interface RouteParams {
  [key: string]: any;
  kinship: string;
}
interface Props {
  navigation?: NavigationProp<any>;
  route?: RouteProp<RouteParams>;
}

export const Register = ({navigation, route}: Props) => {
  const kinship = route?.params?.kinship ?? null;

  const [image, setImage] = useState<ImageSourcePropType>(
    {} as ImageSourcePropType,
  );
  const [showPhotos, setShowPhotos] = useState(false);
  const [photos, setPhotos] = useState([]);

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [genre, setGenre] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const {user, idToken} = useSelector((state: RootState) => state.user);

  const {saveUser} = useUserActions();

  const {setIsLoading} = useTreeActions();

  const dispatch = useDispatch();

  const handleEditImagePress = async () => {
    try {
      const {assets} = await launchImageLibrary({
        selectionLimit: 50,
        mediaType: 'photo',
      });
      const {uri = ''} = assets?.[0];
      console.log({uri});
      setImage({uri});
    } catch (e) {
      console.error(e);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    if (kinship) {
      await registerFamiliar();
    } else {
      await registerNewUser();
    }
    setIsLoading(false);
  };

  const register = async (body: RequestRegisterBody) => {
    try {
      const {data: user} = await api.post<UserType>(
        '/register/firebase',
        body,
        {
          headers: {Authorization: 'Bearer ' + idToken},
        },
      );
      saveUser(user);
      return true;
    } catch ({response: error}) {
      console.error(error);
      return false;
    }
  };

  const registerFamiliar = async () => {
    try {
      const token = await Storage.getStorageItem('token');
      const body = createBodyRequest();

      const {data: newUser} = await api.post('/register/anonimous', body, {
        headers: {Authorization: 'Bearer ' + token},
      });

      const requestBodyLinkPerson = {
        degree: kinship,
        idHashFrom: route?.params?.nodePressed.idHash,
        idHashTarget: newUser.idHash,
      };

      await api.post('/parent', requestBodyLinkPerson, {
        headers: {Authorization: 'Bearer ' + token},
      });
      await dispatch(fetchGraphArray({user, idToken}));
      navigation?.navigate('Home');
    } catch ({response: error}) {
      console.error(error);
    }
  };

  const createBodyRequest = () => {
    const requestBody = {
      name,
      birthDate: birthDate.replace(/\//g, '-'),
      genre,
      photoUrl,
    };
    return requestBody;
  };

  const registerNewUser = async () => {
    const requestBody = createBodyRequest();
    const response = await register(requestBody);
    if (response) {
      navigation?.navigate('Home');
    }
  };

  return (
    <>
      <Container>
        <BackButton navigate={navigation} />

        <ProfileContainer onPress={handleEditImagePress}>
          <ProfilePicture source={!!image?.uri ? image : defaultUserImage} />
        </ProfileContainer>

        {showPhotos && (
          <Modal>
            <ScrollView>
              {photos.map((p, i) => {
                return (
                  <Image
                    key={i}
                    style={{
                      width: 300,
                      height: 100,
                    }}
                    source={{uri: p.node.image.uri}}
                  />
                );
              })}
            </ScrollView>
          </Modal>
        )}

        <FormContainer>
          <InputText
            placeholder={'Nome*'}
            icon={{name: 'person', size: 40, color: '#8c59b5'}}
            onChangeText={setName}
          />
          <InputText
            placeholder={'Data de nascimento*'}
            icon={{name: 'calendar', size: 40, color: '#8c59b5'}}
            onChangeText={setBirthDate}
          />
          <DropDown
            title={'Genero'}
            options={[
              {label: 'Masculino', value: 'M'},
              {label: 'Feminino', value: 'F'},
            ]}
            onSelected={setGenre}
          />
        </FormContainer>

        <ContinueButton
          color="white"
          label="Registrar"
          onPress={handleRegister}
        />
      </Container>
      {kinship && <Dock />}
    </>
  );
};
