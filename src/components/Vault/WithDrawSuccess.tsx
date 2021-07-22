import { Trans } from '@lingui/macro'
import { ButtonGradientBorder } from 'components/Button'
import Column, { AutoColumn } from 'components/Column'
import { RowCenter } from 'components/Row'
import { useActiveWeb3React } from 'hooks/web3'
import React from 'react'
import { useWithdrawState } from 'state/withdraw/hooks'
import { ExternalLink, SvgIconWrapper, TYPE } from 'theme'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'
import Success from '../../assets/images/success.svg'

export const WithdrawSuccess = ({ onClose }: { onClose: () => void }) => {
  const { tx } = useWithdrawState()
  const { chainId } = useActiveWeb3React()
  return (
    <div style={{ position: 'relative' }}>
      <Column>
        <RowCenter>
          <TYPE.title4>
            <Trans>Success</Trans>
          </TYPE.title4>
        </RowCenter>
        <RowCenter style={{ marginTop: '61px', marginBottom: '53px' }}>
          <SvgIconWrapper size={128}>
            <img src={Success} alt={'Success!'} />
          </SvgIconWrapper>
        </RowCenter>
        <AutoColumn gap="12px" justify={'center'}>
          {chainId && tx && (
            <ExternalLink href={getExplorerLink(chainId, tx, ExplorerDataType.TRANSACTION)}>
              <Trans>View on Etherscan</Trans>
            </ExternalLink>
          )}
          <ButtonGradientBorder
            onClick={() => onClose()}
            data-testid="widthdraw-success-close"
            style={{ width: '211px', marginBottom: '35px' }}
          >
            <Trans>Close</Trans>
          </ButtonGradientBorder>
        </AutoColumn>
      </Column>
    </div>
  )
}
