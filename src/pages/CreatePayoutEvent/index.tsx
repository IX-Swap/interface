import React, { FC } from 'react'
import { useCookies } from 'react-cookie'
import { Flex } from 'rebass'
import { Trans } from '@lingui/macro'

import { Loadable } from 'components/LoaderHover'
import { useActiveWeb3React } from 'hooks/web3'
import { useAuthState } from 'state/auth/hooks'
import { ButtonText } from 'components/Button'
import { Select } from 'pages/KYC/common'
import { DateInput } from 'components/DateInput'
import { Summary } from './Summary'
import { PayoutForm } from './PayoutForm'
import { DesktopAndTablet, MobileOnly, TYPE } from 'theme'

import { StyledBodyWrapper } from 'pages/CustodianV2/styleds'
import { ReactComponent as ArrowLeft } from 'assets/images/arrow-back.svg'
import { FormCard, PageTitle } from './styleds'
import { FormGrid } from 'pages/KYC/styleds'
import { mockSecTokens } from './mock'

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

        <FormCard marginBottom="32px">
          <TYPE.title6 marginBottom="28px">
            <Trans>SECURITY TOKENS</Trans>
          </TYPE.title6>
          <FormGrid style={{ marginBottom: 20 }}>
            <Select
              label="Sec Token"
              placeholder="Choose SEC token"
              selectedItem={null}
              items={mockSecTokens}
              onSelect={() => null}
              required
            />
            <DateInput label="Record Date" maxHeight={60} openTo="date" value={''} onChange={() => null} required />
          </FormGrid>

          <Summary walletsAmount={200} poolsAmount={500} />
        </FormCard>

        <PayoutForm />
      </StyledBodyWrapper>
    </Loadable>
  )
}

export default CreatePayoutEventPage
