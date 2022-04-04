import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'

export const CustomButton = styled(Button)(
  ({ theme }) => `
  text-align: left;
  padding-left: 0;
  padding-right: 0;
  color: ${theme.palette.text.primary};
  justify-content: space-between;
  min-width: 48px;
  svg {
    fill: ${theme.palette.text.primary};
    margin-left: 6px;
  }
  :hover {
    background-color: transparent;
    color: ${theme.palette.text.primary};
    svg {
      fill: ${theme.palette.text.primary};
    }
  }
  `
)
