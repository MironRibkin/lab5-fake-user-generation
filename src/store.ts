import { configureStore } from "@reduxjs/toolkit";
import { userTableSlice } from "./slice/userTableSlice";

export const store = configureStore({
  reducer: { [userTableSlice.name]: userTableSlice.reducer },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
