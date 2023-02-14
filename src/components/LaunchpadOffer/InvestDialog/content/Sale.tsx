import React from 'react'
import styled, { useTheme } from 'styled-components'
import Row from 'components/Row'
import { CheckCircle, Info } from 'react-feather'
import { InfoList } from 'components/LaunchpadOffer/util/InfoList'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Offer } from 'state/launchpad/types'
import { InvestFormContainer } from './styled'
import { InvestFormSubmitButton, InvestSubmitState, useInvestSubmitState } from '../utils/InvestSubmitButton'
import { ConvertationField } from '../utils/ConvertationField'
import { TokenClaimMessage } from '../utils/TokenClaimMessage'
import { OfferLinks } from '../utils/OfferLinks'
import { Checkbox } from '../utils/Checkbox'
import { useInvest } from 'state/launchpad/hooks'

interface Props {
  offer: Offer
}

export const SaleStage: React.FC<Props> = (props) => {
  const theme = useTheme()
  const invest = useInvest(props.offer.id)

  const [amount, setAmount] = React.useState<string>()

  const [isDisabled, setDisabled] = React.useState(true)
  const formatter = React.useMemo(() => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }), [])

  const presaleCondition = React.useMemo(
    () => [
      {
        label: 'Min. Investment Size',
        value: `${formatter.format(Number(props.offer.presaleMinInvestment))} ${props.offer.investingTokenSymbol}`,
      },
      {
        label: 'Max. Investment Size',
        value: `${formatter.format(Number(props.offer.presaleMaxInvestment))} ${props.offer.investingTokenSymbol}`,
      },
    ],
    []
  )

  const investmentAllowance = React.useMemo(() => {
    const items = [
      { label: 'Available to invest', value: `9,000.00 ${props.offer.investingTokenSymbol}` },
      { label: 'Already invested', value: `1,000.00 ${props.offer.investingTokenSymbol}` },
    ]

    return items.filter((x) => !!x)
  }, [])

  const submitState = useInvestSubmitState()

  const submit = React.useCallback(async () => {
    if (!amount) {
      return
    }

    try {
      submitState.setLoading()

      await invest(props.offer.status, {
        amount,
        txHash: '0x0730e3a6da14a38d8d43899f572d4c221318e3a70461db1c23d6dc8091e5db30',
      })

      submitState.setSuccess()
    } catch {
      submitState.setError()
    }
  }, [invest, submitState])

  return (
    <InvestFormContainer padding="0 0 2rem 0">
      <OfferLinks
        network={props.offer.network}
        address={props.offer.tokenAddress}
        symbol={props.offer.tokenSymbol}
        decimals={props.offer.decimals}
      />

      <InfoList
        title={<InfoListTitle>Pre-Sale Conditions</InfoListTitle>}
        fontSize="13px"
        lineHeight="32px"
        entries={presaleCondition}
      />
      <InfoList
        title={<InfoListTitle>Pre-Sale Conditions</InfoListTitle>}
        fontSize="13px"
        lineHeight="32px"
        entries={investmentAllowance}
      />

      <ConvertationField offer={props.offer} onChange={setAmount} setDisabled={setDisabled} />

      <Agreement>
        <AgreementCheckbox checked />
        <AgreementText>
          I have read, fully understood, and agree to be bound by the terms of this{' '}
          <AgreementTerms href="#">subscription form.</AgreementTerms>
        </AgreementText>
      </Agreement>

      <InvestFormSubmitButton state={submitState.current} disabled={isDisabled} onSubmit={submit}>
        {submitState.current === InvestSubmitState.success && (
          <>
            Submitted <CheckCircle size="15" color={theme.launchpad.colors.success} />
          </>
        )}
        {submitState.current === InvestSubmitState.default && 'Invest'}
        {submitState.current === InvestSubmitState.loading && (
          <Row justifyContent="space-between" alignItems="center" width="100%" padding="1rem">
            <div style={{ flexGrow: 1, textAlign: 'left' }}>Your order is being processed...</div>
            <Loader size="18px" />
          </Row>
        )}
        {submitState.current === InvestSubmitState.error && (
          <Row justifyContent="space-between" alignItems="center" width="100%" padding="1rem">
            <div style={{ flexGrow: 1, textAlign: 'left' }}>Your order was not executed.</div>
            <Info size="18" color={theme.launchpad.colors.error} />
          </Row>
        )}
      </InvestFormSubmitButton>

      <TokenClaimMessage />
    </InvestFormContainer>
  )
}

const InfoListTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 150%;
  letter-spacing: -0.02em;
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const Agreement = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
`

const AgreementText = styled.div`
  flex-grow: 1;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 150%;
  letter-spacing: -0.02em;
  max-width: 250px;
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

const AgreementTerms = styled.a`
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 150%;
  letter-spacing: -0.02em;
  text-decoration: none;
  color: ${(props) => props.theme.launchpad.colors.primary};
`

const AgreementCheckbox = styled(Checkbox)`
  background: ${(props) => props.theme.launchpad.colors.primary};
`
