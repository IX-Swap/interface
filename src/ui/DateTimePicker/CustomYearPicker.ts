import { styled } from '@mui/material/styles'
import YearPicker from '@mui/lab/YearPicker'

export const CustomYearPicker = styled(YearPicker)(
  ({ theme }) => `
  background-color: ${theme.palette.background.paper};
  width: 118px;
  height: 242px;
  margin: 0;
  display: block;
  `
)
