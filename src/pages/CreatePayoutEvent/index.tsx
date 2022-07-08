import React, { FC } from 'react'
import { useCookies } from 'react-cookie'
import { Flex } from 'rebass'
import { Trans } from '@lingui/macro'
import { useHistory } from 'react-router-dom'

import { Loadable } from 'components/LoaderHover'
import { useActiveWeb3React } from 'hooks/web3'
import { useAuthState } from 'state/auth/hooks'
import { ButtonText } from 'components/Button'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { usePayoutState } from 'state/payout/hooks'
import { StyledBodyWrapper } from 'pages/SecurityTokens'
import { ReactComponent as ArrowLeft } from 'assets/images/arrow-back.svg'

import { PayoutForm } from './PayoutForm'
import { PageTitle } from './styleds'

const CreatePayoutEventPage: FC = () => {
  const [cookies] = useCookies(['annoucementsSeen'])
  const { account } = useActiveWeb3React()
  const history = useHistory()
  const { token } = useAuthState()
  const { loadingRequest } = usePayoutState()
  const isLoggedIn = !!token && !!account

  const onBack = () => {
    history.push('/token-manager/my-tokens')
  }

  return (
    <Loadable loading={!isLoggedIn}>
      <LoadingIndicator isLoading={loadingRequest} />
      <StyledBodyWrapper style={{ maxWidth: 840 }} hasAnnouncement={!cookies.annoucementsSeen}>
        <Flex marginBottom="32px" alignItems="center">
          <ButtonText onClick={onBack}>
            <ArrowLeft fill="white !important" />
          </ButtonText>
          <PageTitle textAlign="center" margin="0 auto">
            <Trans>Create Payout Event</Trans>
          </PageTitle>
        </Flex>

        <PayoutForm />
      </StyledBodyWrapper>
    </Loadable>
  )
}

export default CreatePayoutEventPage
