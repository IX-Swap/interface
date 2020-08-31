import React from 'react'
import { Grid } from '@material-ui/core'

import { formatMoney } from 'v1/helpers/formatNumbers'
import SectionContainer from './SectionContianer'
import OfferDetail from './OfferDetail'

const OfferDetails = (
  { dso = {}, edit = false }: { dso: Dso, edit?: boolean },
  ref: any
) => {
  const currency = dso.currency.length ? dso.currency[0] : {}
  return (
    <Grid item xs={4}>
      <SectionContainer>
        <OfferDetail
          name='status'
          ref={ref}
          label='Status'
          value={dso.status}
        />
        <OfferDetail
          name='capitalStructure'
          ref={ref}
          edit={edit}
          label='Capital Structure'
          value={dso.capitalStructure}
        />
        <OfferDetail
          name='pricePerUnit'
          ref={ref}
          edit={edit}
          label='Unit Price'
          value={formatMoney(dso.pricePerUnit || 0, currency.symbol)}
          raw={`${dso.pricePerUnit || ''}`}
        />
        <OfferDetail
          name='totalFundraisingAmount'
          ref={ref}
          edit={edit}
          label='Total Fundraising Amount'
          value={formatMoney(dso.totalFundraisingAmount || 0, currency.symbol)}
          raw={`${dso.totalFundraisingAmount || ''}`}
        />
        <OfferDetail
          name='minimumInvestment'
          ref={ref}
          edit={edit}
          label='Minimum Investment'
          value={formatMoney(dso.minimumInvestment || 0, dso.tokenSymbol)}
          raw={`${dso.minimumInvestment || ''}`}
        />
      </SectionContainer>
    </Grid>
  )
}

export default React.forwardRef(OfferDetails)
