import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";

export interface IUser {
  index: number;
  id: string;
  name: string;
  address: string;
  tel: string;
}

interface IUserTableState {
  language: string;
  seed: number;
  mistakes: number;
  users: IUser[];
}

export const generateUsers = (amount: number, prevLength: number): IUser[] => {
  return Array.from(Array(amount)).map((_, i) => ({
    index: i + prevLength,
    id: faker.random.numeric(5),
    name: faker.name.fullName(),
    address: faker.address.streetAddress(true),
    tel: faker.phone.number("(###) ### ## ##"),
  }));
};

const initialState: IUserTableState = {
  seed: 0,
  language: "ru",
  mistakes: 0,
  users: [],
  // users: generateItems(20, 0),
};

export const userTableSlice = createSlice({
  name: "userTable",
  initialState,
  reducers: {
    setLanguage: (state, { payload }) => {
      state.language = payload;
    },
    setSeed: (state, { payload }) => {
      state.seed = payload;
    },
    setMistakes: (state, { payload }) => {
      state.mistakes = payload;
    },
    addAdditionalUsers: (state) => {
      // faker.mersenne.seed(state.seed + state.users.length);
      state.users = [
        ...state.users,
        // ...addErrorsToUsers(
        ...generateUsers(10, state.users.length),
        //     state.mistakes
        // ),
      ];
    },
    initializeUsers: (state) => {
      state.users = generateUsers(20, 0);
      // state.users = addErrorsToUsers(generateItems(20, 0), state.mistakes);
    },
  },
});

export const {
  setLanguage,
  setSeed,
  setMistakes,
  addAdditionalUsers,
  initializeUsers,
} = userTableSlice.actions;
