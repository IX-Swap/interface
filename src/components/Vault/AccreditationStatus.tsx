import { t, Trans } from '@lingui/macro'
import { ReactComponent as Attention } from 'assets/images/attention.svg'
import { ReactComponent as Clock } from 'assets/images/clock.svg'
import Row from 'components/Row'
import { MouseoverLightTooltip } from 'components/Tooltip'
import { IconWrapper } from 'pages/SecTokenDetails/styleds'
import React from 'react'
import { Box } from 'rebass'
import { TYPE } from 'theme'
import { VaultState } from './enum'
import { StatusTitle } from './styleds'

interface Props {
  status: VaultState
}
export const AccreditationStatus = ({ status }: Props) => {
  // todo link new statuses
  const info =
    status === VaultState.PENDING
      ? {
          color: 'text1',
          text: t`Passing accreditation`,
          // eslint-disable-next-line react/display-name
          icon: () => <Clock />,
          tooltip: t`Your accreditation is waiting for approval by Custodian`,
        }
      : {
          color: 'error',
          text: t`Accreditation is rejected`,
          // eslint-disable-next-line react/display-name
          icon: () => <Attention />,
          tooltip: t`Your accreditation is rejected! Please apply again`,
        }
  return (
    <Row width="fit-content" flexWrap="wrap">
      <StatusTitle>
        <Trans>Status:</Trans>
      </StatusTitle>
      <Box marginLeft="13px" display="flex" alignItems="center">
        <TYPE.titleSmall color={info.color}>{info.text}</TYPE.titleSmall>
        <MouseoverLightTooltip text={info.tooltip} placement={'top'}>
          <Box marginLeft="9px" display="flex" justifyContent="center">
            <IconWrapper size={20}>{info.icon()}</IconWrapper>
          </Box>
        </MouseoverLightTooltip>
      </Box>
    </Row>
  )
}
