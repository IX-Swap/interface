import { styled } from '@mui/material/styles'
import CalendarPicker from '@mui/lab/CalendarPicker'

export const CustomCalendarPicker = styled(CalendarPicker)`
  margin: 0;
  > div:first-child {
    display: none;
  }
`
