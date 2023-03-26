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

const generateUsers = (amount: number, prevLength: number): IUser[] => {
  return Array.from(Array(amount)).map((_, i) => ({
    index: i + prevLength,
    id: faker.random.numeric(5),
    name: faker.name.fullName(),
    address: faker.address.streetAddress(true),
    tel: faker.phone.number(),
  }));
};

const random = (value: string): number =>
  value ? faker.datatype.number({ min: 0, max: value.length - 1 }) : 0;

const remove = (value: string): string => {
  const index = random(value);
  return value.substring(0, index) + value.substring(index + 1);
};

const add = (value: string): string => {
  const index = random(value);
  const index2 = random(value);

  return value.substring(0, index) + value[index2] + value.substring(index);
};

const reverse = (value: string): string => {
  const indexOne = random(value);
  const indexTwo = random(value);
  const symbolOne = value[indexOne];
  const symbolTwo = value[indexTwo];
  const arr = value.split("");
  arr[indexOne] = symbolTwo;
  arr[indexTwo] = symbolOne;
  return arr.join("");
};

const FIELDS = ["id", "name", "address", "tel"];
const addMistakes = (users: IUser[], mistakes: number): IUser[] => {
  if (mistakes) {
    return users.map((user) => {
      for (let i = 0; i < mistakes; i++) {
        const randomMethod = [remove, add, reverse][
          faker.datatype.number({ min: 0, max: 2 })
        ];
        const randomField = FIELDS[faker.datatype.number({ min: 0, max: 3 })];
        // @ts-ignore
        user[randomField] = randomMethod(user[randomField]);
      }

      return user;
    });
  }
  return users;
};

const initialState: IUserTableState = {
  seed: Math.floor(Math.random() * 999999),
  language: "ru",
  mistakes: 0,
  users: [],
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
      state.users = [
        ...state.users,
        ...addMistakes(generateUsers(10, state.users.length), state.mistakes),
      ];
    },
    initializeUsers: (state) => {
      state.users = addMistakes(generateUsers(20, 0), state.mistakes);
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
