import React from 'react'
import { ChevronUp } from 'react-feather'
import { ButtonEmpty } from '../Button'
import { RowFixed } from '../Row'

import useTheme from 'hooks/useTheme'
import styled from 'styled-components'

interface Props {
  showMore: boolean
  setShowMore?: (arg0: boolean) => void
}

const StyledChevron = styled.div<{ open: boolean }>`
  height: 20px;
  min-width: 20px;
  > svg {
    margin-left: 8px;
    height: 20px;
    min-width: 20px;
    transform: ${({ open }) => (!open ? 'rotate(180deg)' : '')};
    transition: 0.4s;
  }
`
export const ChevronElement = ({ showMore, setShowMore }: Props) => {
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
          <ChevronUp size="20" color={theme.text2} />
        </StyledChevron>
      </ButtonEmpty>
    </RowFixed>
  )
}
