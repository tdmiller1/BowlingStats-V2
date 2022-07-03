import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Honeybadger, HoneybadgerErrorBoundary } from "@honeybadger-io/react";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./components/useDarkMode";
import { GlobalStyle } from "./components/GlobalStyle";
import { lightTheme, darkTheme } from "./components/Themes";
import ApplicationRouter from "./ApplicationRouter";
import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
});

Honeybadger.configure({
  apiKey: process.env.REACT_APP_HONEYBADGER_API_KEY,
  environment: process.env.NODE_ENV,
});

const App = () => {
  const { isLoading, error } = useAuth0();
  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;
  if (isLoading) return <div>loading</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <HoneybadgerErrorBoundary honeybadger={Honeybadger}>
      <ThemeProvider theme={themeMode}>
        <>
          <GlobalStyle />
          <div className="App">
            <ApplicationRouter theme={theme} toggleTheme={themeToggler} />
          </div>
        </>
      </ThemeProvider>
    </HoneybadgerErrorBoundary>
  );
};

export default App;
