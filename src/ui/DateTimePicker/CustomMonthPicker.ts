import { styled } from '@mui/material/styles'
import MonthPicker from '@mui/lab/MonthPicker'

export const CustomMonthPicker = styled(MonthPicker)(
  ({ theme }) => `
width: 118px;
height: 242px;
margin: 0;
overflow: auto;
display: block;
padding-right: 24px;
padding-left: 24px;
button {
  visibility: hidden;
  width: 100%;
  display: block;
  position: relative;
  color:  ${theme.palette.text.primary} !important;
  margin: 0;
  text-align: left;
  height: 44px;
}
button:disabled::before {
  color:  ${theme.palette.text.secondary} !important;
}
button::before{
  visibility: visible;
  display: block;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  line-height: 44px;
  font-size: 13px;
  font-weight: 500;
  border-bottom: 1px solid ${theme.palette.divider};
}
button:nth-child(1)::before {
  content: 'January';
}
button:nth-child(2)::before {
  content: 'February';
}
button:nth-child(3)::before {
  content: 'March';
}
button:nth-child(4)::before {
  content: 'April';
}
button:nth-child(5)::before {
  content: 'May';
}
button:nth-child(6)::before {
  content: 'June';
}
button:nth-child(7)::before {
  content: 'July';
}
button:nth-child(8)::before {
  content: 'August';
}
button:nth-child(9)::before {
  content: 'September';
}
button:nth-child(10)::before {
  content: 'October';
}
button:nth-child(11)::before {
  content: 'November';
}
button:nth-child(12)::before {
  content: 'December';
  border-bottom-color: transparent;
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
