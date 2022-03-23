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

const StyledChevron = styled(ChevronUp)<{ showMore: boolean }>`
  transform: ${({ showMore }) => (!showMore ? 'rotate(180deg)' : '')};
  transition: 0.4s;
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
        <StyledChevron
          size="20"
          color={theme.text2}
          style={{ marginLeft: '8px', height: '20px', minWidth: '20px' }}
          showMore={showMore}
        />
      </ButtonEmpty>
    </RowFixed>
  )
}
