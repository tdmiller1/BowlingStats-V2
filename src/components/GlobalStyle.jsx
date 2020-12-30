import { createGlobalStyle} from "styled-components"
export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
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
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline { border-color: ${({ theme }) => theme.sidePanelColor} !important; }
    .MuiOutlinedInput-notchedOutline { border-color: ${({ theme }) => theme.sidePanelColor} !important; }
    .MuiOutlinedInput-input { color: ${({ theme }) => theme.sidePanelColor} !important; }
    .MuiPaper-root { color: ${({ theme }) => theme.text}; background: ${({ theme }) => theme.body}; }
    .MuiButton-containedPrimary:hover { background-color: ${({ theme }) => theme.headerBackgroundColorDarker} !important; }
    .DayPicker-Weekday { color: ${({ theme }) => theme.sidePanelColor}; }
    .DayPicker-NavButton { color: ${({ theme }) => theme.sidePanelColor} !important; }
  }
  `
