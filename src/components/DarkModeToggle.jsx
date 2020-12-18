import React from 'react'
import {Sun, Moon} from 'react-feather'
import { func, string } from 'prop-types';
import styled from "styled-components"

const Button = styled.button`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.inverted};
  border-radius: 30px;
  cursor: pointer;
  font-size:0.8rem;
  padding: 0.6rem;
  }
`;

const DarkModeToggle = ({theme, toggleTheme }) => {
    return (
        <Button onMouseDown={e => e.preventDefault()} onClick={toggleTheme} >
          {theme === 'dark' ? <Sun className={theme.toggleBorder} /> : <Moon className={theme.toggleBorder} />}
        </Button>
    );
};

DarkModeToggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}
export default DarkModeToggle;
