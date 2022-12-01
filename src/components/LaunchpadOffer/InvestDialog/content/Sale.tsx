import React from 'react'
import styled, { useTheme } from 'styled-components'


import Row from 'components/Row'

import { Info } from 'react-feather'

import { InfoList } from 'components/LaunchpadOffer/util/InfoList'
import { Loader } from 'components/LaunchpadOffer/util/Loader'

import { Offer } from 'state/launchpad/types'

import { InvestFormContainer } from './styled'

import { InvestFormSubmitButton, InvestSubmitState, useInvestSubmitState } from '../utils/InvestSubmitButton'
import { ConvertationField } from '../utils/ConvertationField'
import { TokenClaimMessage } from '../utils/TokenClaimMessage'
import { OfferLinks } from '../utils/OfferLinks'
import { Checkbox } from '../utils/Checkbox'


interface Props {
  offer: Offer
}

export const SaleStage: React.FC<Props> = (props) => {
  const theme = useTheme()
  const formatter = React.useMemo(() => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }), [])


  const presaleCondition = React.useMemo(() => [
    { label: 'Min. Investment Size', value: formatter.format(Number(props.offer.presaleMaxInvestment)) },
    { label: 'Max. Investment Size', value: formatter.format(Number(props.offer.presaleMaxInvestment)) }
  ], [])

  const investmentAllowance = React.useMemo(() => {
    const items = [
      { label: 'Available to invest', value: `9,000.00 USD` },
      { label: 'Already invested', value: `1,000.00 USD` }
    ]

    return items.filter(x => !!x)
  }, [])

  const submitState = useInvestSubmitState()
  
  const submit = React.useCallback(() => {
    if (submitState.current === InvestSubmitState.default) {
      submitState.setError()
    } else {
      submitState.setDefault()
    }
  }, [submitState])

  return (
    <InvestFormContainer padding="0 0 2rem 0">
      <OfferLinks offer={props.offer} />

      <InfoList title={<InfoListTitle>Pre-Sale Conditions</InfoListTitle>} fontSize='13px' lineHeight='32px' entries={presaleCondition} />
      <InfoList title={<InfoListTitle>Pre-Sale Conditions</InfoListTitle>} fontSize='13px' lineHeight='32px' entries={investmentAllowance} />

      <ConvertationField offer={props.offer} />

      <Agreement>
        <AgreementCheckbox checked />
        <AgreementText>
          I have read, fully understood, and agree to be bound by the terms of this <AgreementTerms href="#">subscription form.</AgreementTerms>
        </AgreementText>
      </Agreement>

      <InvestFormSubmitButton state={submitState.current} onSubmit={submit}>
        {submitState.current === InvestSubmitState.default && "Invest"}
        {submitState.current === InvestSubmitState.loading && (
          <Row justifyContent='space-between' alignItems='center' width="100%" padding="1rem">
            <div style={{ flexGrow: 1, textAlign: 'left' }}>Your order is being processed...</div>
            <Loader size="18px" />
          </Row>
        )}
        {submitState.current === InvestSubmitState.error && (
          <Row justifyContent='space-between' alignItems='center' width="100%" padding="1rem">
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

  color: ${props => props.theme.launchpad.colors.text.title};
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

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const AgreementTerms = styled.a`
  font-style: normal;
  font-weight: 500;
  font-size: 11px;

  line-height: 150%;
  letter-spacing: -0.02em;

  text-decoration: none;

  color: ${props => props.theme.launchpad.colors.primary};
`

const AgreementCheckbox = styled(Checkbox)`
  background: ${props => props.theme.launchpad.colors.primary};
`
