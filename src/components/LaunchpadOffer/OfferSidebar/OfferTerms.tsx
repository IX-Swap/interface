import React from 'react'

import { OfferDistributionFrequencyLabel, OfferTerms as OfferTermsInfo } from 'state/launchpad/types'
import { InfoList } from '../util/InfoList'
import { useLocalization } from 'i18n'

interface Props {
  terms: OfferTermsInfo
}

export const OfferTerms: React.FC<Props> = (props) => {
  const { t, language } = useLocalization()
  const terms = React.useMemo(
    () => [
      {
        label: t('launchpad.offersPage.sideBar.offeringTerms.investmentStructure'),
        value: props.terms.investmentStructure || 'N/A',
      },
      {
        label: t('launchpad.offersPage.sideBar.offeringTerms.dividendYield'),
        value: props.terms.dividentYield || 'N/A',
      },
      {
        label: t('launchpad.offersPage.sideBar.offeringTerms.investmentPeriod'),
        value: props.terms.investmentPeriod || 'N/A',
      },
      {
        label: t('launchpad.offersPage.sideBar.offeringTerms.grossIrr'),
        value: props.terms.grossIrr || 'N/A',
      },
      {
        label: t('launchpad.offersPage.sideBar.offeringTerms.distributionFrequency'),
        value: props.terms.distributionFrequency
          ? OfferDistributionFrequencyLabel[props.terms.distributionFrequency]
          : 'N/A',
      },
    ],
    [props.terms, language]
  )

  return <InfoList title="Offering Terms" entries={terms} />
}
