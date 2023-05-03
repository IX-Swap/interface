import React from 'react'
import styled from 'styled-components'

import { IssuanceTooltip } from '../shared/fields/IssuanceTooltip'

interface StrategyCardProps {
  field: string
  id: string
  setter: (field: string, value: string) => void
  touch?: (field: string, touched: boolean) => void
  option: string
  text: string
  tooltipContent: string
  checked: boolean
  disabled: boolean
}

export const StrategyCard = ({
  field,
  id,
  setter,
  touch,
  option,
  text,
  tooltipContent,
  checked,
  disabled,
}: StrategyCardProps) => {
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return
      setter(field, e.target.value)
      if (touch) {
        setTimeout(() => {
          if (touch) touch(field, true)
        })
      }
    },
    [disabled, setter, touch, field]
  )
  return (
    <Card htmlFor={option} checked={checked} disabled={disabled}>
      <DisplayFlexRow>
        <RadioButton
          name={field}
          id={id}
          type="radio"
          value={option}
          onChange={onChange}
          disabled={disabled}
          checked={checked}
        />
        <IssuanceTooltip tooltipContent={tooltipContent} />
      </DisplayFlexRow>
      <OfferingText checked={checked}>{text}</OfferingText>
    </Card>
  )
}

const OfferingText = styled.text<{ checked: boolean }>`
  font-size: 14px;
  margin-top: 20px;
  margin-left: 6px;
  line-height: 160%;
  font-weight: 500;
  color: ${({ theme, checked }) => (checked ? theme.launchpad.colors.text.title : theme.launchpad.colors.text.hint)};
`

const DisplayFlexRow = styled.div`
  display: flex;
  justify-content: space-between;
`

const Card = styled.label<{ htmlFor: string; checked: boolean; disabled: boolean }>`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  justify-content: flex-start;
  justify-items: start;
  padding: 20px;
  height: 151px;
  color: #000;
  border: 1px solid;
  border-color: ${({ theme, checked }) =>
    checked ? theme.launchpad.colors.primary : theme.launchpad.colors.border.default};
  border-radius: 10px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`

const RadioButton = styled.input<{ disabled: boolean }>`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  background: #fff;
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  height: 16px;
  width: 16px;
  border-radius: 50%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease-out;

  &:checked::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    background-color: #fff;
    border: 6px solid;
    border-radius: 50%;
    border-color: ${(props) => props.theme.launchpad.colors.primary};
  }

  &:checked {
    background-color: #fff;
    border: none;
  }
`
