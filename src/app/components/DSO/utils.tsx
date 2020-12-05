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

export const truncateString = (str: string, len: number, words = false) => {
  var tooLong = str.length > len
  var truncated = tooLong ? str.substr(0, len) : str
  if (words && tooLong) {
    var index = truncated.lastIndexOf(' ')
    if (index !== -1) {
      truncated = truncated.substr(0, index)
    }
  }
  return tooLong ? truncated + ' …' : truncated
}

const colors = {
  live: '#8995FC',
  completed: '#5cc72a',
  upcoming: '#eb9a05'
}

export const getDSOStats = (dso: DigitalSecurityOffering) => {
  const percentRaised = calculatePercent(
    dso.insight.raisedTotal,
    dso.totalFundraisingAmount ?? 0
  )

  const now = new Date().getTime()
  const launchDate = new Date(dso.launchDate).getTime()
  const completionDate = now + 1

  let status: DSOLaunchStatus = 'upcoming'
  if (completionDate <= now || percentRaised === 100) {
    status = 'completed'
  } else if (launchDate <= now) {
    status = 'live'
  }

  return { status, percentRaised, color: colors[status] }
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
