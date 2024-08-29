import React, { FC, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Flex } from 'rebass'
import { useHistory } from 'react-router-dom'
import { useActiveWeb3React } from 'hooks/web3'
import { StyledBodyWrapper } from 'pages/SecurityTokens'
import { Loadable } from 'components/LoaderHover'
import { useAuthState } from 'state/auth/hooks'
import { useUserState } from 'state/user/hooks'
import { PayoutForm } from './PayoutForm'
import { PageTitle } from './styleds'
import { Info } from './Info'
import { ROLES } from 'constants/roles'
import styled from 'styled-components'
import { TYPE } from 'theme'

const CreatePayoutEventPage: FC = () => {
  const [cookies] = useCookies(['annoucementsSeen'])
  const history = useHistory()
  const { account } = useActiveWeb3React()
  const { token } = useAuthState()
  const { me } = useUserState()
  const isLoggedIn = !!token && !!account
  const isValidRole = me.role === ROLES.TOKEN_MANAGER || me.role === ROLES.ADMIN
  useEffect(() => {
    if (me && isValidRole) {
      return
    }
    history.push('/kyc')
  }, [me, history, isValidRole])

  const FullScreenBackground = styled.div`
    background-color: #ffffff;
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
      <FullScreenBackground>
        <StyledBodyWrapper style={{ minWidth: 1000 }} hasAnnouncement={!cookies.annoucementsSeen}>
          <Flex marginBottom="32px" alignItems="center">
            <PageTitle textAlign="center" margin="0 auto">
              <TYPE.title6>Create Claim Payout Event</TYPE.title6>
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
