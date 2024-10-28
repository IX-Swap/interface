import styled from 'styled-components'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import { InputBase } from '@mui/material'

export const Label = styled.label`
  color: #556;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;

  .desc {
    color: #8f8fb2;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.36px;
  }
`

export const InputWithLabel = styled(InputBase)`
  width: 100%;

  label + & {
    margin-top: 12px;
  }

  & .MuiInputBase-input {
    width: 100%;
    position: relative;
    border-radius: 6px;
    border: solid 1px #e6e6ff;
    background: #fff;
    font-size: 14px;
    padding: 16px;

    &:focus {
      box-shadow: rgba(0, 123, 255, 0.25) 0 0 0 0.2rem;
      border-color: #007bff;
    }
  }

  &.Mui-error .MuiInputBase-input {
    border-color: #f44336; /* Material-UI error color */
  }
`

export const FormWrapper = styled.div`
  margin-top: 24px;

  & > * + * {
    margin-top: 10px;
  }
`

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px; /* Adjust the gap between columns and rows */
`

export const FormControlLabel = styled(MuiFormControlLabel)`
  & .MuiFormControlLabel-label {
    color: #556;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.28px;
  }
`

export const ErrorText = styled.span`
  color: #f44336;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.36px;
`