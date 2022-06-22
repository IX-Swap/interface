import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const FileUploadBox = styled(Box)(
  ({ theme }) => `
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  height: 80px;
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
      color: ${theme.palette.error.main};
    }
    svg {
      fill: ${theme.palette.error.main};
      
    }
  }
  .MuiLinearProgress-root {
    background-color: transparent;
  }
`
) as typeof Box
