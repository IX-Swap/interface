import { t, Trans } from '@lingui/macro'
import { ReactComponent as IXSToken } from 'assets/images/IXS-token.svg'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'
import Column from 'components/Column'
import { RowBetween, RowCenter } from 'components/Row'
import { TextRow } from 'components/TextRow/TextRow'
import { MouseoverTooltip } from 'components/Tooltip'
import React from 'react'
import { TextGradient, TYPE } from 'theme'
import { ButtonRow, StackingPositionCard } from './styleds'
import { ReactComponent as InfoIcon } from 'assets/images/attention.svg'

export const TokenCardWithStaking = () => {
  return (
    <StackingPositionCard>
      <RowCenter>
        <IconWrapper size={75}>
          <IXSToken />
        </IconWrapper>
      </RowCenter>
      <RowCenter marginTop={18}>
        <TYPE.body5>
          <Trans>Stacked IXS</Trans>
        </TYPE.body5>
      </RowCenter>
      <Column style={{ gap: '10px' }}>
        <TextRow textLeft={<Trans>Start stake</Trans>} textRight={'05.06.2021'} />
        <TextRow textLeft={<Trans>Annual Return</Trans>} textRight={'10%'} />
        <TextRow
          textLeft={<Trans>Total rewards</Trans>}
          textRight={
            <RowBetween style={{ gap: '5px' }}>
              <>50</>
              <TextGradient>
                <Trans>(manage)</Trans>
              </TextGradient>
            </RowBetween>
          }
        />
        <TextRow textLeft={<Trans>Total balance</Trans>} textRight={'200 IXS'} />
        <TextRow
          textLeft={
            <MouseoverTooltip text={t`Governance tokens give you the right to vote`}>
              <RowBetween>
                <Trans>Governance tokens</Trans>
                <IconWrapper size={20} style={{ transform: 'rotate(180deg)', marginLeft: '7px' }}>
                  <InfoIcon />
                </IconWrapper>
              </RowBetween>
            </MouseoverTooltip>
          }
          textRight={'250 IXSgov'}
        />
      </Column>
      <ButtonRow>
        <ButtonGradientBorder style={{ width: '172px' }}>Unstake</ButtonGradientBorder>
        <ButtonIXSGradient style={{ textTransform: 'unset', width: '172px' }}>Add asset</ButtonIXSGradient>
      </ButtonRow>
    </StackingPositionCard>
  )
}
