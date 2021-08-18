import { Trans } from '@lingui/macro'
import { ButtonIXSGradient } from 'components/Button'
import Column from 'components/Column'
import { IXS_ADDRESS } from 'constants/addresses'
import useTheme from 'hooks/useTheme'
import { useActiveWeb3React } from 'hooks/web3'
import React from 'react'
import { Box } from 'rebass'
import { useToggleStakeModal, useWalletModalToggle } from 'state/application/hooks'
import { StyledInternalLink, TYPE } from 'theme'
import { routes } from 'utils/routes'
import { StakingState } from './Staking'
import { TokenDescriptionWrapper, TokenStakingDescriptionNumbers } from './styleds'

export const StakingDescription = ({ stakingState }: { stakingState: StakingState }) => {
  const theme = useTheme()
  const toggleWalletModal = useWalletModalToggle()
  const toggleStakeModal = useToggleStakeModal()
  const { chainId, account } = useActiveWeb3React()
  return (
    <TokenDescriptionWrapper>
      <Column>
        <TYPE.descriptionThin>
          Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Mauris blandit aliquet elit, eget
          tincidunt nibh pulvinar a. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies
          ligula sed magna dictum porta. Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam
          vehicula elementum sed sit amet dui.
        </TYPE.descriptionThin>

        <TokenStakingDescriptionNumbers>
          <Column>
            <TYPE.titleSmall color={theme.text2} style={{ textTransform: 'uppercase' }}>
              Time
            </TYPE.titleSmall>
            <TYPE.title3>4 month - 4 years</TYPE.title3>
          </Column>
          <Column>
            <TYPE.titleSmall color={theme.text2} style={{ textTransform: 'uppercase' }}>
              Amount
            </TYPE.titleSmall>
            <TYPE.title3>4 month - 4 years</TYPE.title3>
          </Column>
          <Column>
            <TYPE.titleSmall color={theme.text2} style={{ textTransform: 'uppercase' }}>
              APY
            </TYPE.titleSmall>
            <TYPE.title3>8% - 10%</TYPE.title3>
          </Column>
        </TokenStakingDescriptionNumbers>
      </Column>
      <Box style={{ marginTop: '42px', justifySelf: 'flex-end' }}>
        {stakingState === StakingState.CONNECT_WALLET && (
          <ButtonIXSGradient onClick={toggleWalletModal} disabled={!!account} data-testid="connect-wallet-in-staking">
            <Trans>Connect Wallet</Trans>
          </ButtonIXSGradient>
        )}
        {stakingState === StakingState.NO_STAKE && account && chainId && (
          <ButtonIXSGradient
            style={{ width: '245px' }}
            data-testid="stake-ixs-modal-button"
            onClick={() => toggleStakeModal()}
          >
            <Trans>Stake</Trans>
          </ButtonIXSGradient>
        )}
      </Box>
    </TokenDescriptionWrapper>
  )
}
