import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const AvatarBox = styled(Box)(
  ({ theme }) => `
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  width: 120px;
  border: 1px solid ${theme.palette.toggledInputs?.border ?? ''};
  border-radius: 8px;
  &:hover {
    border-color: ${theme.palette.toggledInputs?.borderHover ?? ''};
    background-color: transparent;
  }
  &.hasError,  &.isFileTooLarge  {
    border: 1px solid ${theme.palette.error.main};
  }
  &.isFileTooLarge {
    p.label {
      text-align: center; 
      color: ${theme.palette.error.main};
      padding: 0 20px;
    }
    svg {
      fill: ${theme.palette.error.main};
    }
  }
`
) as typeof Box
