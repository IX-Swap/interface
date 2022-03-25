import { styled } from '@mui/material/styles'
import YearPicker from '@mui/lab/YearPicker'

export const CustomYearPicker = styled(YearPicker)(
  ({ theme }) => `
  background-color: ${theme.palette.background.paper};
  width: 118px;
  height: 242px;
  margin: 0;
  display: block;
  padding-right: 24px;
  padding-left: 24px;
  button {
    border-radius: 0;
    width: 100%;
    display: block;
    color:  ${theme.palette.text.primary} !important;
    margin: 0;
    text-align: left;
    height: 44px;
    position: relative;
    border-bottom: 1px solid ${theme.palette.divider};
  }
  > :last-child {
    button {
      border-bottom-color: transparent;
    }
  }
  button.Mui-selected {
    background-color: transparent;
  }
  button.Mui-selected::after {
    content: '';
    display: block;
    width: 11px;
    height: 6px;
    border: 1px solid${theme.palette.success.main};;
    border-top-color: transparent;
    border-right-color: transparent;
    transform: rotate(-45deg);
    position: absolute;
    right: 6px;
    z-index: 1000000;
    top: 15px;
    visibility: visible;
  }
  `
)
