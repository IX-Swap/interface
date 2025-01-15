import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useConnect } from 'wagmi'
import { Text } from 'rebass'
import { Trans } from '@lingui/macro'

import * as Sentry from '@sentry/react'
import { LineButton } from './LineLiffModal'
import LineNextIcon from 'assets/images/linenext-logo.png'
import { useLineReward } from 'providers/LineRewardProvider'
import { DAILY_REWARD, LineRewardAction } from 'constants/lineRewards'
import { apiService as lineRewardApiService } from 'hooks/useLineReward'
import { linePoint } from 'services/apiUrls'
import { Address } from 'viem'

interface LineLiffConnectButtonProps {
  text?: string
  onClose?: () => void
}

export const LineLiffConnectButton: React.FC<LineLiffConnectButtonProps> = ({
  text = 'Connect',
  onClose = function () {},
}) => {
  const { connectors, connectAsync } = useConnect()
  const { setOpenTaskSuccessModal, setRewardsData } = useLineReward()

  const validateDailyRewards = (account: Address) => lineRewardApiService.get(linePoint.checkClaimed, {
    params: {
      address: account,
      action: LineRewardAction.CONNECT_WALLET,
      date: new Date().getTime(),
    },
  })

  const handleClaimRewards = async (account: Address) => {
    const { data } = await validateDailyRewards(account)
    if (data?.claimed) return

    setOpenTaskSuccessModal(true)
    setRewardsData({
      action: LineRewardAction.CONNECT_WALLET,
      points: DAILY_REWARD,
    })
  }

  const handleClick = async () => {
    Sentry.captureMessage(`Connecting to LINE`)
    const connector = connectors.find((connector) => connector.id === 'linenextWallet')
    const { accounts } = await connectAsync({ connector: connector as any })
    await handleClaimRewards(accounts[0])
    onClose()
  }

  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted }) => {
        const ready = mounted
        const connected = ready && account && chain

        return (
          <div>
            {(() => {
              if (!connected) {
                return (
                  <LineButton
                    style={{ boxShadow: '0px 16px 16px 0px #6666FF21', marginBottom: '20px' }}
                    onClick={handleClick}
                  >
                    <img src={LineNextIcon} alt="line-next-icon" /> |
                    <Text className="connect-wallet-button">
                      <Trans>{text}</Trans>
                    </Text>
                  </LineButton>
                )
              }

              // Default <ConnectButton> fallback.
              return <ConnectButton />
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
