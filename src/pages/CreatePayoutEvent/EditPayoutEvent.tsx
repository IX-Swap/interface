import React, { FC, useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Flex } from 'rebass'
import { Trans } from '@lingui/macro'
import { useHistory, useParams } from 'react-router-dom'
import { capitalize } from '@material-ui/core'

import { useActiveWeb3React } from 'hooks/web3'
import { StyledBodyWrapper } from 'pages/SecurityTokens'
import { Loadable } from 'components/LoaderHover'
import { ButtonText } from 'components/Button'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { useAuthState } from 'state/auth/hooks'
import { useUserState } from 'state/user/hooks'
import { useGetPayoutItem, usePayoutState } from 'state/payout/hooks'
import { useCurrency } from 'hooks/Tokens'
import { ROLES } from 'constants/roles'
import { ReactComponent as ArrowLeft } from 'assets/images/arrow-back.svg'
import { PayoutEvent } from 'state/token-manager/types'
import { useTokensList } from 'hooks/useTokensList'
import { PAYOUT_STATUS } from 'constants/enums'

import { PayoutForm } from './PayoutForm'
import { PageTitle } from './styleds'
import { Info } from './Info'
import { FormValues } from './utils'

const EditPayoutEventPage: FC = () => {
  const { id } = useParams<{ id?: string }>()
  const [cookies] = useCookies(['annoucementsSeen'])
  const history = useHistory()

  const { account } = useActiveWeb3React()
  const { token: jwtToken } = useAuthState()
  const { me } = useUserState()

  const { loadingRequest } = usePayoutState()
  const isLoggedIn = !!jwtToken && !!account

  const [payout, setPayout] = useState<PayoutEvent>()
  const [status, setStatus] = useState<PAYOUT_STATUS>()
  const [payoutFormData, setPayoutFormData] = useState<FormValues>()
  const getPayoutItem = useGetPayoutItem()
  const { tokensOptions, secTokensOptions } = useTokensList()
  const payoutTokenCurrency = useCurrency(payout?.payoutToken)

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
  }, [])

  const secToken = useMemo(() => {
    if (payout?.secToken) {
      return secTokensOptions.find((el) => el.value === payout.secToken.id) || null
    }

    return null
  }, [payout])

  const token = useMemo(() => {
    if (payout?.payoutToken) {
      return tokensOptions.find((el) => el.value === payout.payoutToken || el.address === payout.payoutToken) || null
    }

    return null
  }, [payout])

  useEffect(() => {
    if (payout && payoutTokenCurrency) {
      setPayoutFormData({
        id: payout.id.toString(),
        description: payout.description,
        endDate: payout.endDate!,
        startDate: payout.startDate,
        files: payout.attachments,
        recordDate: payout.recordDate,
        secToken,
        secTokenAmount: payout.secTokenAmount,
        title: payout.title,
        token,
        tokenAmount: payout.tokenAmount,
        type: capitalize(payout.type),
        otherType: payout.otherType,
      })
    }
  }, [payout, payoutTokenCurrency])

  useEffect(() => {
    if (me && me.role !== ROLES.TOKEN_MANAGER) {
      history.push('/kyc')
    }
  }, [me, history])

  const onBack = () => {
    history.push('/token-manager/my-tokens')
  }

  if (!payoutFormData) {
    return null
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
            <Trans>Edit Payout Event</Trans>
          </PageTitle>
        </Flex>
        <Info />
        <PayoutForm payoutData={payoutFormData} status={status} paid={payout?.isPaid ?? false} />
      </StyledBodyWrapper>
    </Loadable>
  )
}

export default EditPayoutEventPage
