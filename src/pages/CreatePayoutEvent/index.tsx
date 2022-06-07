import React, { FC } from 'react'
import { useCookies } from 'react-cookie'
import { Flex } from 'rebass'
import { Trans } from '@lingui/macro'

import { Loadable } from 'components/LoaderHover'
import { useActiveWeb3React } from 'hooks/web3'
import { useAuthState } from 'state/auth/hooks'
import { ButtonText } from 'components/Button'
import { PayoutForm } from './PayoutForm'

import { StyledBodyWrapper } from 'pages/CustodianV2/styleds'
import { ReactComponent as ArrowLeft } from 'assets/images/arrow-back.svg'
import { PageTitle } from './styleds'

const CreatePayoutEventPage: FC = () => {
  const [cookies] = useCookies(['annoucementsSeen'])
  const { account } = useActiveWeb3React()
  const { token } = useAuthState()
  const isLoggedIn = !!token && !!account

  return (
    <Loadable loading={!isLoggedIn}>
      <StyledBodyWrapper style={{ maxWidth: 840 }} hasAnnouncement={!cookies.annoucementsSeen}>
        <Flex marginBottom="32px" alignItems="center">
          <ButtonText>
            <ArrowLeft fill="white !important" style={{ fill: 'white !important=' }} />
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
