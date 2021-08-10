import { Trans } from '@lingui/macro'
import { ButtonPinkBorder } from 'components/Button'
import useTheme from 'hooks/useTheme'
import React from 'react'
import { Text } from 'rebass'
import { VestingTextWrapper } from './styleds'
import { ReactComponent as ExternalBright } from 'assets/images/external-bright.svg'
import { IconWrapperWithBg } from 'components/AccountDetails/styleds'
import { ExternalLink } from 'theme'
export const ZeroBalanceVesting = () => {
  const theme = useTheme()
  return (
    <>
      <VestingTextWrapper>
        <Text fontSize={'18px'} lineHeight={'27px'} color={theme.text2}>
          <Trans>Oops, you don’t have IXS vesting in progress now, go to telegram and ask for IXS</Trans>
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
