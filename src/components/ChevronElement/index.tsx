import React from 'react'
import { ButtonEmpty } from '../Button'
import { RowFixed } from '../Row'
import styled from 'styled-components'
import { ChevronUp } from 'react-feather'
import useTheme from 'hooks/useTheme'

interface Props {
  showMore: boolean
  setShowMore?: (arg0: boolean) => void
  marginLeft?: number
}

const StyledChevron = styled.div<{ open: boolean }>`
  height: 20px;
  min-width: 20px;
  > svg {
    height: 20px;
    min-width: 20px;
    transform: ${({ open }) => (!open ? 'rotate(180deg)' : '')};
    transition: 0.4s;
  }
`
export const ChevronElement = ({ showMore, setShowMore, marginLeft }: Props) => {
  const theme = useTheme()
  return (
    <RowFixed gap="8px">
      <ButtonEmpty
        type="button"
        data-testid="openTable"
        padding="6px 3px"
        borderRadius="12px"
        width="100%"
        onClick={() => {
          if (setShowMore) setShowMore(!showMore)
        }}
      >
        <StyledChevron open={showMore}>
        <ChevronUp style={{marginLeft: `${marginLeft}px`}} size="20" color={theme.text2} />
        </StyledChevron>
      </ButtonEmpty>
    </RowFixed>
  )
}
