import React from 'react'
import { ReactComponent as IconClock } from 'assets/images/clock.svg'
import { ReactComponent as IconPassed } from 'assets/images/passed.svg'
import { Box } from 'rebass'
import { Trans } from '@lingui/macro'
import { TYPE } from 'theme'
import styled from 'styled-components'
import { VaultState } from 'components/Vault/enum'

const StatusBox = styled(Box)`
  gap: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Status = ({ status }: { status: VaultState }) => {
  return (
    <>
      {status === VaultState.PENDING && (
        <StatusBox>
          <IconClock />
          <TYPE.status>
            <Trans>Passing KYC...</Trans>
          </TYPE.status>
        </StatusBox>
      )}
      {status === VaultState.APPROVED && (
        <StatusBox>
          <IconPassed />
          <TYPE.status>
            <Trans>Approved</Trans>
          </TYPE.status>
        </StatusBox>
      )}
    </>
  )
}
