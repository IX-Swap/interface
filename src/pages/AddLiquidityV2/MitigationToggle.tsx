import { Trans } from '@lingui/macro'
import QuestionHelper from 'components/QuestionHelper'
import { RowBetween, RowFixed } from 'components/Row'
import Toggle from 'components/Toggle'
import useTheme from 'hooks/useTheme'
import React from 'react'
import { TYPE } from 'theme'

export const MitigationToggle = ({
  active,
  toggle,
  disabled = false,
}: {
  active: boolean
  toggle: () => void
  disabled?: boolean
}) => {
  const theme = useTheme()
  return (
    <RowBetween>
      <RowFixed>
        <TYPE.black fontWeight={400} fontSize={16} color={theme.text2}>
          <Trans>Enable Mitigation</Trans>
        </TYPE.black>
        <QuestionHelper
          text={
            <Trans>
              if the transaction price deviates too far from the time-weighted average price, the transaction will be
              blocked
            </Trans>
          }
        />
      </RowFixed>
      <Toggle id="toggle-enable-mitigation-button" isActive={active} disabled={disabled} toggle={toggle} />
    </RowBetween>
  )
}
