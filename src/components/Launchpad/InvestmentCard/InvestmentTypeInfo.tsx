import React from 'react'
import styled from 'styled-components'

import { OFFER_TYPE_LABELS, OFFER_INDUSTRY_LABELS } from 'state/launchpad/constants'
import { OfferType, OfferIndustry, OfferTimeframeType, OfferStatus } from 'state/launchpad/types'

import { ReactComponent as InvestmentApprovedIcon } from 'assets/launchpad/svg/investment-approved-icon.svg'
import { ReactComponent as InvestmentMetaSeparator } from 'assets/launchpad/svg/investment-meta-separator.svg'


const getTypeLabel = (type: OfferType) => {
  return OFFER_TYPE_LABELS.find(x => x.value === type)!.label
}

const getIndustryLabel = (industry: OfferIndustry) => {
  return OFFER_INDUSTRY_LABELS.find(x => x.value === industry)!.label
}

interface Props {
  type: OfferType
  industry: OfferIndustry
  status: OfferStatus
}

export const InvestmentTypeInfo: React.FC<Props> = (props) => {

  return (
    <InvestmentCardMetaContainer>
      {props.status !== OfferStatus.whitelist && (
        <>
          <InvestmentApprovedIcon />
          <InvestmentMetaSeparator />
        </>
      )}

      <InvestmentCardMetaEntry>{getTypeLabel(props.type)}</InvestmentCardMetaEntry>
      <InvestmentMetaSeparator />

      <InvestmentCardMetaEntry>{getIndustryLabel(props.industry)}</InvestmentCardMetaEntry>
    </InvestmentCardMetaContainer>
  )
}

const InvestmentCardMetaContainer = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  gap: 0.5rem;

  margin-bottom: 1rem;
`

const InvestmentCardMetaEntry = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;

  font-family: ${props => props.theme.launchpad.font};

  color: ${props => props.theme.launchpad.colors.text.caption};
`
