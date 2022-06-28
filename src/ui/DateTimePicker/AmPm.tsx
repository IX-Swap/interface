import React from 'react'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { addHours, format, subHours } from 'date-fns'

export const AmPmStyled = styled(Box)(
  ({ theme }) => `
  background-color: ${theme.palette.background.paper};
  width: 118px;
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
    border: none;
    border-bottom: 1px solid ${theme.palette.divider};
    background-color: transparent;
    outline: 0;
    cursor: pointer;
  }
  button:last-child {
    border-bottom-color: transparent;
  }
  button.selected {
    background-color: transparent;
  }
  button.selected::after {
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

export interface AmPmProps {
  date: Date
  onChange: (value: unknown) => void
}

export const AmPm = ({ date, onChange }: AmPmProps) => {
  const active = format(date, 'a')
  const selectAM = (_: any) => {
    if (active === 'PM') {
      onChange(subHours(date, 12))
    }
  }

  const selectPM = (_: any) => {
    if (active === 'AM') {
      onChange(addHours(date, 12))
    }
  }

  return (
    <AmPmStyled>
      <button onClick={selectAM} className={active === 'AM' ? 'selected' : ''}>
        AM
      </button>
      <button onClick={selectPM} className={active === 'PM' ? 'selected' : ''}>
        PM
      </button>
    </AmPmStyled>
  )
}
