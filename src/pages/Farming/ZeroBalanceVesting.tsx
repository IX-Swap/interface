import { Trans } from '@lingui/macro'
import { ButtonPinkBorder } from 'components/Button'
import useTheme from 'hooks/useTheme'
import React from 'react'
import { Text } from 'rebass'
import { VestingTextWrapper, YourAddressWrapper, YourAddress, Address, NoVestingCustomAddress } from './styleds'
import { ReactComponent as ExternalBright } from 'assets/images/external-bright.svg'
import { IconWrapperWithBg } from 'components/AccountDetails/styleds'
import { ExternalLink } from 'theme'
import { shortenAddress } from 'utils'
import { useWeb3React } from '@web3-react/core'
import { useVestingState } from 'state/vesting/hooks'

export const ZeroBalanceVesting = () => {
  const theme = useTheme()
  const { account } = useWeb3React()
  const { customVestingAddress } = useVestingState()

  if (customVestingAddress) {
    return (
      <NoVestingCustomAddress>
        <Trans>
          Found address
          <br />
          {shortenAddress(customVestingAddress)}
          <br />
          doesn’t have IXS vesting
        </Trans>
      </NoVestingCustomAddress>
    )
  }

  return (
    <>
      <VestingTextWrapper>
        {account && (
          <YourAddressWrapper>
            <YourAddress>
              <Trans>Your address</Trans>
            </YourAddress>
            <Address>{shortenAddress(account || '')}</Address>
          </YourAddressWrapper>
        )}
        <Text fontSize={'18px'} lineHeight={'27px'} color={theme.text2}>
          <Trans>Balances will be updated on the vesting page until the contracts are programmed.</Trans>
        </Text>
      </VestingTextWrapper>

      <ButtonPinkBorder
        data-testid="redirect-to-telegram"
        style={{ width: '308px' }}
        as={ExternalLink}
        href="https://t.me/ixswapofficial"
      >
        <Trans>IXS in Telegram</Trans>
        <IconWrapperWithBg size={8} style={{ marginLeft: '6px' }}>
          <ExternalBright />
        </IconWrapperWithBg>
      </ButtonPinkBorder>
    </>
  )
}
