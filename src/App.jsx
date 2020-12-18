import React from "react";
import {ThemeProvider} from "styled-components";
import  {useDarkMode} from "./components/useDarkMode"
import { GlobalStyle } from "./components/GlobalStyle";
import { lightTheme, darkTheme } from "./components/Themes"
import ApplicationRouter from './ApplicationRouter'

const App = () => {
  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <>
      <GlobalStyle/>
        <div className="App">
          <ApplicationRouter theme={theme} toggleTheme={themeToggler} />
        </div>
      </>
    </ ThemeProvider>
  );
};

export default App;
