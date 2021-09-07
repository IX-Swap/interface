import React, { useState } from 'react'
import styled from 'styled-components'

import { ButtonEmpty } from 'components/Button'
import Popover from 'components/Popover'

import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
import { Trans } from '@lingui/macro'
import { useKycReset } from 'state/admin/hooks'

interface Props {
  id: number
}

export const MoreActions = ({ id }: Props) => {
  const kycReset = useKycReset()
  const [isOpen, handleIsOpen] = useState(false)

  const toggle = () => handleIsOpen((state) => !state)
  const close = () => handleIsOpen(false)

  const startAgain = async () => {
    try {
      await kycReset(id)
      close()
    } catch (e) {}
  }

  const popOverContent = () => (
    <PopOverContent>
      <ButtonEmpty onClick={startAgain} padding="0" data-testid="start-again">
        <PopOverItem>
          <Trans>Start again</Trans>
        </PopOverItem>
      </ButtonEmpty>
    </PopOverContent>
  )

  return (
    <Popover show={isOpen} content={popOverContent()} placement="bottom" close={close}>
      <ButtonEmpty onClick={toggle} padding="0" data-testid="more">
        <StyledMenuIcon />
      </ButtonEmpty>
    </Popover>
  )
}

const StyledMenuIcon = styled(MenuIcon)`
  transform: rotate(90deg);
  > path {
    stroke: ${({ theme: { bg7 } }) => bg7};
  }
`

export const PopOverContent = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  padding: 15px 20px;
`

export const PopOverItem = styled.div`
  color: ${({ theme: { text2 } }) => text2};
  font-size: 14px;
`
