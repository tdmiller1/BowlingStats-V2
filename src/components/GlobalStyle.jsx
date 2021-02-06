import { createGlobalStyle} from "styled-components"
export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    // transition: all 0.50s linear;
    tr:nth-child(even) {background:${({ theme }) => theme.evenRowBackground}};
    tr:nth-child(odd) {background: ${({ theme }) => theme.oddRowBackground}};
    th { color: ${({ theme }) => theme.headerFontColor} !important; background: ${({ theme }) => theme.body} };
    td { color: ${({ theme }) => theme.tableColor} !important};
    .MuiButtonBase-root { color: ${({ theme }) => theme.text} !important };
    .MuiTableCell-root { border: none };
    .iconButton { color: ${({ theme }) => theme.text} };
    .themedToolbar { background-color: ${({ theme }) => theme.headerBackgroundColor}; color: ${({ theme }) => theme.text}; }
    .MuiButton-contained { background-color: ${({ theme }) => theme.headerBackgroundColor}; color: ${({ theme }) => theme.text}; };
    .SidePanel { background-color: ${({ theme }) => theme.sidePanelBackgroundColor}; };
    .SidePanel-DayPicker { background-color: ${({ theme }) => theme.calendarBackground}; color: ${({ theme }) => theme.sidePanelColor}; };
    .DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover { background-color: ${({ theme }) => theme.hover} !important; }
    .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) { background-color: ${({ theme }) => theme.selected} !important; }
    .DayPicker-Day--today { color: ${({ theme }) => theme.calendarToday} }
    .DayPicker-Day--disabled { color: ${({ theme }) => theme.calendarToday} }
    .MuiButton-containedPrimary:hover { background-color: ${({ theme }) => theme.headerBackgroundColorDarker} !important; }
    .iconButton-trash { color: ${({ theme }) => theme.headerBackgroundColor} !important; }
    .iconButton-accept { color: ${({ theme }) => theme.acceptColor} !important; }
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline { border-color: ${({ theme }) => theme.sidePanelColor} !important; }
    .MuiOutlinedInput-notchedOutline { border-color: ${({ theme }) => theme.sidePanelColor} !important; }
    .MuiOutlinedInput-input { color: ${({ theme }) => theme.sidePanelColor} !important; }
    .MuiPaper-root { color: ${({ theme }) => theme.text}; background: ${({ theme }) => theme.sidePanelBackgroundColor}; }
    .MuiButton-containedPrimary:hover { background-color: ${({ theme }) => theme.headerBackgroundColorDarker} !important; }
    .DayPicker-Weekday { color: ${({ theme }) => theme.sidePanelColor}; }
    .DayPicker-NavButton { color: ${({ theme }) => theme.sidePanelColor} !important; }
    .MuiBottomNavigation-root { background-color: ${({ theme }) => theme.body}; color: ${({ theme }) => theme.sidePanelColor} !important; }
    .MuiBottomNavigationAction-wrapper.not(.Mui-selected) { background-color: ${({ theme }) => theme.calendarBackground}; color: ${({ theme }) => theme.sidePanelColor} !important; }
    .MuiTableCell-stickyHeader { color: ${({ theme }) => theme.headerFontColor} !important; background: ${({ theme }) => theme.body} }
    .Mui-selected { color: ${({ theme }) => theme.headerBackgroundColor } !important };
    .MuiBottomNavigationAction-iconOnly { color: ${({ theme }) => theme.sidePanelColor} !important; };
    .Profile-Section { background-color: ${({ theme }) => theme.oddRowBackground} !important; color: ${({ theme }) => theme.text} };
    .LandingPage-figureOneTitle { color: ${({ theme }) => theme.sidePanelColor}};
    .LandingPage-logoText { color: ${({ theme }) => theme.sidePanelColor}};
    .LandingPage-login { color: ${({ theme }) => theme.sidePanelColor} !important; };
    .LandingPage-paragraph { color: ${({ theme }) => theme.sidePanelColor}};
    .LandingPage-link { color: ${({ theme }) => theme.sidePanelColor} !important; };
    .MuiInputBase-input { border-color: ${({ theme }) => theme.body} !important; };
    .Mui-focused { color: ${({ theme }) => theme.headerBackgroundColor} !important };
    .MuiInputBase-root { color: ${({ theme }) => theme.headerBackgroundColor} !important; };
    .MuiOutlinedInput-input { border-color: ${({ theme }) => theme.headerBackgroundColor} };
    .MuiOutlinedInput-notchedOutline { border-color: ${({ theme }) => theme.headerBackgroundColor} !important; };
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {border-color: ${({ theme }) => theme.headerBackgroundColor} !important; };
    .MuiInputLabel-outlined { color: ${({ theme }) => theme.headerBackgroundColor} !important; };
  }
  `
