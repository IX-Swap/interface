import React, { FC, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Flex } from 'rebass'
import { Trans } from '@lingui/macro'
import { useHistory } from 'react-router-dom'
import { useActiveWeb3React } from 'hooks/web3'

import { StyledBodyWrapper } from 'pages/SecurityTokens'

import { Loadable } from 'components/LoaderHover'
import { ButtonText } from 'components/Button'
import { LoadingIndicator } from 'components/LoadingIndicator'

import { useAuthState } from 'state/auth/hooks'
import { useUserState } from 'state/user/hooks'
import { usePayoutState } from 'state/payout/hooks'

import { PayoutForm } from './PayoutForm'
import { PageTitle } from './styleds'
import { Info } from './Info'

import { ROLES } from 'constants/roles'
import { ReactComponent as ArrowLeft } from 'assets/images/arrow-back.svg'

const CreatePayoutEventPage: FC = () => {
  const [cookies] = useCookies(['annoucementsSeen'])
  const history = useHistory()

  const { account } = useActiveWeb3React()
  const { token } = useAuthState()
  const { me } = useUserState()

  const { loadingRequest } = usePayoutState()
  const isLoggedIn = !!token && !!account

  useEffect(() => {
    if (me && me.role !== ROLES.TOKEN_MANAGER) {
      history.push('/kyc')
    }
  }, [me, history])

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
        <Info />
        <PayoutForm />
      </StyledBodyWrapper>
    </Loadable>
  )
}

export default CreatePayoutEventPage
