import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { store } from "./store";
import { Provider } from "react-redux";
import { UserTable } from "./components/UserTable";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <UserTable />
    </Provider>
  </ThemeProvider>
);
