import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const TimePickerWrapper = styled(Box)(
  ({ theme }) => `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 16px;
  margin-bottom: 32px;
  background: ${theme.palette.background.paper};
  border: 1px solid ${theme.palette.toggledInputs?.border ?? '#DBE2EC'};
  box-sizing: border-box;
  border-radius: 8px;
  &:hover{
    border-color: ${theme.palette.toggledInputs?.borderHover ?? '#78A5FF'};
  }
  width: 100%;
  `
)
