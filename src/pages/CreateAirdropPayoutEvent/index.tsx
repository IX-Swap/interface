import React, { FC, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Flex } from 'rebass'
import { useHistory } from 'react-router-dom'
import { useActiveWeb3React } from 'hooks/web3'
import { StyledBodyWrapper } from 'pages/SecurityTokens'
import { Loadable } from 'components/LoaderHover'
import { useAuthState } from 'state/auth/hooks'
import { useUserState } from 'state/user/hooks'
import { ROLES } from 'constants/roles'
import { TYPE } from 'theme'
import { Info } from './Info'
import { PageTitle } from 'pages/CreatePayoutEvent/styleds'
import { AirdropForm } from './AirdropForm'

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

  return (
    <Loadable loading={!isLoggedIn}>
      <StyledBodyWrapper maxWidth={'1200px'} hasAnnouncement={!cookies.annoucementsSeen}>
        <Flex marginBottom="32px" alignItems="center">
          <PageTitle textAlign="center" margin="0 auto">
            <TYPE.title6>Create Airdrop Payout Event</TYPE.title6>
          </PageTitle>
        </Flex>
        <Info />
        <AirdropForm />
      </StyledBodyWrapper>
    </Loadable>
  )
}

export default CreatePayoutEventPage
