import React, { useCallback, useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'

import { AppDispatch } from '../../state'
import { shortenAddress } from '../../utils'
import {
  AccountControl,
  AccountGroupingRow,
  AccountSection,
  InfoCard,
  UpperSection,
  WalletAction,
  YourAccount,
} from './styleds'
import { Line } from 'components/Line'
import { useGetMe } from 'state/user/hooks'
import { useKYCState } from 'state/kyc/hooks'

import { tryDeactivateConnector } from 'connectors'
import { setWalletState } from 'state/wallet'
import { clearUserData } from 'state/user/actions'
import { clearEventLog } from 'state/eventLog/actions'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import ReferFriend from './ReferFriend'
import KycStatus from './KycStatus'
import Avatar from './Avatar'
import WalletInfo from './WalletInfo'

interface AccountDetailsProps {
  toggleWalletModal: () => void
  pendingTransactions: string[]
  confirmedTransactions: string[]
  ENSName?: string
  openOptions: () => void
}

export default function AccountDetails({ ENSName, toggleWalletModal }: AccountDetailsProps) {
  const { config } = useWhitelabelState()
  const { connector } = useWeb3React()
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const getMe = useGetMe()

  const dispatch = useDispatch<AppDispatch>()
  const { kyc } = useKYCState()

  const supportEmail = config?.supportEmail || 'c@ixswap.io'

  const fetchMe = useCallback(async () => {
    const result = await getMe()
    setReferralCode(result?.referralCode)
  }, [getMe, history])

  useEffect(() => {
    fetchMe()
  }, [])

  const disconnectWallet = async () => {
    await tryDeactivateConnector(connector)
    dispatch(setWalletState({ isConnected: false, walletName: '' }))
    dispatch(clearUserData())
    dispatch(clearEventLog())
  }

  return (
    <>
      <UpperSection>
        <Avatar kyc={kyc} toggleWalletModal={toggleWalletModal} />

        <AccountSection>
          <YourAccount>
            <InfoCard>
              <Line style={{ marginTop: '24px' }} />
              <WalletInfo ENSName={ENSName} disconnectWallet={disconnectWallet} />

              <Line style={{ marginTop: '10px' }} />

              <KycStatus kyc={kyc} toggleWalletModal={toggleWalletModal} />

              <Line style={{ marginTop: '10px' }} />

              {referralCode && <ReferFriend referralCode={referralCode} />}

              <Line style={{ marginTop: '10px' }} />
              <AccountControl style={{ marginTop: 8, marginBottom: 16 }}>
                <span style={{ color: '#666680', fontSize: '13px', fontWeight: '500' }}>
                  In order to make changes to your KYC please <br /> get in touch with us via
                  <span>
                    <a href={`mailto:${supportEmail}`} style={{ color: '#6666FF', marginLeft: '5px' }}>
                      {supportEmail}
                    </a>
                  </span>
                </span>
              </AccountControl>
            </InfoCard>
          </YourAccount>
        </AccountSection>
      </UpperSection>
    </>
  )
}
