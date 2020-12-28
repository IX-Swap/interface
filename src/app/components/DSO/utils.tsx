import React from 'react'
import {
  DigitalSecurityOffering,
  DSOFormValues,
  DSOLaunchStatus
} from 'types/dso'
import { DataroomFile } from 'types/dataroomFile'
import { percentageToNumber } from 'app/pages/issuance/utils'
import { getIdFromObj } from 'helpers/strings'
import { calculatePercent } from 'helpers/numbers'
import isPast from 'date-fns/isPast'
import { Network, Urls } from 'types/networks'

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
    network: getIdFromObj(dso.network),
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

const dsoStatusColors = {
  live: '#8995FC',
  completed: '#5cc72a',
  upcoming: '#eb9a05'
}

export const getDSOStats = (dso: DigitalSecurityOffering) => {
  const { insight, totalFundraisingAmount } = dso

  const percentRaised = calculatePercent(
    insight.raisedTotal,
    totalFundraisingAmount ?? 0
  )

  let status: DSOLaunchStatus = 'upcoming'

  if (isDSOCompleted(dso)) {
    // completionDate < today
    status = 'completed'
  } else if (isDSOLive(dso)) {
    // launchDate  < today
    status = 'live'
  }

  const color = dsoStatusColors[status]

  return { status, percentRaised, color }
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

export const isDSOCompleted = (dso: DigitalSecurityOffering | undefined) => {
  if (dso === undefined) {
    return false
  }

  const { authorizations, completionDate } = dso

  if (
    authorizations === undefined ||
    completionDate === undefined ||
    completionDate === null
  ) {
    return false
  }

  const wasApproved = authorizations.some(({ status }) => status === 'Approved')

  const pastCompletionDate = isPast(new Date(completionDate))

  return wasApproved && pastCompletionDate
}

export const getBlockchainUrl = (
  value?: string,
  network?: Network,
  type: keyof Urls = 'address'
) => {
  const url =
    network?.explorer.urls[type] ?? `https://ropsten.etherscan.io/${type}/%s`

  return url.replace(/%s/g, value ?? '')
}
