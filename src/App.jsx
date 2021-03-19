import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import {ThemeProvider} from "styled-components";
import  {useDarkMode} from "./components/useDarkMode"
import { GlobalStyle } from "./components/GlobalStyle";
import { lightTheme, darkTheme } from "./components/Themes"
import ApplicationRouter from './ApplicationRouter'

const App = () => {
  const { isLoading, error } = useAuth0();
  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  if (isLoading) return <div>loading</div>
  if (error) return <div>{error.message}</div>


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
