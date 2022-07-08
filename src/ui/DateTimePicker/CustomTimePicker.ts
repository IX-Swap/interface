import { styled } from '@mui/material/styles'
import TimePicker from 'react-time-picker'

export const CustomTimePicker = styled(TimePicker)(
  ({ theme }) => `
  width: 100%;
  .react-time-picker__wrapper{
    border: none;
  }
  input,
  button,
  select,
  .react-time-picker__inputGroup__leadingZero,
  option {
    font-family: ${theme.typography.fontFamily as string};
    font-weight: 500;
    font-size: 14px;
    color: ${theme.palette.text.primary};
    outline: none;
  }
  .react-time-picker__clear-button, .react-time-picker__inputGroup__amPm {
    display: none;
  }
`
)
