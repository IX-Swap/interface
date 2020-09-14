import React from 'react'
import { formatMoney } from 'v2/helpers/numbers'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { Asset } from 'v2/types/asset'
import EditableWithLabel from 'v2/components/form/HardLabelEditable'

interface OfferProps {
  dso: DigitalSecurityOffering
  currency?: Asset
  editMode?: boolean
}

export const DSODetails = (props: OfferProps) => {
  const { dso, currency, editMode = false } = props

  return (
    <>
      <EditableWithLabel name='status' label='Status' value={dso.status} />
      <EditableWithLabel
        name='capitalStructure'
        required
        editMode={editMode}
        label='Capital Structure'
        value={dso.capitalStructure}
      />
      <EditableWithLabel
        name='pricePerUnit'
        required
        editMode={editMode}
        label='Unit Price'
        value={formatMoney(dso.pricePerUnit ?? 0, currency?.symbol)}
        raw={`${dso.pricePerUnit ?? ''}`}
      />
      <EditableWithLabel
        name='totalFundraisingAmount'
        editMode={editMode}
        label='Total Fundraising Amount'
        value={formatMoney(dso.totalFundraisingAmount ?? 0, currency?.symbol)}
        raw={`${dso.totalFundraisingAmount ?? ''}`}
      />
      <EditableWithLabel
        name='minimumInvestment'
        editMode={editMode}
        label='Minimum Investment'
        value={formatMoney(dso.minimumInvestment ?? 0, dso.tokenSymbol)}
        raw={`${dso.minimumInvestment ?? ''}`}
      />
    </>
  )
}
