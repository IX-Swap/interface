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
import styled from 'styled-components'
import { TYPE } from 'theme'

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

  const FullScreenBackground = styled.div`
    background-color: #ffffff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  `

  return (
    <Loadable loading={!isLoggedIn}>
      <LoadingIndicator isLoading={loadingRequest} />
      <FullScreenBackground>
        <StyledBodyWrapper style={{ maxWidth: 840, marginTop: '170px' }} hasAnnouncement={!cookies.annoucementsSeen}>
          <Flex marginBottom="32px" alignItems="center">
            <ButtonText onClick={onBack}>
              <ArrowLeft fill="white !important" />
            </ButtonText>
            <PageTitle textAlign="center" margin="0 auto">
              <TYPE.title6>Create Payout Event</TYPE.title6>
            </PageTitle>
          </Flex>
          <Info />
          <PayoutForm />
        </StyledBodyWrapper>
      </FullScreenBackground>
    </Loadable>
  )
}

export default CreatePayoutEventPage
