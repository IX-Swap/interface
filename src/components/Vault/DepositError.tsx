import { Trans } from '@lingui/macro'
import { ButtonGradientBorder } from 'components/Button'
import Column from 'components/Column'
import { RowCenter } from 'components/Row'
import React from 'react'
import { useDepositState } from 'state/deposit/hooks'
import { SvgIconWrapper, TYPE } from 'theme'
import Attention from '../../assets/images/attention.svg'

export const DepositError = ({ onClose }: { onClose: () => void }) => {
  const { depositError } = useDepositState()
  return (
    <div style={{ position: 'relative' }}>
      <Column>
        <RowCenter>
          <TYPE.title4>
            <Trans>Error Occurred</Trans>
          </TYPE.title4>
        </RowCenter>
        <RowCenter style={{ marginTop: 61 }}>
          <SvgIconWrapper size={128}>
            <img src={Attention} alt={'Error'} />
          </SvgIconWrapper>
        </RowCenter>
        <RowCenter style={{ marginTop: 14, marginBottom: 53, textAlign: 'center' }}>
          <TYPE.error error={!!depositError}>{depositError}</TYPE.error>
        </RowCenter>
        <RowCenter style={{ marginBottom: 35 }}>
          <ButtonGradientBorder onClick={onClose} data-testid="close" style={{ width: '112px' }}>
            <Trans>Close</Trans>
          </ButtonGradientBorder>
        </RowCenter>
      </Column>
    </div>
  )
}
