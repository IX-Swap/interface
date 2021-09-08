import { t, Trans } from '@lingui/macro'
import { ReactComponent as Attention } from 'assets/images/attention.svg'
import { ReactComponent as Clock } from 'assets/images/clock.svg'
import Row, { RowCenter } from 'components/Row'
import { MouseoverLightTooltip } from 'components/Tooltip'
import { IconWrapper } from 'pages/SecTokenDetails/styleds'
import React from 'react'
import { Box } from 'rebass'
import { TYPE } from 'theme'
import { AccreditationStatusEnum, VaultState } from './enum'
import { StatusTitle } from './styleds'

interface Props {
  status?: AccreditationStatusEnum
}
export const AccreditationStatus = ({ status }: Props) => {
  // todo link new statuses
  const info =
    status === AccreditationStatusEnum.PENDING
      ? {
          color: 'text1',
          text: t`Passing accreditation`,
          // eslint-disable-next-line react/display-name
          icon: () => <Clock />,
        }
      : {
          color: 'error',
          text: t`Rejected`,
          // eslint-disable-next-line react/display-name
          icon: () => null,
        }
  return (
    <RowCenter flexWrap="wrap">
      <StatusTitle>
        <Trans>Status:</Trans>
      </StatusTitle>
      <Box marginLeft="13px" display="flex" alignItems="center">
        <TYPE.titleSmall color={info.color}>{info.text}</TYPE.titleSmall>
        {info.icon() && (
          <Box marginLeft="9px" display="flex" justifyContent="center">
            <IconWrapper size={20}>{info.icon()}</IconWrapper>
          </Box>
        )}
      </Box>
    </RowCenter>
  )
}
