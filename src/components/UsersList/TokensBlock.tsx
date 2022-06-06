import React, { useMemo } from 'react'
import styled, { css } from 'styled-components'

import { ReactComponent as DeleteIcon } from 'assets/images/cross.svg'

export type Option = { label: string; value: string; icon: JSX.Element }

interface Props {
  onRemove: (value: Option[]) => void
  initialItems: Array<Option>
  currentItems: Array<Option>
}

export const TokensBlock = ({ onRemove, initialItems, currentItems }: Props) => {
  const items = useMemo(() => {
    const data = [...initialItems, ...currentItems] as Array<Option>
    // remove duplicates
    return data.filter(({ value }, index) => data.findIndex((el) => el.value === value) === index)
  }, [initialItems, currentItems])

  const onClickRemove = (value: string) => {
    const data = [...currentItems].filter((el) => el.value !== value)

    onRemove(data)
  }

  const isItemDisabled = (value: string) => {
    return !currentItems.find((el) => el.value === value)
  }

  return (
    <Container>
      <Title>Managed Tokens:</Title>
      {!items.length && <NoTokens>No tokens</NoTokens>}
      {items.map(({ label, value, icon }) => (
        <Item key={value} disabled={isItemDisabled(value)}>
          {icon}
          <Label>{label}</Label>
          <DeleteIcon onClick={() => !isItemDisabled(value) && onClickRemove(value)} style={{ cursor: 'pointer' }} />
        </Item>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.text9};
  border-radius: 12px;
  padding: 12px;
`
const Title = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.text2};
`

const NoTokens = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 500;
`

const Item = styled.div<{ disabled: boolean }>`
  padding: 4px 16px 4px 12px;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.bg11};
  border-radius: 32px;
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.4;
    `}
`
const Label = styled.div`
  margin: 0px 12px 0px 4px;
`
