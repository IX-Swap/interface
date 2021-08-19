import { Trans } from '@lingui/macro'
import { ReactComponent as IXSToken } from 'assets/images/IXS-token.svg'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ButtonGradientBorder, ButtonIXSWide } from 'components/Button'
import { IXS_ADDRESS } from 'constants/addresses'
import { useActiveWeb3React } from 'hooks/web3'
import React from 'react'
import { Box } from 'rebass'
import { ExternalLink, StyledInternalLink, TYPE } from 'theme'
import { routes } from 'utils/routes'
import { StakingStatus } from './Staking'
import { GetIXSStakingCard, StakingPromoCard } from './styleds'

export const PromoTokenCard = ({ stakingStatus: stakingStatus }: { stakingStatus: StakingStatus }) => {
  const { account, chainId } = useActiveWeb3React()
  return (
    <>
      {stakingStatus !== StakingStatus.NO_IXS && (
        <StakingPromoCard>
          <IconWrapper size={75}>
            <IXSToken />
          </IconWrapper>
          <Box marginTop={18}>
            <TYPE.body5>
              <Trans>IXS Token</Trans>
            </TYPE.body5>
          </Box>
          <Box marginTop={10}>
            <TYPE.body3>
              <Trans>Annual Return</Trans>
            </TYPE.body3>
          </Box>
          <Box marginTop={13}>
            <TYPE.main0>10%</TYPE.main0>
          </Box>
        </StakingPromoCard>
      )}

      {stakingStatus === StakingStatus.NO_IXS && (
        <GetIXSStakingCard>
          <Box>
            <Box>
              <TYPE.title5>You dont have any IXS now to Stake</TYPE.title5>
            </Box>
            <Box style={{ marginTop: '24px' }}>
              <TYPE.descriptionThin>
                Find out how to buy or get IXS airdropped in our Telegram or Use our swap to get IXS.
              </TYPE.descriptionThin>
            </Box>

            <ButtonGradientBorder
              style={{ width: '100%', marginTop: '36px' }}
              data-testid="staking-redirect-to-telegram"
              as={ExternalLink}
              href="https://t.me/ixswapofficial"
            >
              <Trans>Go to Telegram</Trans>
            </ButtonGradientBorder>
            {account && chainId && (
              <ButtonIXSWide
                style={{ marginTop: '24px' }}
                as={StyledInternalLink}
                to={`${routes.swap}/${IXS_ADDRESS[chainId]}`}
                data-testid="staking-redirect-swap"
              >
                <Trans>Swap</Trans>
              </ButtonIXSWide>
            )}
          </Box>
        </GetIXSStakingCard>
      )}
    </>
  )
}
