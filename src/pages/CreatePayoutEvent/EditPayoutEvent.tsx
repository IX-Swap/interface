import React, { FC, useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Flex } from 'rebass'
import { useHistory, useParams } from 'react-router-dom'
import { useActiveWeb3React } from 'hooks/web3'
import { StyledBodyWrapper } from 'pages/SecurityTokens'
import { Loadable } from 'components/LoaderHover'
import { useAuthState } from 'state/auth/hooks'
import { useUserState } from 'state/user/hooks'
import { useGetPayoutItem } from 'state/payout/hooks'
import { ROLES } from 'constants/roles'
// import { ReactComponent as ArrowLeft } from 'assets/images/arrow-back.svg'
import { PayoutEvent } from 'state/token-manager/types'
import { useTokensList } from 'hooks/useTokensList'
import { PAYOUT_STATUS } from 'constants/enums'
import { PayoutForm } from './PayoutForm'
import { PageTitle } from './styleds'
import { Info } from './Info'
import { FormValues } from './utils'
import { TYPE } from 'theme'
import styled from 'styled-components'
import CurrencyLogo from 'components/CurrencyLogo'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { CenteredFixed } from 'components/LaunchpadMisc/styled'
import { NetworkNotAvailable } from 'components/Launchpad/NetworkNotAvailable'
import { checkWrongChain } from 'chains'
import Portal from '@reach/portal'
import { BackButton, StyledArrowBack, BackText } from 'pages/PayoutItem/PayoutItemManager'
import { routes } from 'utils/routes'
const EditPayoutEventPage: FC = () => {
  const { id } = useParams<{ id?: string }>()
  const [cookies] = useCookies(['annoucementsSeen'])
  const history = useHistory()
  const { account } = useActiveWeb3React()
  const { token: jwtToken } = useAuthState()
  const { me } = useUserState()
  const isLoggedIn = !!jwtToken && !!account
  const [payout, setPayout] = useState<PayoutEvent>()
  const [status, setStatus] = useState<PAYOUT_STATUS>()
  const [payoutFormData, setPayoutFormData] = useState<FormValues>()
  const getPayoutItem = useGetPayoutItem()
  const { tokensOptions } = useTokensList()
  const { chainId } = useActiveWeb3React()
  const network = payout?.secToken?.network ?? ''
  const { isWrongChain, expectChain } = checkWrongChain(chainId, network)
  useEffect(() => {
    async function load() {
      if (!id) {
        history.push('/kyc')
      }

      const data: PayoutEvent = await getPayoutItem(Number(id))

      if (data) {
        setStatus(data.status)
        setPayout(data)
      }
    }

    load()
  }, [!isWrongChain])

  const token = useMemo(() => {
    if (payout?.payoutToken) {
      return tokensOptions.find((el) => el.value === payout.payoutToken || el.address === payout.payoutToken) || null
    }

    return null
  }, [payout])

  useEffect(() => {
    if (payout) {
      setPayoutFormData({
        id: payout.id.toString(),
        description: payout.description,
        endDate: payout.endDate ?? '',
        startDate: payout.startDate,
        files: payout.attachments,
        recordDate: payout.recordDate,
        secToken: {
          label: payout.secToken?.symbol || '',
          value: payout.secToken?.id || '',
          network: payout.network || '',
          icon: payout.secToken && <CurrencyLogo currency={new WrappedTokenInfo(payout.secToken)} />,
        },
        secTokenAmount: payout.secTokenAmount,
        title: payout.title,
        token,
        tokenAmount: payout.tokenAmount,
        type: payout.type,
        otherType: payout.otherType,
        payoutContractAddress: payout.payoutContractAddress,
        blockNumber: payout.blockNumber,
        includeOriginSupply: payout.includeOriginSupply,
        userId: payout.userId,
      })
    }
  }, [payout])

  const isValidRole = me.role === ROLES.TOKEN_MANAGER || me.role === ROLES.ADMIN
  useEffect(() => {
    if (me && isValidRole) {
      return
    }
    history.push('/kyc')
  }, [me, history, isValidRole])

  if (!payoutFormData) {
    return null
  }

  const handleBackClick = () => {
    history.push(routes.payoutEvent)
  }

  return (
    <Loadable loading={!isLoggedIn}>
      {isWrongChain ? (
        <Portal>
          <CenteredFixed width="100vw" height="100vh">
            <NetworkNotAvailable expectChain={expectChain} />
          </CenteredFixed>
        </Portal>
      ) : null}
      <FullScreenBackground>
        <StyledBodyWrapper style={{ minWidth: 1200 }} hasAnnouncement={!cookies.annoucementsSeen}>
          <BackButton onClick={handleBackClick}>
            <StyledArrowBack />
            <BackText>Back</BackText>
          </BackButton>
          <Flex marginBottom="32px" alignItems="center">
            <PageTitle textAlign="center" margin="0 auto">
              <TYPE.title6>Edit Payout Event</TYPE.title6>
            </PageTitle>
            {/* just comment it for now we may need this validation is future  */}
            {/* <ButtonText onClick={onBack}>
            <ArrowLeft fill="white !important" />
          </ButtonText> */}
          </Flex>
          <Info />
          <PayoutForm payoutData={payoutFormData} status={status} paid={!!payout?.paidTxHash} />
        </StyledBodyWrapper>
      </FullScreenBackground>
    </Loadable>
  )
}

export default EditPayoutEventPage

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
