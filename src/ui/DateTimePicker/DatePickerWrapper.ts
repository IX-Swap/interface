import { styled } from '@mui/material/styles'
import { Paper } from '@mui/material'

export const DatePickerWrapper = styled(Paper)(
  ({ theme }) => `
    max-width: 320px;
    padding-top: 32px;
    padding-bottom: 32px;
    border: 1px solid ${theme.palette.toggledInputs?.border ?? '#DBE2EC'};
    box-sizing: border-box;
  `
)
