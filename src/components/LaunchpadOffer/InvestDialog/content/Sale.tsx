import React, { useState, useMemo, useCallback } from 'react'
import styled, { useTheme } from 'styled-components'
import Row from 'components/Row'
import { CheckCircle, Info } from 'react-feather'
import { InfoList } from 'components/LaunchpadOffer/util/InfoList'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Offer, OfferStatus } from 'state/launchpad/types'
import { InvestFormContainer } from './styled'
import { InvestFormSubmitButton, InvestSubmitState, useInvestSubmitState } from '../utils/InvestSubmitButton'
import { ConvertationField } from '../utils/ConvertationField'
import { TokenClaimMessage } from '../utils/TokenClaimMessage'
import { OfferLinks } from '../utils/OfferLinks'
import { BaseCheckbox } from '../utils/Checkbox'
import { useInvest } from 'state/launchpad/hooks'
import { text10, text11 } from 'components/LaunchpadMisc/typography'

interface Props {
  offer: Offer
}

export const SaleStage: React.FC<Props> = ({ offer }) => {
  const {
    minInvestment,
    maxInvestment,
    presaleMinInvestment,
    presaleMaxInvestment,
    investingTokenSymbol,
    status,
    id,
    network,
    tokenAddress,
    tokenSymbol,
    decimals,
    totalInvestment,
    presaleAlocated,
    hardCap,
  } = offer
  const theme = useTheme()
  const invest = useInvest(id)

  const [amount, setAmount] = useState<string>()

  const [isDisabled, setDisabled] = useState(true)
  const [agreed, setAgreed] = useState(false)
  const formatter = useMemo(() => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }), [])
  const isPresale = useMemo(() => status === OfferStatus.preSale, [status])

  const conditions = useMemo(
    () => [
      {
        label: 'Min. Investment Size',
        value: `${formatter.format(Number(isPresale ? presaleMinInvestment : minInvestment))} ${investingTokenSymbol}`,
      },
      {
        label: 'Max. Investment Size',
        value: `${formatter.format(Number(isPresale ? presaleMaxInvestment : maxInvestment))} ${investingTokenSymbol}`,
      },
    ],
    [isPresale, presaleMaxInvestment, presaleMinInvestment, maxInvestment, minInvestment, investingTokenSymbol]
  )

  const investmentAllowance = useMemo(() => {
    const max = isPresale ? +presaleAlocated : +hardCap
    const available = max - totalInvestment
    const items = [
      { label: 'Available to invest', value: `${formatter.format(available)} ${investingTokenSymbol}` },
      { label: 'Already invested', value: `${formatter.format(totalInvestment)} ${investingTokenSymbol}` },
    ]

    return items.filter((x) => !!x)
  }, [isPresale, presaleAlocated, hardCap, investingTokenSymbol])

  const submitState = useInvestSubmitState()

  const submit = useCallback(async () => {
    if (!amount) {
      return
    }

    try {
      submitState.setLoading()

      await invest(status, {
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
      <OfferLinks network={network} address={tokenAddress} symbol={tokenSymbol} decimals={decimals} />

      <InfoList
        title={<InfoListTitle>{isPresale ? 'Pre-Sale Conditions' : 'Public Sale Conditions'}</InfoListTitle>}
        fontSize="13px"
        lineHeight="32px"
        entries={conditions}
      />
      <InfoList
        title={<InfoListTitle>My investment allowance</InfoListTitle>}
        fontSize="13px"
        lineHeight="32px"
        entries={investmentAllowance}
      />

      <ConvertationField offer={offer} onChange={setAmount} setDisabled={setDisabled} />

      <Agreement>
        <AgreementCheckbox state={agreed} toggle={() => setAgreed((state) => !state)} />
        <AgreementText>
          I have read, fully understood, and agree to be bound by the terms of this{' '}
          <AgreementTerms href="#">subscription form.</AgreementTerms>
        </AgreementText>
      </Agreement>

      <InvestFormSubmitButton state={submitState.current} disabled={isDisabled || !agreed} onSubmit={submit}>
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
  ${text10}
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
  ${text11}
  max-width: 250px;
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

const AgreementTerms = styled.a`
  ${text11}
  text-decoration: none;
  color: ${(props) => props.theme.launchpad.colors.primary};
`

const AgreementCheckbox = styled(BaseCheckbox)`
  background: ${(props) => props.theme.launchpad.colors.primary};
`
