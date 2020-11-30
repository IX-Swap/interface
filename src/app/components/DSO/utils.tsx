import React from 'react'
import { DigitalSecurityOffering, DSOFormValues } from 'types/dso'
import { DataroomFile } from 'types/dataroomFile'
import { percentageToNumber } from 'app/pages/issuance/utils'
import { getIdFromObj } from 'helpers/strings'
import isPast from 'date-fns/isPast'

export const transformDSOToFormValues = (
  dso: DigitalSecurityOffering | undefined
): DSOFormValues => {
  if (dso === undefined) {
    return {
      businessModel: '',
      introduction: '',
      useOfProceeds: '',
      fundraisingMilestone: '',
      team: [],
      documents: []
    } as any
  }

  return {
    ...dso,
    corporate: dso.corporate._id,
    currency: getIdFromObj(dso.currency),
    dividendYield: percentageToNumber(dso.dividendYield),
    grossIRR: percentageToNumber(dso.grossIRR),
    equityMultiple: percentageToNumber(dso.equityMultiple),
    interestRate: percentageToNumber(dso.interestRate),
    leverage: percentageToNumber(dso.leverage),
    documents: dso.documents?.map(document => ({ value: document })) ?? []
  }
}

export const documentValueExtractor = (
  value?: DataroomFile | DataroomFile[]
) => {
  return Array.isArray(value) ? value?.[0]._id : value?._id
}

export const renderStringToHTML = (value: string) => (
  <div dangerouslySetInnerHTML={{ __html: value }} />
)

export const isDSOLive = (dso: DigitalSecurityOffering | undefined) => {
  if (dso === undefined) {
    return false
  }

  const { authorizations } = dso

  if (authorizations === undefined) {
    return false
  }

  const wasApproved = authorizations.some(({ status }) => status === 'Approved')
  const pastLaunchDate = isPast(new Date(dso.launchDate))

  return wasApproved && pastLaunchDate
}
