import React from 'react'

import { Column } from 'components/LaunchpadMisc/styled'
import { InformationFormValues } from '../Information/types'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { IssuanceStatus } from 'components/LaunchpadIssuance/types'

interface Props {
  offer: Partial<InformationFormValues>
  onSubmit: (isDraft: boolean) => void
  onClose: () => void
}

export const ReviewSidebar: React.FC<Props> = (props) => {
  const options = React.useMemo(() => {
    const base = [
      {
        label: 'Company Information',
        isComplete:
          props.offer.issuerIdentificationNumber &&
          props.offer.country &&
          props.offer.investmentType &&
          props.offer.tokenPrice &&
          props.offer.maxInvestment &&
          props.offer.minInvestment,
      },

      {
        label: 'Tokenomics',
        isComplete:
          props.offer.tokenPrice &&
          props.offer.tokenStandart &&
          props.offer.tokenTicker &&
          props.offer.tokenType &&
          props.offer.tokenName,
      },

      {
        label: 'Pre-Sale',
        isComplete:
          !props.offer.hasPresale ||
          (props.offer.hasPresale &&
            props.offer.presaleAlocated &&
            props.offer.presaleMaxInvestment &&
            props.offer.presaleMinInvestment),
      },

      {
        label: 'Timelines',
        isComplete: props.offer.hasPresale
          ? props.offer.timeframe?.whitelist &&
            props.offer.timeframe?.preSale &&
            props.offer.timeframe?.sale &&
            props.offer.timeframe?.closed &&
            props.offer.timeframe?.claim
          : props.offer.timeframe?.sale && props.offer.timeframe?.closed && props.offer.timeframe?.claim,
      },

      {
        label: 'Offering Terms',
        isComplete: props.offer.terms?.investmentStructure,
      },

      {
        label: 'Additional Information',
        isComplete: props.offer.email && props.offer.website && props.offer.whitepaper,
      },

      {
        label: 'Upload Documents',
        isComplete: (props.offer.additionalDocuments?.length ?? 0) > 0,
      },

      {
        label: 'Images',
        isComplete: (props.offer.images?.length ?? 0) > 0,
      },

      { label: 'Videos', isDisabled: true },

      {
        label: 'Pitch',
        isComplete: !!props.offer.longDescription,
      },

      { label: 'Team Members', isDisabled: true },
      { label: 'FAQ', isDisabled: true },
    ]

    return base
  }, [props.offer])

  return (
    <Column gap="0.25rem">
      <Column gap="0.5rem" margin="1rem 0">
        {props.offer.status !== IssuanceStatus.approved && (
          <OutlineButton onClick={() => props.onSubmit(true)}>Save Draft</OutlineButton>
        )}
        <OutlineButton onClick={props.onClose}>Back to Form</OutlineButton>
        {props.offer.status !== IssuanceStatus.approved && (
          <FilledButton onClick={() => props.onSubmit(false)}>Submit</FilledButton>
        )}
      </Column>
    </Column>
  )
}
