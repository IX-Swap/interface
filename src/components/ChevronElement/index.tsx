import React from 'react'
import { ButtonEmpty } from '../Button'
import { RowFixed } from '../Row'
import styled from 'styled-components'
import { ReactComponent as DropdownIcon } from '../../assets/images/dropdownIcon.svg'

interface Props {
  showMore: boolean
  setShowMore?: (arg0: boolean) => void
}

const StyledChevron = styled.div<{ open: boolean }>`
  height: 20px;
  min-width: 20px;
  > svg {
    height: 20px;
    min-width: 20px;
    transform: ${({ open }) => (open ? 'rotate(180deg)' : '')};
    transition: 0.4s;
  }
`
export const ChevronElement = ({ showMore, setShowMore }: Props) => {
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
          <DropdownIcon style={{ width: '7px', height: '7px', marginLeft: '5px' }} />
        </StyledChevron>
      </ButtonEmpty>
    </RowFixed>
  )
}
