import {createSlice} from '@reduxjs/toolkit';

export interface UserState {
  user: UserType;
  idToken: string;
}

export interface UserType {
  dateBirth: string;
  email: string;
  genre: string;
  idHash: string;
  idfirebase: string;
  name: string;
  photoUrl: string;
  picture: string;
}

export interface RequestRegisterBody {
  name: string;
  genre: string;
  birthDate: string;
  photoUrl: string;
}

const initialState: UserState = {
  user: {} as UserType,
  idToken: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser(state, {payload: user}) {
      state.user = user;
    },
    saveIdToken(state, {payload: idToken}) {
      state.idToken = idToken;
    },
    backToLogin(state) {
      state.idToken = '';
    },
  },
});

export const actions = userSlice.actions;

export default userSlice.reducer;
